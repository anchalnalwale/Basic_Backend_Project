const express = require('express')
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const Person = require('./models/person');

app.get('/', function (req, res) {
  res.send('Welcome to my restaurant... How can I help you ?');
})

app.post('/person', (req, res) => {
  const data = req.body;
  const newPerson = new Person(data);
  newPerson.save((error, savedPerson) => {
    if (error) {
      console.log('Error saving person:', error);
      res.status(500).json({ error: 'Internal Server error' })
    }
    else {
      console.log('Data Saved successfully');
      res.status(200).json(savedPerson);
    }
  })
})

app.listen(3000, () => {
  console.log('Listening on port 3000');
})

