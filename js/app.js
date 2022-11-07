const cacheName = 'myCache'


function init() {
  //Get references to the buttons
  const createCacheBtn = document.querySelector('#createCacheBtn')
  const addToCacheBtn = document.querySelector('#addToCacheBtn')
  const checkCacheBtn = document.querySelector('#checkCacheBtn')
  const deleteCacheBtn = document.querySelector('#deleteCacheBtn')

  //1. Create/Open the Cache cacheName (and console log success or failure) using caches.open() method
  createCacheBtn.addEventListener('click', () => {
    caches.open(cacheName)
          .then(cache => console.log('Cache successfully opened/created ', cache))
          .catch(err => console.log(`Im sorry there was an error opening/creating the cache ${cacheName}: ${err}`))
  })

  //2. Let's add all the images in /img folder to the Cache myCache using the cache.addAll() method
  addToCacheBtn.addEventListener('click', () => {
    caches.open(cacheName)
          .then(cache => {
            //Now let's add multiple requests to the Cache by using the addAll method
            // addAll is like fetch() + put() - it fetches the resources from the server and puts the request/responses in the Cache
            cache.addAll(['./img/dish.png', './img/pepe.png', './img/mountains.png'])
                 .then(() => console.log('Successfully added assets to the cache'))
                 .catch((err) => console.log('Sorry there was an error adding assets to the cache ', err))
          })
          .catch(err => console.log(`Im sorry there was an error opening/creating the cache ${cacheName}: ${err}`))
  })

  //3. Check if pepe image is already cached using the cache.match() method. 
  //   If cached then console log 'success'. If it's not cached, let's cache it then!!
  checkCacheBtn.addEventListener('click', () => {
    caches.match('./img/pepe.png')
          .then((cacheResponse) => {
            if(cacheResponse){
              console.log(`Pepe has been found!!! in the cache ${cacheName}`)
            } else {
              console.log(`Im sorry Pepe was not found in the cache ${cacheName} - so let's fetch and put it in the Cache`)
              caches.open(cacheName)
                    .then(cache => { 
                      cache.add('./img/pepe.png')
                           .then(() => console.log('Pepe has now been successfully cached'))
                    })
            }
          })
  })

  //4. Delete the cache myCache using the caches.delete method
  deleteCacheBtn.addEventListener('click', () => {
    caches.delete(cacheName)
          .then(deleted => console.log(`Cache ${cacheName} has been deleted: `, deleted))
  })
}

 
  document.addEventListener('DOMContentLoaded', init);