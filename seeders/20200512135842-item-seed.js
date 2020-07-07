'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', 
    [ 
      {
        name: 'Mushrooms',
        price: 25000,
        stock: 30,
        image_url: 'https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/278/278858/mushrooms-in-a-bowel-on-a-dark-table.jpg?w=1155&h=1734',
        tags: 'Herbs',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Onions',
        price: 12500,
        stock: 60,
        image_url: 'https://images-na.ssl-images-amazon.com/images/I/51IDxdp5o%2BL._AC_.jpg',
        tags: 'Herbs',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Beef',
        price: 117500,
        stock: 20,
        image_url: 'https://cdn.britannica.com/68/143268-050-917048EA/Beef-loin.jpg',
        tags: 'Meat',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Chinken',
        price: 37500,
        stock: 15,
        image_url: 'https://sc02.alicdn.com/kf/UTB8cOJPvwQydeJk43PUxh7yQpXa3/Hala-frozen-whole-chicken-chiken.jpeg_640x640.jpeg',
        tags: 'Meat',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Charcoal',
        price: 7500,
        stock: 10,
        image_url: 'https://5.imimg.com/data5/CG/MY/MY-13453471/earthing-charcoal-500x500.jpg',
        tags: 'Other',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Griller',
        price: 1117500,
        stock: 14,
        image_url: 'https://jualelektronik.com/wp-content/uploads/2018/09/Getra-OL-4B-Griller-4-Burner-BBQ.jpg',
        tags: 'Other',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Salmon',
        price: 94500,
        stock: 64,
        image_url: 'https://cdn.drweil.com/wp-content/uploads/2016/09/diet-nutrition_food-safety_worms-in-salmon_6922773-600x450.jpg',
        tags: 'Meat',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Watermelon',
        price: 32500,
        stock: 44,
        image_url: 'https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/266/266886/a-juicy-looking-watermelon.jpg?w=1155&h=1297',
        tags: 'Fruit',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Apple',
        price: 10000,
        stock: 64,
        image_url: 'https://images.heb.com/is/image/HEBGrocery/000325191',
        tags: 'Fruit',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mango',
        price: 9500,
        stock: 44,
        image_url: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Carabao_mangoes_%28Philippines%29.jpg',
        tags: 'Fruit',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pear',
        price: 5200,
        stock: 84,
        image_url: 'https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/285/285430/two-pears-on-a-table.jpg?w=1155&h=1734',
        tags: 'Fruit',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
  , {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
