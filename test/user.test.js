const app = require('../app');
const request = require('supertest');
const { sequelize } = require('../models/index');
const { queryInterface } = sequelize;
const { generatePassword } = require('../helpers/bcryptjs');
const jwt = require('jsonwebtoken');
const sinon = require('sinon');

////// delete all data in db test
afterAll((done) => {            //// similar like seeding delete data
    queryInterface.bulkDelete('Users')
        .then(() => {
            console.log(`DB clean up table Users`)
            done()
        })
        .catch(err => {
            done(err)
        })
})

/////// create dummy user (in my case, initial admin account already exist)
const adminUser = {
    email: `admin@gmail.com`,
    password: `admin`
}
beforeAll((done) => {               //// similar like seeding data
    const hashPassword = generatePassword(adminUser.password)
    queryInterface.bulkInsert(`Users`, [{
        email: adminUser.email,
        password: hashPassword,
        createdAt: new Date(),
        updatedAt: new Date()
    }])
        .then(() => {
            console.log(`User created: ${adminUser.email}`)
            done()
        })
        .catch(err => (
            done(err)
        ))
})

describe(`User feature`, () => {
    ///// Register
    describe(`POST /users/register`, () => {
        describe(`Success register`, () => {
            test(`Should return object with id and email and status 201`, (done) => {
                const userInput = {
                    email: 'test@gmail.com',
                    password: 'test'
                }
                request(app)
                    .post('/users/register')
                    .send(userInput)
                    .end((err, res) => {
                        if(err) {
                            return done(err) //// err for code supertest
                        }
                        else {
                            expect(res.status).toBe(201);
                            expect(res.body).toHaveProperty('id', expect.any(Number));
                            expect(res.body).toHaveProperty('email', userInput.email);
                            expect(res.body).not.toHaveProperty('password')
                            return done()
                        }
                    })

            })
        })
        describe(`Error register`, () => {
            test(`Should return error with status 400 because missing email and password`, (done) => {
                const errors = [
                    {
                        message: 'E-mail must be filled'
                    },
                    {
                        message: 'E-mail must be in format <youremail@mail.com>'
                    },
                    {
                        message: 'Password must be filled'
                    }
                ]
                const userInput = {
                    email: '',
                    password: ''
                }
                request(app)
                    .post('/users/register')
                    .send(userInput)
                    .end((err, res) => {
                        if(err) {
                            return done(err) //// err for code supertest
                        }
                        else {
                            expect(res.status).toBe(400);
                            expect(res.body).toHaveProperty('errors', errors);
                            return done()
                        }
                    })
            })
            test(`Should return error with status 400 because missing email`, (done) => {
                const errors = [
                    {
                        message: 'E-mail must be filled'
                    },
                    {
                        message: 'E-mail must be in format <youremail@mail.com>'
                    }
                ]
                const userInput = {
                    email: '',
                    password: 'test'
                }
                request(app)
                    .post('/users/register')
                    .send(userInput)
                    .end((err, res) => {
                        if(err) {
                            return done(err) 
                        }
                        else {
                            expect(res.status).toBe(400);
                            expect(res.body).toHaveProperty('errors', errors);
                            return done()
                        }
                    })
            })
            test(`Should return error with status 400 because missing password`, (done) => {
                const errors = [
                    {
                        message: 'Password must be filled'
                    }
                ]
                const userInput = {
                    email: 'test@gmail.com',
                    password: ''
                }
                request(app)
                    .post('/users/register')
                    .send(userInput)
                    .end((err, res) => {
                        if(err) {
                            return done(err) 
                        }
                        else {
                            expect(res.status).toBe(400);
                            expect(res.body).toHaveProperty('errors', errors);
                            return done()
                        }
                    })
            })
            test(`Should return error with status 400 because email not in email format`, (done) => {
                const errors = [
                    {
                        message: 'E-mail must be in format <youremail@mail.com>'
                    }
                ]
                const userInput = {
                    email: 'test',
                    password: 'test'
                }
                request(app)
                    .post('/users/register')
                    .send(userInput)
                    .end((err, res) => {
                        if(err) {
                            return done(err) 
                        }
                        else {
                            expect(res.status).toBe(400);
                            expect(res.body).toHaveProperty('errors', errors);
                            return done()
                        }
                    })
            })
            test(`Should return error with status 400 because email unique`, (done) => {
                const errors = [
                    {
                        message: 'E-mail already registered'
                    }
                ]
                request(app)
                    .post('/users/register')
                    .send(adminUser)
                    .end((err, res) => {
                        if(err) {
                            return done(err) 
                        }
                        else {
                            expect(res.status).toBe(400);
                            expect(res.body).toHaveProperty('errors', errors);
                            return done()
                        }
                    })
            })
            test(`Should return error with status 400 because email and password null`, (done) => {
                const errors = [
                    {
                        message: 'User.email cannot be null'
                    },
                    {
                        message: 'User.password cannot be null'
                    }
                ]
                request(app)
                    .post('/users/register')
                    .send()
                    .end((err, res) => {
                        if(err) {
                            return done(err) 
                        }
                        else {
                            expect(res.status).toBe(400);
                            expect(res.body).toHaveProperty('errors', errors);
                            return done()
                        }
                    })
            })
        })
    })
    
    /// Login
    //// ///// ///check token with sinon
    describe(`POST /users/login`, () => {
        describe(`Success login`, () => {
            ////proses stub
            sinon.stub(jwt, 'sign').returns('Hash_JWT')
            sinon.stub(jwt, 'verify').returns({email: adminUser.email})
            test(`Should return success with token and status 201`, (done) => {
                request(app)
                    .post('/users/login')
                    .send(adminUser)
                    .end((err, res) => {
                        if(err) {
                            return done(err)
                        }
                        else {
                            expect(res.status).toBe(201);
                            expect(res.body).toHaveProperty('token', 'Hash_JWT');
                            return done()
                        }
                    })

            })
        })
        describe(`Error login`, () => {
            test(`Should return error with status 400 because missing email and password`, (done) => {
                const errors = [
                    {
                        message: 'Invalid E-mail/Password'
                    }
                ]
                const userInput = {
                    email: '',
                    password: ''
                }
                request(app)
                    .post('/users/login')
                    .send(userInput)
                    .end((err, res) => {
                        if(err) {
                            return done(err) //// err for code supertest
                        }
                        else {
                            expect(res.status).toBe(400);
                            expect(res.body).toHaveProperty('errors', errors);
                            return done()
                        }
                    })
            })
            test(`Should return error with status 400 because missing email`, (done) => {
                const errors = [
                    {
                        message: 'Invalid E-mail/Password'
                    }
                ]
                const userInput = {
                    email: '',
                    password: 'test'
                }
                request(app)
                    .post('/users/login')
                    .send(userInput)
                    .end((err, res) => {
                        if(err) {
                            return done(err) //// err for code supertest
                        }
                        else {
                            expect(res.status).toBe(400);
                            expect(res.body).toHaveProperty('errors', errors);
                            return done()
                        }
                    })
            })
            test(`Should return error with status 400 because missing password`, (done) => {
                const errors = [
                    {
                        message: 'Invalid E-mail/Password'
                    }
                ]
                const userInput = {
                    email: 'test@gmail.com',
                    password: ''
                }
                request(app)
                    .post('/users/login')
                    .send(userInput)
                    .end((err, res) => {
                        if(err) {
                            return done(err) //// err for code supertest
                        }
                        else {
                            expect(res.status).toBe(400);
                            expect(res.body).toHaveProperty('errors', errors);
                            return done()
                        }
                    })
            })
            test(`Should return error with status 400 because wrong password`, (done) => {
                const errors = [
                    {
                        message: 'Invalid E-mail/Password'
                    }
                ]
                const userInput = {
                    email: adminUser.email,
                    password: 'test'
                }
                request(app)
                    .post('/users/login')
                    .send(userInput)
                    .end((err, res) => {
                        if(err) {
                            return done(err) //// err for code supertest
                        }
                        else {
                            expect(res.status).toBe(400);
                            expect(res.body).toHaveProperty('errors', errors);
                            return done()
                        }
                    })
            })
            test(`Should return error with status 400 because email and password not registered`, (done) => {
                const errors = [
                    {
                        message: 'Invalid E-mail/Password'
                    }
                ]
                const userInput = {
                    email: 'unknown@gmail.com',
                    password: 'unknown'
                }
                request(app)
                    .post('/users/login')
                    .send(userInput)
                    .end((err, res) => {
                        if(err) {
                            return done(err) //// err for code supertest
                        }
                        else {
                            expect(res.status).toBe(400);
                            expect(res.body).toHaveProperty('errors', errors);
                            return done()
                        }
                    })
            })
        })
    })
})







/// NOTE /// /// check token with type string


    // describe(`POST /users/login`, () => {
    //     describe(`Success login`, () => {
    //         test(`Should return success with token and status 201`, (done) => {
    //             request(app)
    //                 .post('/users/login')
    //                 .send(adminUser)
    //                 .end((err, res) => {
    //                     if(err) {
    //                         return done(err)
    //                     }
    //                     else {
    //                         console.log(res.body)
    //                         expect(res.status).toBe(201);
    //                         expect(res.body).toHaveProperty('token', expect.any(String));
    //                         return done()
    //                     }
    //                 })

    //         })
    //     })
    // })
