const bcrypt = require('bcryptjs')
function Encrypt(pass){
return bcrypt.hashSync(pass,bcrypt.genSaltSync(10))
}
function Decrypt(pass,hash){
return bcrypt.compareSync(pass,hash)
}
module.exports={Encrypt,Decrypt}