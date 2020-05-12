const app = require('../app.js')
const request = require('supertest')
const { queryInterface } = require('../models/index.js').sequelize
// const { generatePassword } = require('../helpers/bcrypt.js')
const { verifyToken } = require('../helpers/jwt.js')

var users = [
    {
        name: "John Doe",
        email: "johndoe@mail.ru",
        password: "johnIsCut3doe",
        role: "customer",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name: "Alice",
        email: "alice@mail.eth",
        password: "inWonderland",
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date()
    }
] 


describe('Register', () => {
    beforeAll((done) => {
        queryInterface.bulkDelete('Users')
            .then(_=> { done() })
            .catch(err => { done(err) })
    })

    describe('Successful Registration', () => {
        describe('Register Customer', () => {
            test('Response code 201 with object customer data and string message', (done) => {
                let customer = users[0]
                request(app)
                    .post('/register')
                    .send(customer)
                    .end((err, response) => {
                        if (err) return done(err)
                        else {                            
                            expect(response.status).toBe(201)
                            expect(response.body).toHaveProperty('id', expect.any(Number))
                            expect(response.body).toHaveProperty('name', customer.name)
                            expect(response.body).toHaveProperty('email', customer.email)
                            expect(response.body).toHaveProperty('role', "customer")
                            expect(response.body).toHaveProperty('msg', 'You have been successfully registered!')
                            return done()
                        }
                    })
            })
        })

        describe('Register Admin', () => {
            test('Response code 201 with object admin data and string message', (done) => {
                let admin = users[1]
                request(app)
                    .post('/register')
                    .send(admin)
                    .end((err, response) => {
                        if (err) return done(err)
                        else {                           
                            expect(response.status).toBe(201)
                            expect(response.body).toHaveProperty('id', expect.any(Number))
                            expect(response.body).toHaveProperty('name', admin.name)
                            expect(response.body).toHaveProperty('email', admin.email)
                            expect(response.body).toHaveProperty('role', "admin")
                            expect(response.body).toHaveProperty('msg', 'Your admin account is ready!')
                            return done()
                        }
                    })
            })
        })
        
    })

    describe('Failed Registration', () => {
        describe('Email has been registered', () => {
            test('Response code 400 bad request', (done) => {
                let sameCustomer = users[0]
                request(app)
                    .post('/register')
                    .send(sameCustomer)
                    .end((err, response) => {
                        if (err) return done(err)
                        else {                            
                            expect(response.status).toBe(400)
                            expect(response.body).toHaveProperty('msg', "Email has been registered")
                            expect(response.body).toHaveProperty('loc', "@sequelize")
                            return done()
                        }
                    })
            })
        })

        describe('Invalid email address', () => {
            test('Response code 400 bad request', (done) => {
                let invalidEmailCustomer = {
                    name: "Budi",
                    email: "budimail.ru",
                    password: "budibisa",
                    role: "customer"
                }
                request(app)
                    .post('/register')
                    .send(invalidEmailCustomer)
                    .end((err, response) => {
                        if (err) return done(err)
                        else {                            
                            expect(response.status).toBe(400)
                            expect(response.body).toHaveProperty('type', "Bad Request")
                            expect(response.body).toHaveProperty('msg', "Valid email address is required")
                            expect(response.body).toHaveProperty('loc', "@sequelize")
                            return done()
                        }
                    })
            })
        })

        describe("Password must be 8 characters or longer", () => {
            test('Response code 400 bad request', (done) => {
                let invalidPasswordCustomer = {
                    name: "Budi",
                    email: "budilagi@mail.ru",
                    password: "123456a",
                    role: "customer"
                }
                request(app)
                    .post('/register')
                    .send(invalidPasswordCustomer)
                    .end((err, response) => {
                        if (err) return done(err)
                        else {                            
                            expect(response.status).toBe(400)
                            expect(response.body).toHaveProperty('type', "Bad Request")
                            expect(response.body).toHaveProperty('msg', "Password must be 8 characters or longer")
                            expect(response.body).toHaveProperty('loc', "@sequelize")
                            return done()
                        }
                    })
            })
        })

        describe("No or invalid role is assigned", () => {
            test('Response code 400 bad request', (done) => {
                let invalidRoleCustomer = {
                    name: "Bisa",
                    email: "kapanla@mail.ru",
                    password: "123456asa",
                    role: "user"
                }
                request(app)
                    .post('/register')
                    .send(invalidRoleCustomer)
                    .end((err, response) => {
                        if (err) return done(err)
                        else {                            
                            expect(response.status).toBe(400)
                            expect(response.body).toHaveProperty('type', "Bad Request")
                            expect(response.body).toHaveProperty('msg', "Please select the appropriate role")
                            expect(response.body).toHaveProperty('loc', "@sequelize")
                            return done()
                        }
                    })
            })
        })
    })
})

describe('Login', () => {
    afterAll((done) => {
        queryInterface.bulkDelete('Users')
            .then( _=> { done() })
            .catch(err => { done(err) })
    })

    describe('Successful Login', () => {
        describe('Customer Login', () => {
            test('Response code 201 returning access_token', (done) => {
                let { email, password } = users[0]
                request(app)
                    .post('/login')
                    .send({
                        email, password
                    })
                    .end((err, response) => {
                        if (err) return done(err)
                        else {                            
                            expect(response.status).toBe(200)
                            expect(response.body).toHaveProperty('access_token', expect.any(String))
                            let decoded = verifyToken(response.body.access_token)
                            let { id, name, email, role } = decoded
                            expect(typeof id).toBe('number')
                            expect(name).toBe(users[0].name)
                            expect(email).toBe(users[0].email)
                            expect(role).toBe(users[0].role)
                            expect(response.body).toHaveProperty('msg', 'Successful login. Welcome back!')
                            return done()
                        }
                    })
            })
        })

        describe('Admin Login', () => {
            test('Response code 201 returning access_token', (done) => {
                let { email, password } = users[1]
                request(app)
                    .post('/login')
                    .send({
                        email, password
                    })
                    .end((err, response) => {
                        if (err) return done(err)
                        else {                            
                            expect(response.status).toBe(200)
                            expect(response.body).toHaveProperty('access_token', expect.any(String))
                            let decoded = verifyToken(response.body.access_token)
                            let { id, name, email, role } = decoded
                            expect(typeof id).toBe('number')
                            expect(name).toBe(users[1].name)
                            expect(email).toBe(users[1].email)
                            expect(role).toBe(users[1].role)
                            expect(response.body).toHaveProperty('msg', 'Successful login. Welcome back!')
                            return done()
                        }
                    })
            })
        })
    })

    describe('Failed Login', () => {
        describe('Wrong Password', () => {
            test('Response code 401 returning error message', (done) => {
                let { email, password } = users[0]
                let wrongPassword = password + 'abc'
                request(app)
                    .post('/login')
                    .send({
                        email, password: wrongPassword
                    })
                    .end((err, response) => {
                        if (err) return done(err)
                        else {                         
                            expect(response.status).toBe(400)
                            expect(response.body.error).toHaveProperty('msg', "Wrong email/password")
                            return done()
                        }
                    })
            })
        })

        describe('Unregistered Email', () => {
            test('Response code 401 returning error message', (done) => {
                let unregisteredEmail = "alicia@mail.eth"
                let { password } = users[1]
                request(app)
                    .post('/login')
                    .send({
                        email: unregisteredEmail, password
                    })
                    .end((err, response) => {
                        if (err) return done(err)
                        else {                            
                            expect(response.status).toBe(400)                            
                            expect(response.body.error).toHaveProperty('msg', "Looks like you have not registered")
                            return done()
                        }
                    })
            })
        })
    })

    
})
