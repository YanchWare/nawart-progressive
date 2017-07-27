import idb from 'idb'

const getADatabase = databaseName => {
  const dbPromise = idb.open(databaseName + '-store', 1, upgradeDB => {
    upgradeDB.createObjectStore(databaseName)
  })

  return {
    get (key) {
      return dbPromise.then(db => {
        return db.transaction(databaseName)
          .objectStore(databaseName).get(key)
      })
    },
    set (key, val) {
      return dbPromise.then(db => {
        const tx = db.transaction(databaseName, 'readwrite')
        tx.objectStore(databaseName).put(val, key)
        return tx.complete
      })
    },
    delete (key) {
      return dbPromise.then(db => {
        const tx = db.transaction(databaseName, 'readwrite')
        tx.objectStore(databaseName).delete(key)
        return tx.complete
      })
    },
    clear () {
      return dbPromise.then(db => {
        const tx = db.transaction(databaseName, 'readwrite')
        tx.objectStore(databaseName).clear()
        return tx.complete
      })
    },
    keys () {
      return dbPromise.then(db => {
        const tx = db.transaction(databaseName)
        const keys = []
        const store = tx.objectStore(databaseName)

        // This would be store.getAllKeys(), but it isn't supported by Edge or Safari.
        // openKeyCursor isn't supported by Safari, so we fall back
        const functionToCall = (store.iterateKeyCursor || store.iterateCursor)
        functionToCall.call(store, cursor => {
          if (!cursor) return
          keys.push(cursor.key)
          cursor.continue()
        })

        return tx.complete.then(() => keys)
      })
    }
  }
}

module.exports = {
  articlesDb: getADatabase('nawart-articles')
}
