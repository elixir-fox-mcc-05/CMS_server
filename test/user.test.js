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
        describe('Success', () => {
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

        // describe('Failed', () => {

        // })
    })

    describe('Login a user', () => {
        describe('Success', () => {
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

    //     describe('Failed', () => {
            
    //     })
    })


    
})