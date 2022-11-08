export let version = 1 //Only update this if we are make a chane to STRUCTURE of the database. e.g new store, keypath etc
export let db = null
export const DBName = 'messageDB'
export const DBStoreName = 'messagePosts'

//There were basically four steps: https://javascript.info/indexeddb

//Create a transaction, mentioning all the stores it’s going to access, at (1).
//Get the store object using transaction.objectStore(name), at (2).
//Perform the request to the object store books.add(book), at (3).
//…Handle request success/error (4), then we can make other requests if needed, etc.

//Open or create Database
export function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DBName, version)

    //FIRST time creating db or new version number was passed into open()
    req.onupgradeneeded = (event) => {
      db = event.target.result
      if (!db.objectStoreNames.contains(DBStoreName)) {
        db.createObjectStore(DBStoreName, { keyPath: 'id' }) //define which property of the object I want to use as the key
      }
      console.log(`Upgrading to version ${db.version}`)
    }

    //Database successfully opened/created (fires after onupgradeneeded)
    req.onsuccess = (event) => {
      db = event.target.result
      console.warn('success database opened ', db)
      resolve()
    }

    //Error while trying to open/create the db
    req.onerror = (error) => {
      console.warn(error)
      reject()
    }
  })
}

export function saveData(data) {
  return new Promise((resolve, reject) => {
    //First Create a Transaction
    let tx = db.transaction(DBStoreName, 'readwrite')

    //Now use that transaction to access the store
    let store = tx.objectStore(DBStoreName)

    //perform the request
    let req = store.put(data)

    tx.oncomplete = () => {
      console.log('Transaction complete, data saved to DB ', req.result)
      resolve()
    }

    tx.onerror = (err) => {
      console.warn('Transaction failure, data NOT saved to DB ')
      reject()
    }

    req.onsuccess = () => {
      console.log('Request save data complete')
      //tx.commit() will be called automatically if this is the last request in the transaction
      //and will trigger tx.oncomplete next
    }
  })
}

export function getData() {
  return new Promise((resolve, reject) => {
    //First Create a Transaction
    let tx = db.transaction(DBStoreName)

    //Now use that transaction to access the store
    let store = tx.objectStore(DBStoreName)

    //now make the request
    let req = store.getAll()

    tx.oncomplete = () => {
      console.log('Transaction complete, got data from db ', req.result)
      resolve(req.result)
    }

    req.onsuccess = () => {
      console.log('Request get data complete')
      //tx.commit() will be called automatically if this is the last request in the transaction
      //and will trigger tx.oncomplete next
    }

    req.onerror = (err) => {
      console.log('There was an error clearing the DB: ', err)
      reject()
    }
  })
}

//Clear all data from indexedDB before adding a new message to it (so only one message ever there at a time)
export function clearDB() {
  return new Promise(function (resolve, reject) {
    const tx = db.transaction(DBStoreName, 'readwrite')
    const store = tx.objectStore(DBStoreName)
    const req = store.clear()

    req.onsuccess = () => {
      console.log('db cleared: ', DBName)
      resolve()
    }

    req.onerror = (err) => {
      console.log('There was an error clearing the DB: ', err)
      reject()
    }
  })
}
