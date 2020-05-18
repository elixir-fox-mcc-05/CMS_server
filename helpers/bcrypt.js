const bcrypt = require('bcryptjs')

let saltRounds = +process.env.SPICY
let spicyRounds = +process.env.EXTRASPICY

function generatePassword(password) {
    let salt = bcrypt.genSaltSync(saltRounds)
    let hash = bcrypt.hashSync(password, salt)
    return hash
}

function generateAdminPassword(password) {
    let salt = bcrypt.genSaltSync(spicyRounds)
    let hash = bcrypt.hashSync(password, salt)
    return hash
}

function verifyPassword(password, hash) {
    return bcrypt.compareSync(password, hash)
}

module.exports = {
    generatePassword,
    generateAdminPassword,
    verifyPassword
}
