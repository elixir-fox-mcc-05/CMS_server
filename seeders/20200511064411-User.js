'use strict';
const { encryptPassword } = require('../helpers/bcrypt')

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Users', [{
			email: "admin1@mail.com",
			password: encryptPassword('admin1'),
			role: 'admin',
			createdAt: new Date(),
			updatedAt: new Date()
		},{
			email: "admin2@mail.com",
			password: encryptPassword('admin2'),
			role: 'admin',
			createdAt: new Date(),
			updatedAt: new Date()
		},{
			email: "admin3@mail.com",
			password: encryptPassword('admin3'),
			role: 'admin',
			createdAt: new Date(),
			updatedAt: new Date()
		}], {});

	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Users', null, {});
	}
};
