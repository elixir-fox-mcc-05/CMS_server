const app = require('../app.js');
const request = require('supertest');

const { queryInterface } = require('../models/index.js').sequelize;


describe('Product Router', () => {
    beforeAll((done) => {
        queryInterface.bulkDelete('Users')
            .then(_ => {
                done();
            })
            .catch(err => {
                done(err);
            });
    });
    describe('Show all user product', () => {
        describe('Success:', () => {
            test('Should return status code 200 with result of JSON with array of all object product data', (done) => {
                request(app)
                .get('/products/')
                .set({
                    Accept: 'application/json',
                    token
                })
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err) => {
                    if (err) {
                    return done(err);
                    } else {
                    done();
                    };
                });
            });
        })
        describe('Failed:', () => {

        })
    })
    afterAll((done) => {
        queryInterface.bulkDelete('Users')
        .then(_ => {
            done();
        })
        .catch(err => {
            done(err);
        });
    });
});