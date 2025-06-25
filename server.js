const express = require('express')
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const Person = require('./models/person');

app.get('/', function (req, res) {
  res.send('Welcome to my restaurant... How can I help you ?');
})

app.post('/person', async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log('data saved');
    res.status(200).json(response);
  }
  catch(err) {
    console.log(err);
    res.status(500).json({errpr: 'Internal Server Error'});
  }
})

app.listen(3000, () => {
  console.log('Listening on port 3000');
})

