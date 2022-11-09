const cacheName = 'myCache'

function init() {
  //Get references to the buttons
  const changeBackgroundColourBtn = document.querySelector('#changeBackgroundColourBtn')
  const calculatePrimeNumbersBtn = document.querySelector('#calculatePrimeNumbersBtn')
  const results = document.querySelector('#results')

  //1. Change background colour of page
  changeBackgroundColourBtn.addEventListener('click', () => {
    var x = Math.floor(Math.random() * 256)
    var y = Math.floor(Math.random() * 256)
    var z = Math.floor(Math.random() * 256)
    var bgColor = 'rgb(' + x + ',' + y + ',' + z + ')'
    document.body.style.background = bgColor
  })

  //2. Time consuming Javascipt to calculate Primes
  // program to print prime numbers between the two numbers
  //EXERCISE: Lets calculate the Prime numbers in a Web Worker on it's own thread so it's non blocking.

  calculatePrimeNumbersBtn.addEventListener('click', () => {
    //program to print prime numbers between the two numbers
    const lowerNumber = 0
    const higherNumber = 200000
    const primeNumbers = []

    // looping from lowerNumber to higherNumber
    for (let i = lowerNumber; i <= higherNumber; i++) {
      let flag = 0

      // looping through 2 to user input number
      for (let j = 2; j < i; j++) {
        if (i % j == 0) {
          flag = 1
          break
        }
      }

      // if number greater than 1 and not divisible by other numbers
      if (i > 1 && flag == 0) {
        primeNumbers.push(i)
        console.log('Found prime: ', i)
      }
    }
    console.log(`The prime numbers between ${lowerNumber} and ${higherNumber} are: `, primeNumbers)
    results.innerHTML = primeNumbers
  })
}

document.addEventListener('DOMContentLoaded', init)
