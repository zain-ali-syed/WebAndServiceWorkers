LESSON 1 : Register Service Worker and Add EVENT LISTENERS FOR LIFECYCLE EVENTS - DONE 10 Mins
LESSON 2 : Add Website Shell assets to a staticCache
LESSON 3 : Retrieving Assets FROM Static Cache - (Index page should be available offline now)

LESSON 4 : Deleting old non-relevant Caches
(if we don't when we make a change to index page for e.g it will still show old cached content)

LESSON 5 : Adding to DYNAMIC cache - so that pages we visit are cached
(Now these previously visited pages are available even when we are offline)

LESSON 6 : Handling 404 pages and non-cached assets when user is OFFLINE (or server not responding)

LESSON 7 : Implementing Background Sync

For lesson 3
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
'./fallback.html'
]
