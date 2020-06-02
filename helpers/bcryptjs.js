const bcrypt = require('bcryptjs')

function generate_password(password) {
    let salt = bcrypt.genSaltSync(+process.env.HASH)
    let hash = bcrypt.hashSync(password, salt)
    return hash
}

function compare_password(password, hash) {
    return bcrypt.compareSync(password, hash)
}

module.exports = { generate_password, compare_password }