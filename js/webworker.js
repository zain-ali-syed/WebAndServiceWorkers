//Messages from the main app are heard here
self.onmessage = function ({ data }) {
  console.log('Imcoming message from the main app: ', data.message)
  //check if main app is asking us to call a function.
  //And if so then call it by using functionName
  if (data.function) self[data.functionName]()
}

//Now this intensive CPU work is done in a background thread and so is non-blocking.
function calculatePrimeNumbers() {
  //program to print prime numbers between the two numbers
  const lowerNumber = 0
  const higherNumber = 400000
  const primeNumbers = []

  console.log('Web worker is now calculating primes .....')

  //looping from lowerNumber to higherNumber
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
  //Post Message back to main app
  self.postMessage({ primeNumbers })
}
