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

    //(1) We try submitting a messge but unfortunately we are offline so it fails
    //(2) Backgound Sync allows us to register a named sync event for this failure
    //(3) When we are BACK online (and we have registered sync events defined prviosuly) then the SYNC event is AUTOMATICALLY called in the SW and we can listen for it
    // and also determine the coressponding sync event by looking at event.tag

    //post message
    fetch('http://localhost:3000/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(messageInfo)
    })
      .then(() => console.log('Message sent to server...'))
      .catch((err) => {
        if (!navigator.onLine) {
          //User tried sending this message when OFFLINE - Perfect to register a background sync event here
          //So when back online this message is automatically sent by the SW to the server
          ///IMAGINE SOME CODE TO ADD MESSAGE TO DB HERE.... THEN LATER WHEN ONLINE the SW will retrieve the MESSAGE FROM THE DB and send to the server
          //addtoDataBase(messageInfo)
          console.clear()
          console.log("We are offline let's register a sync event: postMessage")
          registerBackgroundSync('postMessage')
        } else {
          console.clear()
          console.log(
            "Looks like server is down rather than being offline. Background SYNC not available for this scenario - as obviously serviceWorker can't know when Server is back online"
          )
        }

        console.warn(err)
      })
  })
}

//Register our sync event with our Service Worker Registration object
function registerBackgroundSync(syncEvent) {
  navigator.serviceWorker.ready.then((registration) => {
    console.clear()
    console.log(
      `Registering a background sync event: ${syncEvent} using our service worker registation object to call sync.register()`
    )
    console.log("When we are back online this syncEvent is fired and we can hear it in the 'sync' event in our SW")
    return registration.sync.register(syncEvent)
  })
}

document.addEventListener('DOMContentLoaded', init)
