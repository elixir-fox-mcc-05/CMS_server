'use strict';

let { encryptPassword } = require('../helpers/bcrypt')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Customers', [
      {
        name: 'Narji Tarihoran',
        address: 'Jln. Zamrud No. 547, Cilegon 91197, Banten',
        phone: '087960216678',
        email: 'narjitarihoran@contoh.com',
        password: encryptPassword('123456'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jamalia Melani',
        address: 'Gg. Supomo No. 240, Makassar 92673, SulSel',
        phone: '082602081279',
        email: 'jamaliamelani@contoh.com',
        password: encryptPassword('123456'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Zulaikha Wastuti',
        address: 'Jln. Imam Bonjol No. 95, Bontang 45482, KalTIm',
        phone: '088796377193',
        email: 'zulaikawastuti@contoh.com',
        password: encryptPassword('123456'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Raina Aurora Haryanti',
        address: 'Dk. Bara Tambar No. 50, Palangka Raya 20745, Kalteng',
        phone: '088213296944',
        email: 'rainaharyanti@contoh.com',
        password: encryptPassword('123456'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ibun Bagiya Kusumo',
        address: 'Ds. Abdul Muis No. 471, Administrasi Jakarta Timur 20751, DKI Jakarta',
        phone: '097091135883',
        email: 'ibunkusumo@contoh.com',
        password: encryptPassword('123456'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Customers', null, {});
  }
};
