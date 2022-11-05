//Service Worker Version
const version =  9

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
    './images/search-icon.png',
    './404.html',
    './fallback.html',
    './images/placeholder.jpeg'
]

//Listen for Installation event of Service Worker
self.addEventListener('install', (event) => {
    
    console.log("Installation of Service Worker version:", version)
    console.log(`Open cache ${staticCache} and store core static assets`)
  
   // The install events in service workers use waitUntil() to hold the service worker in the installing phase until tasks complete (as the service worlr is always trying to shut down to save resources). 
   //If the promise passed to waitUntil() rejects, the install is considered a failure, and the installing service worker is discarded. 
   //This is primarily used to ensure that a service worker is not considered installed until all of the core caches it depends on are successfully populated.
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
    //This allows us to in effect pause the fetch event and respond with ur own custom event
    event.respondWith(
        caches.match(event.request)
              .then(cacheResponse => {
                //If it exists in cache then serve from cache - otherwise make a fetch request to the server
                 return cacheResponse || fetch(event.request).then(serverReponse => {

                    if (serverReponse.status === 404) {
                        //We and server are online but the page is not found (and the server sends back status 404)
                        if(event.request.url.match(/html/)) return caches.match('/404.html')
                        if(event.request.url.match(/jpeg|png|gif/)) return caches.match('/images/placeholder.jpeg')
                    }
                    //once we get the response stream from the server lets store it in the dynamic cache by cloning it
                    return caches.open(dynamicCache)
                          .then(cache => {
                            cache.put(event.request, serverReponse.clone())
                            //Now let's return the response
                            return serverReponse
                          })
                 }).catch(() => {
                    //User is offline and asset has not been cached (or Server is not responding)
                    if(event.request.url.match(/html/)) return caches.match('/fallback.html')
                 })
              })            
    )
})


//Background Sync - When our app come back ONLINE and we have previously registered sync events
//then this sync event listener is called for EACH of the registered sync events
self.addEventListener('sync', function(event) {
    if (event.tag == 'postMessage') {
        console.log("------------BACK ONLINE-----------------")
        console.log("Sync event ", event.tag)
        console.log("Now let's post our message")
    }
});