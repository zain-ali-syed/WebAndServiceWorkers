function init() {
  if ('serviceWorker' in navigator) {
    //Lets Register our Service Worker sw.js
    navigator.serviceWorker
      .register('./sw.js')
      .then((registrationObject) => console.log('A Service Worker has been registered ', registrationObject))
      .catch((err) => console.log('Error registering a service worker ', err))

    // 2. See if the page is currently has a service worker.
    if (navigator.serviceWorker.controller) {
      console.log('app.js: we have a service worker for this webpage')
    }

    // 3. Register a handler to detect when a new or
    navigator.serviceWorker.oncontrollerchange = () => {
      console.log('app.js: New service worker activated')
    }
  } else {
    console.log('Sorry this browser does not support Service Workers')
  }
}

document.addEventListener('DOMContentLoaded', init)
