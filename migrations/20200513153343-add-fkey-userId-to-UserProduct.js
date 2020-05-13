'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addConstraint('UserProducts', ['userId'], {
            type: 'foreign key',
            name: 'custom_fkey_userId',
            references: { //Required field
                table: 'Users',
                field: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeConstraint('UserProducts', 'custom_fkey_userId')
    }
};