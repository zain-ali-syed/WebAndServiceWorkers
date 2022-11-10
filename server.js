const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors({ origin: '*' }))
app.use(bodyParser.json())

app.listen(3000, () => {
  console.log('The server started on port 3000')
})

app.get('/', (req, res) => {
  res.send('Hello from the server')
})

app.post('/message', (req, res) => {
  const messageData = req.body
  console.log(`Server: Recieved message and will now add to DB`)
  console.log(messageData)

  //IMAGINE SOME CODE TO ADD MESSAGE TO DB HERE....

  //Send success response back to client
  res.status(200).json({ status: 'ok' })
})
