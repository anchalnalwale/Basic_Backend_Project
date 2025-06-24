const express = require('express')
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const Person = require('./models/person');

app.get('/', function(req, res) {
  res.send('Welcome to my restaurant... How can I help you ?');
})

app.listen(3000, ()=>{
    console.log('Listening on port 3000');
})

