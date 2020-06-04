'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const data = [
      {
        name : 'sayur',
        image_url : 'https://media-cdn.tripadvisor.com/media/photo-s/05/dc/bc/d9/old-man-restaurant.jpg',
        price : 120000,
        stock : 9,
        CategoryId : 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name : 'kasur',
        image_url : 'https://m2fabelio.imgix.net/catalog/product/cache/image/e9c3970ab036de70892d86c6d221abfe/n/e/neru_single_bed_xl_1.jpg',
        price : 1200000,
        stock : 3,
        CategoryId : 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name : 'spatula',
        image_url : 'https://cf.shopee.co.id/file/c5132696d07bd49a5690857a0e346c5d',
        price : 36000,
        stock : 23,
        CategoryId : 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
  ]

  return queryInterface.bulkInsert('Products', data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
