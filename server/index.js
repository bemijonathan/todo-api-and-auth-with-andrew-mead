var express = require('express');
var bodyParser = require('body-parser')
var mongoose = require('../db/mongoose');
var Todo = require('../db/Todo');
var User = require('../db/Users');


var app = express()
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json({
        reply: 'hello world'
    })
})

app.post('/todo', (req, res) => {
    var text = req.body.text
    var todo = new Todo({
        text: text
    })
    todo.save().then((result) => {
        console.log(result)
        res.send('ok')
    }, err => {
        res.send(err)
    })
})

app.get('/users/email', (req, res) => {
    var token = req.header('x-auth')

    User.findByToken(token).then(user => {
        if (!user){
            res.status(401).send()
        }
        res.send(user);
    })
})

app.post('/users', (req, res) => {
    var email = req.body.email 
    var password = req.body.password 
    var user = new User({
        email,
        password
    });
  
    user.save().then(() => {
      return user.generateAuthToken();
    }).then((token) => {
      res.header('x-auth', token).send(user);
    }).catch((e) => {
      res.status(400).send(e);
    })
  });


let port = 3000

app.listen(port, () => {
    console.log('App has started')
})