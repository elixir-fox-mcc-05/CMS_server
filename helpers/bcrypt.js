var bcrypt = require('bcryptjs');

function encryptPassword( password ){
    // digunakan di hooks model User, before create
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    return hash
}

function comparePassword( givenPassword, hashedPassword){
    return bcrypt.compareSync(givenPassword, hashedPassword); // true
}

module.exports = {encryptPassword, comparePassword}