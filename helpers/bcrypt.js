const bcrypt = require('bcrypt')

const saltCount = 10
const salt = bcrypt.genSaltSync(saltCount)

const generatePassword = (password) => {
  return bcrypt.hashSync(password, salt)
}

const comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash)
}

module.exports = { generatePassword, comparePassword }