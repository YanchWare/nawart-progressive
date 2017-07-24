import security from '../../utilities/security'
import { securityDb } from '../../utilities/localDatabaseHandler'

const getSecurityDBDriver = (userEmail) => {
  const hashedUserEmail = security.getHash(userEmail)
  securityDb.masterKeySaltKey = security.getHash(hashedUserEmail + 'masterKeySalt')
  securityDb.trustedDeviceIdKey = security.getHash(hashedUserEmail + 'trustedDeviceIdKey')
  securityDb.trustedDeviceSecretKey = security.getHash(hashedUserEmail + 'trustedDeviceSecret')
  securityDb.trustedDeviceSecretTest = security.getHash(hashedUserEmail + 'trustedDeviceSecretTest')

  securityDb.getMasterKeySalt = () => {
    return securityDb.get(securityDb.masterKeySaltKey)
  }
  securityDb.getTrustedDeviceId = () => {
    return securityDb.get(securityDb.trustedDeviceIdKey)
  }
  securityDb.getEncryptedTrustedDeviceSecret = () => {
    return securityDb.get(securityDb.trustedDeviceSecretKey)
  }
  securityDb.getTrustedDeviceSecretTest = () => {
    return securityDb.get(securityDb.trustedDeviceSecretTest)
  }

  securityDb.setMasterKeySalt = (salt) => {
    return securityDb.set(securityDb.masterKeySaltKey, salt)
  }
  securityDb.setTrustedDeviceId = (deviceId) => {
    return securityDb.set(securityDb.trustedDeviceIdKey, deviceId)
  }
  securityDb.setEncryptedTrustedDeviceSecret = (encryptedDeviceSecret) => {
    return securityDb.set(securityDb.trustedDeviceSecretKey, encryptedDeviceSecret)
  }
  securityDb.setTrustedDeviceSecretTest = (test) => {
    return securityDb.set(securityDb.trustedDeviceSecretTest, test)
  }

  return securityDb
}

module.exports = {
  getSecurityDBDriver
}
