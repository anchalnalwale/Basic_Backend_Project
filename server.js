// const express = require('express')
// const app = express();
// const db = require('./db');
// require('dotenv').config();
// const passport = require('./auth');
// const LocalStrategy = require('passport-local').Strategy;
// const Person = require('./models/person');

// const bodyParser = require('body-parser');
// app.use(bodyParser.json());
// const PORT = process.env.PORT || 3000;

// const logRequest = (req,res,next) => {
//   console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
//   next();
// }
// app.use(logRequest);

// passport.use(new LocalStrategy(async (USERNAME , password , done) => {
//   try{
//     console.log('Received credentials:', USERNAME, password);
//     const user = await Person.findOne({username: USERNAME});
//     if(!user)
//       return done(null, false, {message: 'Incorrect username.'});
//     const isPasswordMatch = user.password === password ? true : false;
//     if(isPasswordMatch) {
//       return done(null,user);
//     }else {
//       return done(null,false, {message: 'Incorrect password.'});
//     }
//   }catch(err){
//     return done(err);
//   }
// }));

// app.use(passport.initialize());

// const localAuthMiddleware = passport.authenticate('local',{session:false})
// app.get('/',function (req,res) {
//   res.send('Welcome to our Hotel');
// })

// const personRoutes = require('./routes/personRoutes');
// const menuItemRoutes = require('./routes/menuItemRoutes');

// app.use('/menuItems',menuItemRoutes);
// app.use('/person',localAuthMiddleware,personRoutes);

// app.listen(3000, () => {
//   console.log('Listening on port 3000');
// });



const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./auth');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/person');

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
    
    // Use the comparePassword method from the model
    const isPasswordMatch = await user.comparePassword(password);
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

// Custom middleware to handle query parameters for authentication
const localAuthMiddleware = (req, res, next) => {
  // Check if username and password are in query parameters
  if (req.query.username && req.query.password) {
    // Initialize req.body if it doesn't exist
    if (!req.body) {
      req.body = {};
    }
    // Move query parameters to body for passport
    req.body.username = req.query.username;
    req.body.password = req.query.password;
  }
  
  passport.authenticate('local', {session: false}, (err, user, info) => {
    if (err) {
      return res.status(500).json({error: 'Internal Server Error'});
    }
    if (!user) {
      return res.status(401).json({error: info.message});
    }
    // Store user in request for use in routes
    req.user = user;
    next();
  })(req, res, next);
};

app.get('/',function (req,res) {
  res.send('Welcome to our Hotel');
})

const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

app.use('/menuItems',menuItemRoutes);
app.use('/person',localAuthMiddleware,personRoutes);

app.listen(3000, () => {
  console.log('Listening on port 3000');
});