const bcrypt = require('bcryptjs')

function encryptPassword(password){
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt)
    return hash
}

function decryptPassword(password, hash){
    return bcrypt.compareSync(password, hash)
}

module.exports = {
    encryptPassword,
    decryptPassword
}