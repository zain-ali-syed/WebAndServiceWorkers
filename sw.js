//Service Worker Version
const version = 1

const staticCache = `staticCache_${version}`
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
    console.log(`Open cache ${staticCache} and store static assets`)

    event.waitUntil(
        caches.open(staticCache)
              .then(cache => { cache.addAll(staticAssets).then(() => console.log("assets added")) })
              .catch((err) => console.log('Error opening cache ', err))
    )
})

//Listen for Activation event
self.addEventListener('activate', () => {
    console.log("Activation of Service Worker version:", version)
})

//Listen for Fetch event
self.addEventListener('fetch', (event) => {
    console.log("A fetch event occured: ", event.request.url)
    event.respondWith(
        caches.match(event.request)
              .then(cacheResponse => {
                 return cacheResponse || fetch(event.request)
              })            
    )
})