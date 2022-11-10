function init() {
  console.log('Initialise form functionality')

  document.getElementById('sendMessageBtn')?.addEventListener('click', (ev) => {
    ev.preventDefault()
    const messageInfo = {
      id: Date.now(),
      name: document.getElementById('name').value,
      phone: document.getElementById('phone').value,
      email: document.getElementById('email').value,
      message: document.getElementById('message').value
    }

    console.log(messageInfo)

    //(1) We try submitting a messge but unfortunately we are offline so it fails
    //(2) Backgound Sync allows us to register a named sync event for this failure
    //(3) When we are BACK online (and we have registered sync events defined prviosuly) then the SYNC event is AUTOMATICALLY called in the SW and we can listen for it
    // and also determine the coressponding sync event by looking at event.tag

    // post message
    fetch('http://localhost:3000/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(messageInfo)
    })
      .then(() => console.log('Message sent to server...'))
      .catch((err) => {
        if (!navigator.onLine) {
          console.log('we are OFFLINE SEND MESSAGE LATER')
          registerBackgroundSync('postMessage')
        } else {
          console.log('Looks like server is down rather than being offline.')
        }
      })
  })
}

// Register our sync event with our Service Worker Registration object
function registerBackgroundSync(syncEvent) {
  console.log('Register sync event')
  navigator.serviceWorker.ready
    .then((registration) => {
      return registration.sync.register(syncEvent)
    })
    .catch((err) => console.log('error registering sync event'))
}

document.addEventListener('DOMContentLoaded', init)
