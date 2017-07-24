import ftplib
import os
import sys
from os.path import basename

##############################
########## Helpers ###########
##############################

# Remove recursively a directory
def FtpRmTree(ftp, path):
    """Recursively delete a directory tree on a remote server."""
    wd = ftp.pwd()

    try:
        names = ftp.nlst(path)
    except ftplib.all_errors as e:
        # some FTP servers complain when you try and list non-existent paths
        print ('FtpRmTree: Could not remove {0}: {1}').format(path, e)
        return

    for name in names:
        if os.path.split(name)[1] in ('.', '..'): continue

        print ('FtpRmTree: Checking {0}'.format(name))

        try:
            ftp.cwd(name)  # if we can cwd to it, it's a folder
            ftp.cwd(wd)  # don't try to nuke a folder we're in
            FtpRmTree(ftp, name)
        except ftplib.all_errors:
            ftp.delete(name)

    try:
        ftp.rmd(path)
    except ftplib.all_errors as e:
        print ('FtpRmTree: Could not remove {0}: {1}'.format(path, e))

# Upload a folder with all its contents to a remote location through FTPS
def scan_upload_ftp(ftp_conn, localPath, remotePath):
    for root_dir,sub_dir,files in os.walk(localPath):
        for file in files:
            _rootdir = root_dir[len(localPath):]
            file_path = root_dir+'/'+file
            print ('Uploading ' + file_path + ', _rootdir: ' + _rootdir)
            ftp_upload(ftp_conn,_rootdir,file_path, remotePath)
    return True

# FTP helper function
def ftp_upload(ftp_conn,common_dir,file_path, remotePath):
    file_name = basename(file_path)
    if file_name.endswith('.map'):
        return True
    ftp_conn.cwd(remotePath)
    ftp_makedirs(ftp_conn,common_dir,remotePath)
    ftp_conn.storbinary('STOR '+file_name, open(file_path, 'rb'))
    return True

# FTP helper function
def ftp_makedirs(ftp_conn,path,remotePath):
    print ('Creating folder ' + path)
    path = path.lstrip('/')
    _path = path.split('/')
    ftp_conn.cwd(remotePath)
    for _p in _path:
        if _p:
            try:
                ftp_conn.cwd(_p)
            except ftplib.all_errors as e:
                ftp_conn.mkd(_p)
                ftp_conn.cwd(_p)
    return True

# FTP helper function
def directory_exists(ftp_conn,dir):
    filelist = []
    ftp_conn.retrlines('LIST',filelist.append)
    for f in filelist:
        if f.split()[-1] == dir and f.upper().startswith('D'):
            return True
    return False

##############################
############ Main ############
##############################

# Establish a connection
session = ftplib.FTP_TLS(os.environ['FTP_HOST'],os.environ['FTP_USERNAME'],os.environ['FTP_PASSWORD'])

if not session:
    print ('FtpRmTree: Could not establish connection to FTP at {0} with user {1}'.format(os.environ['FTP_HOST'], os.environ['FTP_USERNAME']))
    sys.exit("No FTP Connection could be established.")

localPath = os.environ['BUILD_DROP_FOLDER']
remotePath = os.environ['FTP_PATH']

# cleanup
FtpRmTree(session, remotePath)
session.mkd(remotePath)

# deploy
scan_upload_ftp(session, localPath, remotePath)

session.quit()