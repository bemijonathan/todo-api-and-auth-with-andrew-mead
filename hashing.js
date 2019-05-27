var {SHA256} = require('crypto-js')
var jwt = require('jsonwebtoken')


var data = {
    id: 4
};

var token = jwt.sign(data, '1a2b3');
console.log(token)
var decode = jwt.verify(token , '1a2b3')
console.log(decode)

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data)+ '123').toString()
// }

// var hashedResult = SHA256(JSON.stringify(token.data)+'123').toString()

// if(hashedResult === token.hash){
//     console.log(hashedResult)
// }