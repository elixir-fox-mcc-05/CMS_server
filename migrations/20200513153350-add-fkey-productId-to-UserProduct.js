'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addConstraint('UserProducts', ['productId'], {
            type: 'foreign key',
            name: 'custom_fkey_productId',
            references: { //Required field
                table: 'Products',
                field: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeConstraint('UserProducts', 'custom_fkey_productId')
    }
};