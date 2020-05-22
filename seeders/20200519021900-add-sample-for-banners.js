'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const data = [
      {
        name : 'sayur',
        image_url : 'https://i0.wp.com/www.vetbossel.in/wp-content/uploads/2018/10/admob-banner-interstitial-rewarded-video-ads-android-example.png?w=1024',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name : 'kasur',
        image_url : 'https://docs.bmc.com/docs/digitalworkplaceadvanced/1908/files/871981152/871981153/1/1559852715697/1.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name : 'spatula',
        image_url : 'https://www.seekpng.com/png/detail/286-2863137_other-creative-uses-for-banners-example-of-vinyl.png',
        createdAt: new Date(),
        updatedAt: new Date()
      }
  ]

  return queryInterface.bulkInsert('Banners', data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Banners', null, {});
  }
};
