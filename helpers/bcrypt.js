const bcrypt = require ('bcrypt')

function hashPassword (password) {
  const salt = bcrypt.genSaltSync(5);
  const hash = bcrypt.hashSync(password, salt);

  return hash
}

function decodePassword (password,hashPassword) {
  return bcrypt.compareSync(password, hashPassword); // true
}


module.exports = {
  hashPassword,
  decodePassword
}
