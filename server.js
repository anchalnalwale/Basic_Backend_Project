// function add(a , b)
// {
//     return a+b;
// }

// let ans = add(8 , 8);
// console.log(ans);

// let fs = require('fs');
// let os = require('os');

// let user = os.userInfo();
// console.log(user);
// console.log(user.username);

// fs.appendFile('greeting.txt' , 'Hi' + " " + user.username + '!\n' , ()=>{
//     console.log('file is created');
// });


// const notes = require('./notes.js');
// console.log('server file is available');

// var age = notes.age;

// var result = notes.addNumber(age+18,10);

// console.log(age);
// console.log('result is now ' +result);

// var _ = require('lodash');
// var data = ["Abhi" , "Anchal" , 1 , 2 , 2 , 1 , 9 , 5];
// var filter = _.uniq(data);
// console.log(filter);

// console.log(_.isString(true));

// const jsonString = '{"name": "john" ,"age":30 , "city":"New York"}';
// const jsonObject = JSON.parse(jsonString);
// console.log(jsonObject.name);

// const objectToConvert = {name: "Alice", age:25};
// const jsonStringified = JSON.stringify(objectToConvert);
// console.log(jsonStringified);



const express = require('express')
const app = express()

app.get('/', function(req, res) {
  res.send('Welcome to my restaurant... How can I help you ?');
})

app.get('/drinks', (req,res)=>{
    var cold_drinks = {
        drink1 : 'Hell',
        drink2 : 'Chilli Guava Mojito',
        drink3 : 'Lemon Mojito',
        drink4 : 'Peach Mojito',
    }
    res.send(cold_drinks);
})

app.post('/person',(req,res)=>{
    res.send("Data is saved");
})

app.get('/chicken',(req,res)=>{
    var customized_chicken = {
        name : 'green chicken',
        size : '10cm diameter',
        is_gravy: true,
        is_onion: false
    }
    res.send(customized_chicken);
})   

app.listen(3000, ()=>{
    console.log('Listening on port 3000');
})

