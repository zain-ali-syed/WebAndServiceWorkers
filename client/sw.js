//Service Worker Version
const version = 2

//Listen for Installation event of Service Worker
self.addEventListener('install', (event) => {
  console.log('Installation of Service Worker version:')
  //Precache your static website shell assets here
})

//Listen for Activation event of the Service Worker
self.addEventListener('activate', (event) => {
  console.log('Activation of Service Worker version:', version)
  //Delete any old non relevant caches here if need be
})

//Listen for Fetch events from the application
self.addEventListener('fetch', (event) => {
  console.log('Fetch event for ', event.request.url)
  //Listen for network requests here and decide where to serve from (cache or server)
})

//Listen for Sync event (fired when back online and we have a registered a syncEvent)
self.addEventListener('sync', (event) => {
  if (event.tag === 'postMessage') {
    //Now we are back online due to a postMessage sync event let's send the
    //message to the server
  }
})

//Listen for Push event from our Web Server
self.addEventListener('push', (event) => {
  console.log('Recieved push notification from Push Service')
  //Notifications sent from server e.g 50% off sale!!!
  const data = event.data.json()
  self.registration.showNotification(data.title, {
    body: data.message,
    icon: 'http://image.ibb.co/frYOFd/tmlogo.png'
  })
})
