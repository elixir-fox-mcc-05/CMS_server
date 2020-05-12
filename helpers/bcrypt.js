const bcrypt = require('bcryptjs')

function passwordGenerate(password) {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);
  return hash
}

function comparePassword(password, hash){
  return bcrypt.compareSync(password, hash);
}

module.exports = {passwordGenerate, comparePassword}  