const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

app.use('/menuItems',menuItemRoutes);
app.use('/person',personRoutes);

app.listen(3000, () => {
  console.log('Listening on port 3000');
})

