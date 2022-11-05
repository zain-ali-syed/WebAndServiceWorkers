//Service Worker Version
const version =  7

const staticCache = `staticCache_${version}`
const dynamicCache = `dynamicCache${version}`

const relevantCaches = [staticCache, dynamicCache]

//CORE assets that make up the WEB APPLICATION SHELL 
// - index page, core css, core javascript files, logos etc
// List of all the asset requests that we want to PRECACHE
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
    './images/search-icon.png'
]

//Listen for Installation event of Service Worker
self.addEventListener('install', (event) => {
    
    console.log("Installation of Service Worker version:", version)
    console.log(`Open cache ${staticCache} and store core static assets`)

    event.waitUntil(
        caches.open(staticCache)
              .then(cache => { cache.addAll(staticAssets).then(() => console.log("assets added")) })
              .catch((err) => console.log('Error opening cache ', err))
    )
})

//Listen for Activation event
self.addEventListener('activate', (event) => {
    console.log("Activation of Service Worker version:", version)
    //Now the new service worker is activated we can now delete previous
    //caches made by the previous service worker
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                //This map returns an array of promises and when all are resolved promise.all is reslved and rturns a single
                //promise to event.waitUntil
                cacheNames.map(cacheName => {
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
    console.log("A fetch event occured: ", event.request.url)

    //This allows us to in effect pause the fetch event and respond with ur own custom event
    event.respondWith(
        caches.match(event.request)
              .then(cacheResponse => {
                //If it exists in cache then serve from cache - otherwise make a fetch request to the server
                 return cacheResponse || fetch(event.request).then(serverReponse => {
                    //once we get the response stream from the server lets store it in the dynamic cache by cloning it
                    return caches.open(dynamicCache)
                          .then(cache => {
                            cache.put(event.request, serverReponse.clone())
                            //Now let's return the response
                            return serverReponse
                          })
                 })
              })            
    )
})