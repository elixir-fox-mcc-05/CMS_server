const app = require('../app')
const request = require('supertest')
const {sequelize} = require('../models')
const {queryInterface} = sequelize
const {generatePassword} = require('../helpers/bcrypt.js')

const user = require('../admin.json').map(e => {
    e.updatedAt = new Date ()
    e.createdAt = new Date ()
    e.password = generatePassword(e.password)
    return e
})
describe('User Router', () => {
    beforeAll(function() {
        jest.setTimeout(10000);
        queryInterface.bulkInsert('Users', user)
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
            test('Password must be have 5 between 16 character with code 400', done => {
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
                            expect(response.status).toBe(400)
                            // console.log(response.body)
                            expect(response.body.error).toContain('Password must be have 5 between 16 character')
                            return done()
                        }
                })
            })

            test('should return JSON with id and email with status 400', done => {
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
                            expect(response.status).toBe(400)
                            // console.log(response.body)
                            expect(response.body.error).toContain('Invalid Email Format')
                            return done()
                        }
                })
            })

            test('should return JSON with id and email with status 400', done => {
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
                            expect(response.status).toBe(400)
                            // console.log(response.body)
                            expect(response.body.error).toContain('Invalid Email Format')
                            return done()
                        }
                })
            })
        })
    })

    describe('login', () => {
        describe('Success : ', () => {
            test('should return JSON with id and email with status 200 Member test', done => {
                const userTest = {
                    email : 'test@mail.com',
                    password : 'testinTEST'
                }
                request(app)
                    .post('/users/')
                    .send(userTest)
                    .end((err, response) => {
                        if(err) {
                            return done(err)
                        }else{
                            expect(response.status).toBe(200)
                            expect(response.body).toHaveProperty('id', expect.any(Number))
                            expect(response.body).toHaveProperty('email', userTest.email)
                            expect(response.body).toHaveProperty('token', expect.anything())
                            expect(response.body).not.toHaveProperty('password')
                            return done()
                        }
                })
            })

            test('should return JSON with id and email with status 200 Admin test', done => {
                const userTest = {
                    email : 'kalys@gmail.com',
                    password : '123123'
                }
                request(app)
                    .post('/users/')
                    .send(userTest)
                    .end((err, response) => {
                        if(err) {
                            return done(err)
                        }else{
                            expect(response.status).toBe(200)
                            expect(response.body).toHaveProperty('id', expect.any(Number))
                            expect(response.body).toHaveProperty('email', userTest.email)
                            expect(response.body).toHaveProperty('token', expect.anything())
                            return done()
                        }
                })
            })
        })
        describe('Fail : ', () => {
            test('should return JSON with id and email with status 401', done => {
                const userTest = {
                    email : 'test@mail.com',
                    password : 'tes'
                }
                request(app)
                    .post('/users/')
                    .send(userTest)
                    .end((err, response) => {
                        if(err) {
                            return done(err)
                        }else{
                            expect(response.status).toBe(401)
                            // console.log(response.body)
                            expect(response.body.error).toContain('email or password wrong')
                            return done()
                        }
                })
            })

            test('should return JSON with id and email with status 404', done => {
                const userTest = {
                    email : 'test1@mail.com',
                    password : 'testingTEST'
                }
                request(app)
                    .post('/users/')
                    .send(userTest)
                    .end((err, response) => {
                        if(err) {
                            return done(err)
                        }else{
                            expect(response.status).toBe(404)
                            // console.log(response.body)
                            expect(response.body.error).toContain('Email and Password not found')
                            return done()
                        }
                })
            })

            test('should return JSON with id and email with status 500', done => {
                request(app)
                    .post('/users/')
                    .end((err, response) => {
                        if(err) {
                            return done(err)
                        }else{
                            expect(response.status).toBe(500)
                            // console.log(response.body)
                            expect(response.body.error).toContain('WHERE parameter "email" has invalid "undefined" value')
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

