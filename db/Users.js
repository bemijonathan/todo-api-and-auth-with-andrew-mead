const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.toJSON = function () {
    var userObject = this.toObject()
    return userObject = {
        email: userObject.email,
        id: userObject._id
    }
}

UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({
        _id: user._id.toHexString(),
        access
    }, 'abc123').toString();

    user.tokens = user.tokens.concat([{
        access,
        token
    }]);

    return user.save().then(() => {
        return token;
    });
};

UserSchema.statics.findByToken = function(token){
    var decoded;

        try {
            decoded = jwt.verify(token,'abc123' )
        } catch (error) {
            
        }

    return this.findOne({
        _id: decoded._id,
        'tokens.token':token,
        'tokens.access':'auth'
    });
    
}

var User = mongoose.model('User', UserSchema);

module.exports = User