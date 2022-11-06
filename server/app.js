const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log('The server started on port 3000 !!!!!!');
});

app.get('/', (req, res) => {
  res.send(
    "<h1 style='text-align: center'>Welcome to the Server <br><br>😃👻😃👻😃👻😃👻😃</h1>"
  );
});

app.post('/message', (req, res) => {
    console.log('SERVER received request');
    const messageData = req.body;
    console.log("SERVER: Added message to database:", messageData)
    res.send(messageData);
  });