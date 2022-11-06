
import { openDB, saveData, clearDB } from "./database.js";

function init() {
   console.log("Initialise form functionality")

   document.getElementById('sendMessageBtn')?.addEventListener("click", (ev) => {
    ev.preventDefault();
    
    const messageInfo = {
      id: Date.now(),
      name: document.getElementById('name').value,
      phone: document.getElementById('phone').value,
      email: document.getElementById('email').value,
      message: document.getElementById('message').value,
    }

    //(1) We try submitting a messge but unfortunately we are offline so it fails
    //(2) Backgound Sync allows us to register a named sync event for this failure
    //(3) When we are BACK online (and we have registered sync events defined prviosuly) then the 'sync' event is AUTOMATICALLY called in the SW and we can listen for it
    // and also determine the coressponding sync event by looking at event.tag

    //post message
    fetch('http://localhost:3000/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(messageInfo),
       })
       .then(response => response.json())
       .then(data => console.log('Success from server:', data))
       .catch(err => {
        if(!navigator.onLine) {
          //background sync is only used when user is offline
          console.warn('Looks like you are offline error posting to server ', err)
          openDB()
            .then(clearDB)
            .then(() => saveData(messageInfo))
            .then(() => backgroundSync('postMessage'))
        } else {
          console.log("Looks like server is down rather than being offline. Background SYNC not available for this scenario - as obviously serviceWorker can't know when Server is back online")
        }
    })
  })
 }

 //Register our sync event with our Service Worker Registration object
 function backgroundSync(syncEvent) {
    navigator.serviceWorker.ready.then(registration => {
      console.log(`Registering a background sync event: ${syncEvent} using our service worker registation object to call sync.register()`)
      console.log("When we are back online this syncEvent is fired and we can hear it in the 'sync' event in our SW")
      registration.sync.register(syncEvent);
    })
}
 
 
 document.addEventListener("DOMContentLoaded", init)