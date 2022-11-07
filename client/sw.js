//Service Worker Version
const version = 2

//Listen for Installation event of Service Worker
self.addEventListener('install', (event) => {
  console.log('Installation of Service Worker version:', version)
})

//Listen for Activation event
self.addEventListener('activate', (event) => {
  console.log('Activation of Service Worker version:', version)
})

//Listen for Fetch event
self.addEventListener('fetch', (event) => {
  console.log('Fetch event for ', event.request.url)
})

self.addEventListener('push', (event) => {
  console.log('Recieved push notification from Push Service')
  const data = event.data.json()
  self.registration.showNotification(data.title, {
    body: data.message,
    icon: 'http://image.ibb.co/frYOFd/tmlogo.png'
  })
})
