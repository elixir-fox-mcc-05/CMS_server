const app = require('../app')
const request = require('supertest')
const {sequelize} = require('../models')
const {queryInterface} = sequelize

describe('User', () => {
    describe('success login', () => {
        describe('POST /login', () => {
            test('should return access_token with status 200', (done) => {
                const userInput = {
                    email: 'admin@mail.com',
                    password: 'adminadmin'
                }
                request(app)
                    .post('/login')
                    .send(userInput)
                    .end((err, response) => {
                        if(err){
                            return done(err)
                        } else {
                            expect(response.status).toBe(200)
                            expect(response.body).toHaveProperty('access_token', expect.anything())
                            return done()
                        }
                    })
            })
        })
    })

    describe('login fail', () => {
        describe('POST /login', () => {
            test(`should return message with status 400 because password not match`, done => {
                const userInput = {
                    email: 'admin@mail.com',
                    password: 'admin'
                }
                request(app)
                    .post('/login')
                    .send(userInput)
                    .end((err, response) => {
                        if(err){
                            return done(err)
                        } else {
                            expect(response.status).toBe(400)
                            expect(response.body.error).toContain('password not match')
                            return done()
                        }
                    })
            })

            test('should return message with status 400 because data not found', done => {
                const userInput = {
                    email: `pastisalah@mail.com`,
                    password: `pastisalah`
                }
                request(app)
                    .post('/login')
                    .send(userInput)
                    .end((err, response) => {
                        if(err){
                            return done(err)
                        } else {
                            expect(response.status).toBe(400)
                            expect(response.body.error).toContain('data not found')
                            return done()
                        }
                    })
            })

            test('should return msg with status 500 because email and password is null', done => {
                request(app)
                    .post('/login')
                    .end((err, response) => {
                        if(err){
                            return done(err)
                        } else {
                            expect(response.status).toBe(500)
                            expect(response.body.error).toContain('WHERE parameter "email" has invalid "undefined" value')
                            return done()
                        }
                    })
            })
        })
    })

    describe('success register', () => {
        describe('POST /register', () => {
            test('should return id and email with status 201', (done) => {
                const userInput = {
                    email: 'customer1@mail.com',
                    password: 'customer1' 
                }
                request(app)
                    .post('/register')
                    .send(userInput)
                    .end((err, response) => {
                        if(err){
                            return done(err)
                        } else {
                            expect(response.status).toBe(201)
                            expect(response.body).toHaveProperty('id', expect.any(Number))
                            expect(response.body).toHaveProperty('email', userInput.email)
                            expect(response.body).not.toHaveProperty('password')
                            return done()
                        }
                    })
            })
        })
    })

    describe('fail register', () => {
        describe('POST /register', () => {
            test('should return msg with status 400 because not an email type', done => {
                const userInput = {
                    email: 'aiueo',
                    password: 'asdasdsd'
                }
                request(app)
                    .post('/register')
                    .send(userInput)
                    .end((err, response) => {
                        if(err){
                            return done(err)
                        } else {
                            expect(response.status).toBe(400)
                            expect(response.body.error).toContain('not an email type')
                            return done()
                        }
                    })
            })
            test('should return msg with status 500 because email and password is empty', done => {
                const userInput = {
                    email: '',
                    password: ''
                }
                request(app)
                    .post('/register')
                    .send(userInput)
                    .end((err, response) => {
                        if(err){
                            return done(err)
                        } else {
                            expect(response.status).toBe(400)
                            expect(response.error.text).toContain('email is required')
                            expect(response.error.text).toContain('password is required')
                            return done()
                        }
                    })
            })
            test('should return msg with status 500 because password length less than 6 or more than 25', done => {
                const userInput = {
                    email: '',
                    password: ''
                }
                request(app)
                    .post('/register')
                    .send(userInput)
                    .end((err, response) => {
                        if(err){
                            return done(err)
                        } else {
                            expect(response.status).toBe(400)
                            expect(response.error.text).toContain('password length must between 6 and 25')
                            return done()
                        }
                    })
            })
        })
    })
})