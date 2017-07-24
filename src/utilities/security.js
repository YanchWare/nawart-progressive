import Q from 'q'
import srp from 'srp-js'
import crypto from 'crypto'
import jose from 'node-jose'

const parameters = srp.params['2048']
const securityLevels = {
  anonymous: 0,
  one_factor: 100,
  two_factors: 200
}

const getRandomBytes = (bytes, callback) => {
  srp.genKey(bytes, (err, random) => {
    callback(err, random)
  })
}

const getVerifierToCreateNewAccount = (identity, password) => {
  const deferred = Q.defer()
  const bufferedIdentity = Buffer.from(identity)
  const bufferedPassword = Buffer.from(password)
  getRandomBytes(32, (err, random) => {
    if (err) {
      // TODO: log
      console.error(err)
      deferred.reject(new Error(err))
      return
    }
    const verifier = srp.computeVerifier(parameters, random, bufferedIdentity, bufferedPassword)
    deferred.resolve({
      salt: random.toString('base64'),
      verifier: verifier.toString('base64')
    })
  })
  return deferred.promise
}

const getM1ForLogonFinalization = (securityState) => {
  if (securityState) {
    return securityState.srpClient.computeM1()
  } else {
    throw Error('Invalid internal state for current session')
  }
}

const verifyServerEvidenceMessage = (securityState, serverM2) => {
  if (!securityState) {
    throw Error('Invalid internal state for current session')
  }

  // we had to implement our function since bouncy castle diverge at this point from srp-js
  try {
    const aBuf = securityState.srpClient._private.A_buf
    const mBuf = securityState.srpClient._private.M1_buf
    const sBuf = securityState.srpClient._private.S_buf
    const params = securityState.srpClient._private.params
    const paddedM1 = Buffer.concat([new Buffer(aBuf.length - mBuf.length).fill(0), mBuf], aBuf.length)
    const hash = crypto.createHash(params.hash)
      .update(aBuf).update(paddedM1).update(sBuf)
      .digest()
    return hash.toString('base64') === serverM2
  } catch (e) {
    return false
  }
}

const getClientAuthRequestAsync = (identity) => {
  const deferred = Q.defer()
  srp.genKey((err, secret) => {
    if (err) {
      // TODO: log
      console.error(err)
      deferred.reject(new Error(err))
    } else {
      const client = new srp.Client(parameters, Buffer.from('0'), Buffer.from(identity), Buffer.from('0'), secret)
      const securityState = {
        clientSecret: secret,
        identity: identity,
        srpA: client.computeA().toString('base64')
      }

      deferred.resolve(securityState)
    }
  })
  return deferred.promise
}

const computeSharedKeyAndUpdateState = (securityState, salt, password, serverB) => {
  securityState.srpClient = new srp.Client(parameters,
    Buffer.from(salt, 'base64'),
    Buffer.from(securityState.identity),
    Buffer.from(password),
    securityState.clientSecret)
  securityState.srpClient.setB(Buffer.from(serverB, 'base64'))
  return jose.JWK.asKey({
    'kty': 'oct',
    'kid': securityState.sessionSecret,
    'use': 'enc',
    'alg': 'A256KW',
    'k': securityState.srpClient.computeK().toString('base64')
  }).then(result => {
    securityState.sharedKey = result
    return result
  })
}

const generateJWT = (payload, key) => {
  if (!payload || !key) {
    throw new Error('Payload, key, or both are null')
  }
  return jose.JWE.createEncrypt({ format: 'compact' }, key)
    .update(JSON.stringify(payload))
    .final()
}

const decodeJWT = (jwt, key) => {
  if (!jwt || !key) {
    throw new Error('Jwt, key or both are null')
  }
  return jose.JWE.createDecrypt(key).decrypt(jwt)
}

const createMasterKey = (password) => {
  const salt = crypto.randomBytes(16)
  return computeMasterKey(password, salt).then(computedKey => {
    return {
      masterKey: computedKey,
      salt: salt.toString('base64')
    }
  })
}

const computeMasterKey = (password, salt) => {
  const deferred = Q.defer()
  crypto.pbkdf2(password, Buffer.from(salt, 'base64'), 20000, 32, 'sha512', (err, derivedKey) => {
    if (err) {
      deferred.reject(new Error(err))
    } else {
      deferred.resolve(derivedKey.toString('base64'))
    }
  })
  return deferred.promise
}

const encryptForLocalStorage = (payload, masterKey) => {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv('aes-256-ctr', Buffer.from(masterKey, 'base64'), iv)
  let encryptedPayload = cipher.update(payload, 'utf8', 'base64')
  encryptedPayload += cipher.final('base64')
  return {
    cipherText: encryptedPayload,
    iv: iv.toString('base64')
  }
}

const decryptFromLocalStorage = ({cipherText, iv}, masterKey) => {
  const decipher = crypto.createDecipheriv('aes-256-ctr', Buffer.from(masterKey, 'base64'), Buffer.from(iv, 'base64'))
  let dec = decipher.update(cipherText, 'base64', 'utf8')
  dec += decipher.final('utf8')
  return dec
}

const getHash = (value) => {
  return crypto.createHash('sha256').update(value, 'utf8').digest('base64')
}

module.exports = {
  securityLevels,
  getVerifierToCreateNewAccount,
  getClientAuthRequestAsync,
  getM1ForLogonFinalization,
  verifyServerEvidenceMessage,
  generateJWT,
  decodeJWT,
  encryptForLocalStorage,
  decryptFromLocalStorage,
  createMasterKey,
  computeSharedKeyAndUpdateState,
  computeMasterKey,
  getHash
}
