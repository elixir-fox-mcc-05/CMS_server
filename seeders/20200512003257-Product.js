'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Products', [{
			name: 'Red Bag',
			image_url: 'https://m.media-amazon.com/images/I/61AqF1+KZDL._SR500,500_.jpg',
			price: 400000,
			stock: 24,
			category: 'bag', 
			createdAt: new Date(),
			updatedAt: new Date()
		},{
			name: 'Jimmy Choo Crystal',
			image_url: 'https://i.pinimg.com/originals/03/39/f0/0339f0262c7422926a9c6e8c6111f470.jpg',
			price: 800000,
			stock: 15,
			category: 'shoes', 
			createdAt: new Date(),
			updatedAt: new Date()
		}, {
			name: 'Dolce Gabbana Majolica',
			image_url: 'https://i.pinimg.com/originals/e1/f6/0a/e1f60a1e3fe827074676378799272bb7.jpg',
			price: 2300000,
			stock: 4,
			category: 'dress', 
			createdAt: new Date(),
			updatedAt: new Date()
		}], {});	
		
	},

	down: (queryInterface, Sequelize) => {

		return queryInterface.bulkDelete('Products', null, {});
	
	}
};
