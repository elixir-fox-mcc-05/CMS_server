let bcrypt = require('bcryptjs');

const generateHash = (password) => {
	let salt = bcrypt.genSaltSync(10);
	let hash = bcrypt.hashSync(password, salt);
	return hash;
};

const checkPassword = (password, hash) => {
	let compare = bcrypt.compareSync(password, hash);
	return compare;
};

module.exports = {
	generateHash,
	checkPassword
};
