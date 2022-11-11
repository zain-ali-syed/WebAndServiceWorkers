const publicVapidKey = 'BCFoABtp96wytEl2blENd36-Qhb6_iUB8w337E-y0Fu7HK3h5OzkCbPTji2QTkcgDtfcSRdsAN_RrcP-1FwHf28'
const options = {
  userVisibleOnly: true,
  applicationServerKey: publicVapidKey
}

function init() {
  if ('serviceWorker' in navigator) {
    //Lets Register our Service Worker sw.js
    navigator.serviceWorker
      .register('./sw.js')
      .then((registration) => {
        console.log('Service worker registered')
      })
      .catch((err) => console.log('Error registering a service worker'))

    // Use serviceWorker.ready to ensure that you can subscribe for push
    navigator.serviceWorker.ready.then((registration) => {
      registration.pushManager
        .subscribe(options)
        .then((pushSubscription) => sendSubscriptionObjectToServer(pushSubscription))
        .catch((err) => console.log('There was an error ', err))
    })
  } else {
    console.log('Sorry this browser does not support Service Workers')
  }
}

//Now lets send this to the server to subscribe this user for push notifications
//It's this subscription object which the server sends to the push server which helps it
//know where to send the push message (which the service worker then listens for to then display notification)
function sendSubscriptionObjectToServer(pushSubscription) {
  console.log('push subscriptin ', pushSubscription)
  fetch('http://localhost:3000/subscribe', {
    method: 'POST',
    body: JSON.stringify(pushSubscription),
    headers: {
      'content-type': 'application/json'
    }
  }).then((res) => console.log('Sent to server successfully'))
}

// function urlBase64ToUint8Array(base64String) {
//   const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
//   const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')

//   const rawData = window.atob(base64)
//   const outputArray = new Uint8Array(rawData.length)

//   for (let i = 0; i < rawData.length; ++i) {
//     outputArray[i] = rawData.charCodeAt(i)
//   }
//   return outputArray
// }

document.addEventListener('DOMContentLoaded', init)
