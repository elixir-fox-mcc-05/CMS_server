const app = require('../app')
const request = require('supertest')
// var request = require('dupertest');
const { sequelize } = require('../models')
const { queryInterface } = sequelize

beforeAll((done) => {
    
    queryInterface.bulkInsert('Products', [{
        name : 'balll',
        image_url: 'bb.jps',
        price : 8000,
        stock : 90,
        CategoryId : 1,
        createdAt: new Date(),
        updatedAt: new Date()
    }])
        // .then(() => {
        //     console.log('user created bolu!')
        //     done()
        // })
        // .catch(err => {
        //     done(err)
        // })

        queryInterface.bulkInsert('Categories', [{
            name: 'buah',
            createdAt: new Date(),
            updatedAt: new Date()
        }])
        .then(() => {
            console.log('beforeAll process complete')
            done()
        })
})

describe('TEST SUCCESS /category', () => {
    describe('POST /category', (done) => {
        TextDecoderStream('')
    })
})