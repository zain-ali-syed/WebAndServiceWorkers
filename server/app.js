const express = require('express')
const cors = require('cors')
const webpush = require('web-push')
const bodyParser = require('body-parser')
let subscriptionObject

//./node_modules/.bin/web-push generate-vapid-keys
// VAPID keys should be generated only once.
const publicVapidKey = 'BCFoABtp96wytEl2blENd36-Qhb6_iUB8w337E-y0Fu7HK3h5OzkCbPTji2QTkcgDtfcSRdsAN_RrcP-1FwHf28'
const privateVapidKey = 'v1Y5Y79nteO6wAzpBTNbsBHLmRUrWAgifq665-RYhdE'

webpush.setVapidDetails('mailto:test@test123.com', publicVapidKey, privateVapidKey)

const app = express()
app.use(cors({ origin: '*' }))
app.use(bodyParser.json())

app.listen(3000, () => {
  console.log('The server started on port 3000')
})

app.get('/', (req, res) => {
  res.send("<h1 style='text-align: center'>Hello there</h1>")
})

app.post('/subscribe', (req, res) => {
  subscriptionObject = req.body
  console.log(`Server: Recieved subscription object for a user - now lets put in DB`)
  console.log(subscriptionObject)

  //IMAGINE SOME CODE TO ADD SUBSCRIPTION TO DB HERE....

  //Send success response back to client
  res.status(200).json({ status: 'ok' })
})

app.get('/sendPushNotification', (req, res) => {
  const payload = JSON.stringify({
    title: 'Push Test',
    message: 'A Sale is now on!! Get 50% off!!'
  })
  console.log('Send push notification.... ')
  console.log(subscriptionObject)
  webpush
    .sendNotification(subscriptionObject, payload)
    .then(() => res.status(200).json({ status: 'ok' }))
    .catch((err) => console.error(err))
})
