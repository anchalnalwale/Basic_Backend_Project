const express = require('express')
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const MenuItem = require('./models/MenuItems');

app.post('/menuItems', async (req, res) => {
  try {
    const data = req.body;
    const newItem = new MenuItem(data);
    const response = await newItem.save();
    console.log('data saved');
    res.status(200).json(response);
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.get('/menuItems', async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log('data fetched');
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

const personRoutes = require('./routes/personRoutes');
app.use('/person',personRoutes);

app.listen(3000, () => {
  console.log('Listening on port 3000');
})

