'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', 
    [ 
      {
        name: 'Balsem',
        price: 7500,
        stock: 30,
        image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2017/2/11/1065206/1065206_f4844aad-8a58-43c1-abfe-9c9c0752a082.jpg',
        tags: 'Obat',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Salep',
        price: 12500,
        stock: 60,
        image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2018/8/24/3324676/3324676_8fabe73a-4e1d-4941-8b6d-b91f453825cf_1512_1512.jpg',
        tags: 'Obat',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Beef',
        price: 117500,
        stock: 20,
        image_url: 'https://cdn.britannica.com/68/143268-050-917048EA/Beef-loin.jpg',
        tags: 'Food',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Chinken',
        price: 37500,
        stock: 15,
        image_url: 'https://sc02.alicdn.com/kf/UTB8cOJPvwQydeJk43PUxh7yQpXa3/Hala-frozen-whole-chicken-chiken.jpeg_640x640.jpeg',
        tags: 'Food',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
  , {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
