const bcryptjs = require('bcryptjs')

const encrypt = (password) => {
    const salt = bcryptjs.genSaltSync(10)
    const hash = bcryptjs.hashSync(password, salt)
    return hash
}

const decrypt = (password, hash) => {
    return bcryptjs.compareSync(password, hash)
}

module.exports = { encrypt, decrypt }