const {encrypt,compare} = require('./helpers/bcrypt')

let password = 'testing12'

console.log(password)
console.log(encrypt(password))