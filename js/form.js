
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

    //post blog
    fetch('http://localhost:3000/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(messageInfo),
       })
       .then(res => {
        console.log("We got server response ", res.clone())
        return res
       })
       .catch((err) => {
        //Lets call background sync function with the eventTag. So when we are back online the SW is called with the tag 'postMessage'
        if(!navigator.onLine) {
          //background sync is only used when user is offline
          backgroundSync('postMessage')
        } else {
          console.log("Looks like server is down (rather than being offline - background SYNC not available as obviously serverWorker can't know when Server is back online")
        }
    })
  })
 }

 //Register our sync event with our Service Worker Registration object
 function backgroundSync(syncEvent) {
    navigator.serviceWorker.ready.then(function(registration) {
      console.log(`Registering a background sync event: ${syncEvent} using our service worker registation object to call sync.register()`)
      console.log("When next online this syncEvent is fired and we can hear it in the 'sync' event in our SW")
      return registration.sync.register(syncEvent);
    })
}
 
 
 document.addEventListener("DOMContentLoaded", init)