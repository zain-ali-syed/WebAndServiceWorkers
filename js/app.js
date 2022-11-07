//Create Web Worker
const worker = new Worker('./js/webworker.js')

function init() {

  //Get references to the buttons
  const changeBackgroundColourBtn = document.querySelector('#changeBackgroundColourBtn')
  const calculatePrimeNumbersBtn = document.querySelector('#calculatePrimeNumbersBtn')
  const results = document.querySelector('#results')

  //Change background colour of page
  changeBackgroundColourBtn.addEventListener('click', () => {
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    var bgColor = "rgb(" + x + "," + y + "," + z + ")";
    document.body.style.background = bgColor;
    })

   //Time consuming Javascipt to calculate Primes is now in the webworker
  // lets send a message to the webworker telling it to run that function
  calculatePrimeNumbersBtn.addEventListener('click', () => {
     //post message to webworker telling it what function to call
     worker.postMessage({function: true, functionName: "calculatePrimeNumbers", message: "Hello from the main app"})
  })

  //Lets listen for the message back from the webworker with the results
  worker.onmessage = function ({ data }) {
     console.log("We have the results back from the Web Worker")
     results.innerHTML = data.primeNumbers
  }
}

 
  document.addEventListener('DOMContentLoaded', init);