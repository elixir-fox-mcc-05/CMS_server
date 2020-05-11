const app = require('../app.js');
const request = require('supertest');
const {sequelize} = require('../models');
const sinon = require('sinon');
const {queryInterface} = sequelize;
const jwt = require('jsonwebtoken');

describe('User Router', function() {
    beforeAll(function() {
        queryInterface.bulkDelete('Users');
    });

    describe('Register user', function() {
        describe('Success:', function() {
            test('Should return status code 201 with result of JSON with id and email', function(done) {
                const userData = {
                    email: 'kyra@mail.com',
                    password: 'abc123'
                }
                request(app)
                    .post('/user/register')
                    .send(userData)
                    .expect(201)
                    .expect('Content-Type', /json/)
                    .expect(function (result) {
                        let data = result.body;
                        expect(data).toHaveProperty('id', expect.any(Number));
                        expect(data).toHaveProperty('email', userData.email);
                        expect(data).not.toHaveProperty('password');
                    })
                    .end(function(err) {
                        if (err) {
                            return done(err)
                        }
                        else {
                            done()
                        }
                    })
            });
        });

        describe('Failed:', function() {
            test('Should return status code 400 with result of JSON because of Email already exists', function(done) {
                const userData = {
                    email: 'kyra@mail.com',
                    password: 'abc123',
                }
                request(app)
                    .post('/user/register')
                    .send(userData)
                    .set('Accept', 'application/json')
                    .expect(400)
                    .expect('Content-Type', /json/)
                    .expect(function (result) {
                        let data = result.body;
                        expect(data.message).toContain('Email already exists');
                    })
                    .end(function(err) {
                        if (err) {
                            return done(err)
                        } 
                        else {
                            done()
                        }
                    })
                });
            });
        });

        describe('Failed:', function() {
            test('Should return status code 400 with result of JSON because of Email and/or Password is empty', function(done) {
                const userData = {
                    email: '',
                    password: '',
                }
                request(app)
                    .post('/user/register')
                    .send(userData)
                    .set('Accept', 'application/json')
                    .expect(400)
                    .expect('Content-Type', /json/)
                    .expect(function (result) {
                        let data = result.body;
                        expect(data.message).toContain('Email and/or Password cannot be empty');
                    })
                    .end(function(err) {
                        if (err) {
                            return done(err)
                        } 
                        else {
                            done()
                        }
                    })
            });
        });

    afterAll(function() {
        queryInterface.bulkDelete('Users')
    })
})
