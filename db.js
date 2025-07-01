const  mongoose  = require("mongoose");
// const mongoURL = 'mongodb://localhost:27017/hotels';
const mongoURL = 'mongodb+srv://nalwaleanchal:Nalwale2004@cluster0.hrrtn5r.mongodb.net/';

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
