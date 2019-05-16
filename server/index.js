var express = require('express');
var bodyParser = require('body-parser')
var mongoose = require('../db/mongoose');
var Todo = require('../db/Todo');
var User = require('../db/Users');


var app = express()
app.use(bodyParser.json())

app.get('/', (req, res)=>{
    res.json({
        reply: 'hello world'
    })
})

app.post('/todo', (req, res)=>{
    var text = req.body.text
    var todo = new Todo({
        text: text
    })
    todo.save().then((result)=>{
        console.log(result)
        res.send('ok')
    },err=>{
        res.send(err)
    }) 
})


let port = 3000 

app.listen(port, ()=>{
    console.log('App has started')
})