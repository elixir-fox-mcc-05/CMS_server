let jwt = require('jsonwebtoken');

const generateToken = (payload) => {
	let token = jwt.sign(payload, process.env.SECRET);
	return token;
};

const verifyToken = (token) => {
	let decoded = jwt.verify(token, process.env.SECRET);
	return decoded;
};

module.exports = {
	generateToken,
	verifyToken
};
