const mongoose = require('mongoose');
const passport = require('passport');

const personSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true,
    },
    age : {
        type : Number,
    },
    work : {
        type : String,
        enum : ['chef','waiter','manager'],
        required : true
    },
    mobile : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    address : {
        type : String,
    },
    salary : {
        type : Number,
        required : true,
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true 
    }
});

const Person = mongoose.model('Person',personSchema);
module.exports = Person;