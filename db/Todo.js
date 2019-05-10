var mongoose = require('mongoose')


var Todo = mongoose.model('Todo',{
    text:{
        type: String,
        unique:true,
        required:true
    },
    finished:{
        type:Boolean,
        default:false
    },
    time:{
        type: Number
    }
})

module.exports = Todo