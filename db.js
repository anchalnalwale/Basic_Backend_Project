const  mongoose  = require("mongoose");
require('dotenv').config();
const mongoURL = process.env.MONGODB_URL_LOCAL;
// const mongoURL = 'mongodb+srv://nalwaleanchal:Nalwale2004@cluster0.hrrtn5r.mongodb.net/';
// const mongoURL = process.env.MONGODB_URL;

mongoose.connect(mongoURL,{});

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to Mongodb Server');
});

db.on('error',(err) => {
    console.log('MongoDB connection error:',err);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

module.exports = db;
