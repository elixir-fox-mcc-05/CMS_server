'use strict';
const fs = require('fs')

module.exports = {
  up: (queryInterface, Sequelize) => {
    const dataset = require('./E-commerce.json')
    const data = [
      {name : "Sports",
      createdAt : new Date(),
      updatedAt : new Date()
    },
      {name : "House Items",
      createdAt : new Date(),
      updatedAt : new Date()
    },
      {name : "Electronics",
      createdAt : new Date(),
      updatedAt : new Date()
    },
      {name : "Clothes",
      createdAt : new Date(),
      updatedAt : new Date()
    }
    ];
    let data2 = []
    for(let i = 0; i< dataset.length; i++) {
      if(data2.length < 1) {
        data2.push(dataset[i].annotation[0].label[0])
      } else {
        let count = 0
        for(let j = 0; j < data2.length; j++) {
          if(data2[j] === dataset[i].annotation[0].label[0]) {
            count++
          }
        }
        if (count < 1) {
          data2.push(dataset[i].annotation[0].label[0])
          data.push({
            name : dataset[i].annotation[0].label[0],
            createdAt: new Date(),
            updatedAt: new Date()
          })
        }
      }
    }
    return queryInterface.bulkInsert("Categories", data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Categories", null, {});
  }
};
