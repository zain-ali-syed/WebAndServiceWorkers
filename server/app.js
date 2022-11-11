const express = require('express')
const cors = require('cors')
const webpush = require('web-push')
const bodyParser = require('body-parser')

const app = express()
app.use(cors({ origin: '*' }))
app.use(bodyParser.json())

app.listen(3000, () => {
  console.log('The server started on port 3000')
})

app.get('/', (req, res) => {
  res.send('<h1>Hello Vodafone</h1>')
})

app.post('/subscribe', (req, res) => {
  //Recieve pushSubscription object here which is sent by client
  res.status(200).json({ status: 'ok' })
})

app.get('/sendPushNotification', (req, res) => {
  //Push to the browswer vendor push service which will push to client
})
