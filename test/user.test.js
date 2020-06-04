const app = require('../app')
const request = require('supertest')

const { queryInterface } = require('../models/index.js').sequelize;
const { encryptPassword } = require('../helpers/bcrypt')

let dummyuser = {
    name: 'Dummy User',
    email: 'dummyuser@contoh.com',
    password: '123456',
    role: 'Administrator'
}

describe('User Router', () => {
    beforeAll((done) => {
        queryInterface.bulkDelete('Users')
            .then(() => {
                return queryInterface.bulkInsert('Users', [
                    {
                        name: dummyuser.name,
                        role: dummyuser.role,
                        email: dummyuser.email,
                        password: encryptPassword(dummyuser.password),
                        createdAt: new Date(),
                        updatedAt: new Date()
                    }
                ])
            })
            .then(() => {
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    afterAll((done) => {
        queryInterface.bulkDelete('Users')
            .then(() => {
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    describe('Register a user', () => {
        describe('Success register', () => {
            test('Return status code 201 with keys data and notif', (done) => {
                let newUser = {
                    name: 'Bambang',
                    role: 'Administrator',
                    email: 'bambang@contoh.com',
                    password: '123456'
                }
                request(app)
                    .post('/user/register')
                    .send(newUser)
                    .end((err, response) => {
                        if(err) {
                            return done(err)
                        } else {
                            expect(response.status).toBe(201)
                            expect(response.body.data).toHaveProperty('id', expect.any(Number))
                            expect(response.body.data).toHaveProperty('name', newUser.name)
                            expect(response.body.data).toHaveProperty('role', newUser.role)
                            expect(response.body.data).toHaveProperty('email', newUser.email)
                            expect(response.body).toHaveProperty('notif', `Register successful!`)
                            return done()
                        }
                    })
            })
        })

        describe('Fail register', () => {
            describe('Attributes empty', () => {
                test('Return status code 400 with keys err', (done) => {
                    let customErr = [
                        { "message": "Name is required"},
                        { "message": "Role is required"},
                        { "message": "Email is required"},
                        { "message": "Password is required"}
                    ]
                    
                    request(app)
                        .post('/user/register')
                        .end((err, response) => {
                            if(err) {
                                return done(err)
                            } else {
                                expect(response.status).toBe(400)
                                expect(response.body).toHaveProperty('err', customErr)
                                return done()
                            }
                        })
                })
            })
            describe('Attribute name has length less than 3', () => {
                test('Return status code 400 with keys err', (done) => {
                    let customErr = [
                        { "message": "Name must include minimum 3 characters"}
                    ]
                    let newUser = {
                        name: 'Ti',
                        role: 'Administrator',
                        email: 'tina@contoh.com',
                        password: '123456'
                    }
                    
                    request(app)
                        .post('/user/register')
                        .send(newUser)
                        .end((err, response) => {
                            if(err) {
                                return done(err)
                            } else {
                                expect(response.status).toBe(400)
                                expect(response.body).toHaveProperty('err', customErr)
                                return done()
                            }
                        })
                })
            })
            describe('Attribute email has been registered before (not unique)', () => {
                test('Return status code 400 with keys err', (done) => {
                    let customErr = [
                        { "message": "email must be unique"}
                    ]
                    let newUser = {
                        name: 'Tina',
                        role: 'Administrator',
                        email: 'dummyuser@contoh.com',
                        password: '123456'
                    }
                    
                    request(app)
                        .post('/user/register')
                        .send(newUser)
                        .end((err, response) => {
                            if(err) {
                                return done(err)
                            } else {
                                expect(response.status).toBe(400)
                                expect(response.body).toHaveProperty('err', customErr)
                                return done()
                            }
                        })
                })
            })
            describe('Attribute email has wrong format', () => {
                test('Return status code 400 with keys err', (done) => {
                    let customErr = [
                        { "message": "Please input email with correct format"}
                    ]
                    let newUser = {
                        name: 'Tina',
                        role: 'Administrator',
                        email: 'tinaemail',
                        password: '123456'
                    }
                    
                    request(app)
                        .post('/user/register')
                        .send(newUser)
                        .end((err, response) => {
                            if(err) {
                                return done(err)
                            } else {
                                expect(response.status).toBe(400)
                                expect(response.body).toHaveProperty('err', customErr)
                                return done()
                            }
                        })
                })
            })
            describe('Attribute password has length less than 6', () => {
                test('Return status code 400 with keys err', (done) => {
                    let customErr = [
                        { "message": "Password must include minimum 6 characters"}
                    ]
                    let newUser = {
                        name: 'Tina',
                        role: 'Administrator',
                        email: 'tina@contoh.com',
                        password: 'qw'
                    }
                    
                    request(app)
                        .post('/user/register')
                        .send(newUser)
                        .end((err, response) => {
                            if(err) {
                                return done(err)
                            } else {
                                expect(response.status).toBe(400)
                                expect(response.body).toHaveProperty('err', customErr)
                                return done()
                            }
                        })
                })
            })
        })
    })

    describe('Login a user', () => {
        describe('Success login', () => {
            test('Return status code 200 with keys token, data and notif', (done) => {
                let loginUser = {
                    email: dummyuser.email,
                    password: dummyuser.password
                }
                request(app)
                    .post('/user/login')
                    .send(loginUser)
                    .end((err, response) => {
                        if(err) {
                            return done(err)
                        } else {
                            console.log(response.body)
                            expect(response.status).toBe(200)
                            expect(response.body).toHaveProperty('token', expect.any(String) )
                            expect(response.body.data).toHaveProperty('id', expect.any(Number))
                            expect(response.body.data).toHaveProperty('name', dummyuser.name)
                            expect(response.body.data).toHaveProperty('email', dummyuser.email)
                            expect(response.body).toHaveProperty('notif', `Welcome Back ${dummyuser.name}!`)
                            return done()
                        }
                    })
            })
        })

        describe('Fail login', () => {
            describe('Attribute email is never registered or wrong email', () => {
                test('Return status code 401 with keys err', (done) => {
                    let customErr = "Please input registered email"
                    let loginUser = {
                        email: 'tina@contoh.com',
                        password: '123456'
                    }
                    request(app)
                        .post('/user/login')
                        .send(loginUser)
                        .end((err, response) => {
                            if(err) {
                                return done(err)
                            } else {
                                console.log(response.body)
                                expect(response.status).toBe(401)
                                expect(response.body).toHaveProperty('err', customErr )
                                return done()
                            }
                        })
                })
            })
            describe('Attribute password is never registered or wrong password', () => {
                test('Return status code 401 with keys err', (done) => {
                    let customErr = "Please input correct password"
                    let loginUser = {
                        email: dummyuser.email,
                        password: 'qweqwe'
                    }
                    request(app)
                        .post('/user/login')
                        .send(loginUser)
                        .end((err, response) => {
                            if(err) {
                                return done(err)
                            } else {
                                console.log(response.body)
                                expect(response.status).toBe(401)
                                expect(response.body).toHaveProperty('err', customErr )
                                return done()
                            }
                        })
                })
            })

        })
    })


    
})