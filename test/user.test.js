const app = require('../app')
const request = require('supertest')
const {sequelize} = require('../models')
const {queryInterface} = sequelize


describe('User Router', () => {
    beforeAll(function() {
        jest.setTimeout(10000);
        queryInterface.bulkDelete('Users')
    });
    describe('register', () => {
        describe('Success : ', () => {
            test('should return JSON with id and email with status 201', done => {
                const userTest = {
                    email : 'test@mail.com',
                    password : 'testinTEST'
                }
                request(app)
                    .post('/users/register')
                    .send(userTest)
                    .end((err, response) => {
                        if(err) {
                            return done(err)
                        }else{
                            expect(response.status).toBe(201)
                            expect(response.body).toHaveProperty('id', expect.any(Number))
                            expect(response.body).toHaveProperty('email', userTest.email)
                            expect(response.body).not.toHaveProperty('password')
                            return done()
                        }
                })
            })
        })

        describe('Fail : ', () => {
            test('should return JSON with id and email with status 500', done => {
                const userTest = {
                    email : 'test@mail.com',
                    password : 'test'
                }
                request(app)
                    .post('/users/register')
                    .send(userTest)
                    .end((err, response) => {
                        if(err) {
                            return done(err)
                        }else{
                            expect(response.status).toBe(500)
                            expect((result) => {
                                let data = result.body
                                expect(data.message).toContain('Password must be 5 between 16')
                            })
                            return done()
                        }
                })
            })
        })

        describe('Fail : ', () => {
            test('should return JSON with id and email with status 500', done => {
                const userTest = {
                    email : 'testmailcom',
                    password : 'testTING'
                }
                request(app)
                    .post('/users/register')
                    .send(userTest)
                    .end((err, response) => {
                        if(err) {
                            return done(err)
                        }else{
                            expect(response.status).toBe(500)
                            expect((result) => {
                                let data = result.body
                                expect(data.message).toContain('Invalid Email Format')
                            })
                            return done()
                        }
                })
            })
        })

        describe('Fail : ', () => {
            test('should return JSON with id and email with status 500', done => {
                const userTest = {
                    email : '',
                    password : ''
                }
                request(app)
                    .post('/users/register')
                    .send(userTest)
                    .end((err, response) => {
                        if(err) {
                            return done(err)
                        }else{
                            expect(response.status).toBe(500)
                            expect((result) => {
                                let data = result.body
                                expect(data.message).toContain('Email is required')
                            })
                            return done()
                        }
                })
            })
        })
    })
    afterAll(function() {
        queryInterface.bulkDelete('Users')
    })
})

