const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

const logRequest = (req,res,next) => {
  console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
  next();
}
app.use(logRequest);

passport.use(new LocalStrategy(async (USERNAME , password , done) => {
  try{
    console.log('Received credentials:', USERNAME, password);
    const user = await Person.findOne({username: USERNAME});
    if(!user)
      return done(null, false, {message: 'Incorrect username.'});
    const isPasswordMatch = user.password === password ? true : false;
    if(isPasswordMatch) {
      return done(null,user);
    }else {
      return done(null,false, {message: 'Incorrect password.'});
    }
  }catch(err){
    return done(err);
  }
}));

app.use(passport.initialize());

app.get('/',passport.authenticate('local',{session: false}) ,function(req,res) {
  res.send('Welcome to our Hotel')
});

const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

app.use('/menuItems',menuItemRoutes);
app.use('/person',personRoutes);

app.listen(3000, () => {
  console.log('Listening on port 3000');
});