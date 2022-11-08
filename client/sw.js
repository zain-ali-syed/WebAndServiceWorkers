//Service Worker Version
const version = 2

const staticCache = `staticCache_${version}`

const relevantCaches = [staticCache]

const staticAssets = [
  './',
  './index.html',
  './css/bootstrap.css',
  'https://fonts.googleapis.com/css?family=Poppins:400,700&display=swap',
  'https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJbecnFHGPezSQ.woff2',
  'https://use.fontawesome.com/releases/v5.6.3/css/all.css',
  './css/style.css',
  './css/responsive.css',
  './js/app.js',
  './images/logo.png',
  './images/slide-img.png',
  './images/search-icon.png',
  './404.html',
  './fallback.html',
  './images/placeholder.jpeg'
]

//Listen for Installation event of Service Worker
self.addEventListener('install', (event) => {
  console.log('Installation of Service Worker version:', version)
  console.log(`Open cache ${staticCache} and store core static assets`)

  // The install events in service workers use waitUntil() to hold the service worker in the installing phase until tasks complete (as the service worlr is always trying to shut down to save resources).
  //If the promise passed to waitUntil() rejects, the install is considered a failure, and the installing service worker is discarded.
  //This is primarily used to ensure that a service worker is not considered installed until all of the core caches it depends on are successfully populated.
  event.waitUntil(
    caches
      .open(staticCache)
      .then((cache) => {
        cache.addAll(staticAssets).then(() => console.log('assets added'))
      })
      .catch((err) => console.log('Error opening cache ', err))
  )
})

//Listen for Activation event
self.addEventListener('activate', (event) => {
  console.log('Activation of Service Worker version:', version)
  //Now the new service worker is activated we can now delete previous
  //caches made by the previous service worker
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        //This map returns an array of promises and when all are resolved promise.all is reslved and rturns a single
        //promise to event.waitUntil
        cacheNames.map((cacheName) => {
          if (!relevantCaches.includes(cacheName)) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

//Listen for Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cacheResponse) => {
      return cacheResponse || fetch(event.request)
    })
  )
})

//Background Sync
//When our app comes back ONLINE and we have previously registered sync events
//then this sync event listener is called for EACH of the registered sync events
self.addEventListener('sync', function (event) {
  console.log('------------BACK ONLINE SYNC EVENT-----------------')
  console.log('Lets send the saved message to the server now')
  if (event.tag == 'postMessage') {
    autoPostMessageToServer()
  }
})

function autoPostMessageToServer() {
  console.log('Post message to server')
  //IMAGINE SOME CODE HERE WHICH GETS THE SAVED MESSAGE FROM THE DB AND RETURNS....
  const messageInfo = {
    id: 1667740139400,
    name: 'Zain',
    phone: '111',
    email: 'zain@hotmail.com',
    message: 'This is my auto sent message got from DB'
  }

  fetch('http://localhost:3000/message', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(messageInfo)
  })
    .then(() => console.log('Message was automatically sent to server successfully'))
    .catch(() => Promise.reject())
}
