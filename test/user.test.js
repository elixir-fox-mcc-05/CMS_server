const app = require('../app.js');
const request = require('supertest');
const {sequelize} = require('../models');
const {queryInterface} = sequelize;

describe('User Router', function() {
    beforeAll(function() {
        jest.setTimeout(10000);
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
                    .set('Accept', 'application/json')
                    .expect(201)
                    .expect('Content-Type', /json/)
                    .expect(function (result) {
                        let data = result.body;
                        // console.log(result.body) 
                        expect(data).toHaveProperty('id', expect.any(Number));
                        expect(data).toHaveProperty('email', userData.email);
                        expect(data).not.toHaveProperty('password');
                    })
                    .end(function(err) {
                        if (err) {
                            return done(err)
                        }
                        else {
                            return done()
                        }
                    })
            });
        });

        describe('Failed:', function() {
            test('Should return status code 400 with result of JSON because of Email and/or Password is wrong/empty/invalid/already exists', function(done) {
                const userData = {
                    email: 'kyra@mail.com',
                    password: '1234567',
                }
                request(app)
                    .post('/user/register')
                    .send(userData)
                    .expect(400)
                    .expect('Content-Type', /json/)
                    .expect(function (result) {
                        // console.log(result.body)
                        expect(result.body.error).toContain('Email is already exists');
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
            test('Should return status code 400 with result of JSON because of Email and/or Password is wrong/empty/invalid/already exists', function(done) {
                const userData = {
                    email: 'bukan email',
                    password: '13214',
                }
                request(app)
                    .post('/user/register')
                    .send(userData)
                    .expect(400)
                    .expect('Content-Type', /json/)
                    .expect(function (result) {
                        let data = result.body;
                        expect(data.error).toContain('Invalid Email format');
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
            test('Should return status code 400 with result of JSON because of Email and/or Password is wrong/empty/invalid/already exists', function(done) {
                const userData = {
                    email: 'mail@mail.com',
                    password: 'abc',
                }
                request(app)
                    .post('/user/register')
                    .send(userData)
                    .expect(400)
                    .expect('Content-Type', /json/)
                    .expect(function (result) {
                        let data = result.body;
                        expect(data.error).toContain('Validation error: Password must be between 6 till 25');
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
            test('Should return status code 400 with result of JSON because of Email and/or Password is wrong/empty/invalid/already exists', function(done) {
                const userData = {
                    email: '',
                    password: '',
                }
                request(app)
                    .post('/user/register')
                    .send(userData)
                    .expect(400)
                    .expect('Content-Type', /json/)
                    .expect(function (result) {
                        let data = result.body;
                        expect(data.error).toContain('Email is required');
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

    })

    describe('Login user', function() {

        describe('Success:', function() {
            test('Should return status code 200 with result of JSON with a acces token', function(done) {
                const userData = {
                    email: 'kyra@mail.com',
                    password: 'abc123'
                }
                request(app)
                    .post('/user/login')
                    .send(userData)
                    .set('Accept', 'application/json')
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .expect(function (result) {
                        let data = result.body;
                        // console.log(result.body) 
                        expect(data).toHaveProperty('token', expect.anything());
                        expect(data).not.toHaveProperty('password');
                    })
                    .end(function(err) {
                        if (err) {
                            return done(err)
                        }
                        else {
                            return done()
                        }
                    })
            });
        })

        describe('Failed:', function() {
            test('Should return status code 400 with result of JSON with a error result', function(done) {
                const userData = {
                    email: 'kyra@mail.com',
                    password: 'abc'
                }
                request(app)
                    .post('/user/login')
                    .send(userData)
                    .set('Accept', 'application/json')
                    .expect(401)
                    .expect('Content-Type', /json/)
                    .expect(function (result) {
                        let data = result.body;
                        // console.log(result.body) 
                        expect(data.error).toContain('Email or Password is wrong')
                    })
                    .end(function(err) {
                        if (err) {
                            return done(err)
                        }
                        else {
                            return done()
                        }
                    })
            });

            test('Should return status code 400 with result of JSON with a error result', function(done) {
                const userData = {
                    email: 'mail@mail.com',
                    password: 'cendoldawet'
                }
                request(app)
                    .post('/user/login')
                    .send(userData)
                    .set('Accept', 'application/json')
                    .expect(400)
                    .expect('Content-Type', /json/)
                    .expect(function (result) {
                        let data = result.body;
                        // console.log(result.body) 
                        expect(data.error).toContain('Register first')
                    })
                    .end(function(err) {
                        if (err) {
                            return done(err)
                        }
                        else {
                            return done()
                        }
                    })
            });

            test('Should return status code 400 with result of JSON with a error result', function(done) {
                const userData = {
                    email: '',
                    password: ''
                }
                request(app)
                    .post('/user/login')
                    .send()
                    .set('Accept', 'application/json')
                    .expect(500)
                    .expect('Content-Type', /json/)
                    .expect(function (result) {
                        let data = result.body;
                        // console.log(result.body) 
                        expect(data.error).toContain('WHERE parameter "email" has invalid "undefined" value')
                    })
                    .end(function(err) {
                        if (err) {
                            return done(err)
                        }
                        else {
                            return done()
                        }
                    })
            });
        })

        
    })

    afterAll(function() {
        queryInterface.bulkDelete('Users')
    })
})
