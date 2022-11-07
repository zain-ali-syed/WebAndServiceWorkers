const cacheName = 'myCache'


function init() {
  //Get references to the buttons
  const createCacheBtn = document.querySelector('#createCacheBtn')
  const addToCacheBtn = document.querySelector('#addToCacheBtn')
  const checkCacheBtn = document.querySelector('#checkCacheBtn')
  const deleteCacheBtn = document.querySelector('#deleteCacheBtn')

  //1. Create/Open the Cache cacheName (and console log success or failure) using caches.open() method
  createCacheBtn.addEventListener('click', () => {
  })

  //2. Let's add all the images in /img folder to the Cache myCache using the cache.addAll() method
  addToCacheBtn.addEventListener('click', () => {
  })

  //3. Check if pepe image is already cached using the cache.match() method. 
  //   If cached then console log 'success'. If it's not cached, let's cache it then!!
  checkCacheBtn.addEventListener('click', () => {
  })

  //4. Delete the cache myCache using the caches.delete method
  deleteCacheBtn.addEventListener('click', () => {
  })
}

 
  document.addEventListener('DOMContentLoaded', init);