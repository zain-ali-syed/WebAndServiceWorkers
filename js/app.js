function init() {
   if('serviceWorker' in navigator){
     //Lets Register our Service Worker sw.js
     navigator.serviceWorker.register('./sw.js', { type: 'module' })
              .then((registration) => console.log('A Service Worker has been registered'))
              .catch(err => console.log("Error registering a service worker ", err ))
     
   } else {
     console.log('Sorry this browser does not support Service Workers')
   }
}


document.addEventListener("DOMContentLoaded", init)