var mongoose = require('mongoose')


var Users = mongoose.model('Users',{
    name:{
        type: String,
        unique:true
    },
    email:{
        type:String,
        unique:true
    }
})

module.exports = Users