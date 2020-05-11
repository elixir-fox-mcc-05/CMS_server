const app = require('../app.js');
const request = require('supertest');
const sinon = require('sinon');
const jwt = require('jsonwebtoken');

const { queryInterface } = require('../models').sequelize;

describe('User Router', () => {
    beforeAll(() => {
        queryInterface.bulkDelete('Users');
    });

    describe('User Register', () => {
        describe('success', () => { 
            test('should return status code 201 along with result of JSON with key (id, email)', done => {
                request(app)
                    .post('/users/register')
                    .send({
                        name: 'Ulul Azmi',
                        email: 'ulaz1411@mail.com',
                        password: 'gothenburg'
                    })
                    .set('accept', 'application/json')
                    .expect(201)
                    .expect('Content-Type', '/json/')
                    .expect(res => {
                        let user = res.body;
                        expect(user).toHaveProperty('email', 'ulaz1411@mail.com');
                        expect(user).not.toHaveProperty('password');
                    })
                    .end(err => {
                        if (err) {
                            done(err);
                        } else {
                            done();
                        }
                    })
            })
        })
    })

    afterAll(() => {
        queryInterface.bulkDelete('Users');
    })
})