//Service Worker Version
const version = 1

//Listen for Installation event of Service Worker
self.addEventListener('install', () => {
  console.log('Installation of Service Worker version:', version)
})

//Listen for Activation event
self.addEventListener('activate', () => {
  console.log('Activation of Service Worker version:', version)
})

//Listen for Fetch event
self.addEventListener('fetch', (event) => {
  console.log('A fetch event occured: ', event.request.url)
})

//Listen for Background sync event
self.addEventListener('sync', (event) => {
  console.log(`Back Online: A background sync event happened for ${event.target}`)
})
