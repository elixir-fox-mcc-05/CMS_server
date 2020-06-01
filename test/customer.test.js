const app = require('../app.js');
const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const request = require('supertest');
const { hashPassword } = require('../helpers/bcrypt.js');
const customerData = require('../rawData/rawCustomer.json');
const { queryInterface } = require('../models').sequelize;

describe('Customer Router', () => {

    beforeAll(() => {
        queryInterface.bulkDelete('Customers');

        customerData.map(customer => {
            customer.password = hashPassword(customer.password);
            customer.createdAt = new Date();
            customer.updatedAt = new Date();
    
            return customer;
        })

        queryInterface.bulkInsert('Customers', customerData, {});
    })

    describe('Customer Register', () => {
        describe('Success', () => {
            test('should return status code 201 CREATED along with json with key (id, name, email)', done => {
                request(app)
                    .post('/customers/register')
                    .send({
                        name: 'Huey McMeow',
                        email: 'hueyguey@mail.com',
                        password: 'hueyguey'
                    })
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(201)
                    .expect(res => {
                        const customer = res.body;
                        expect(customer).toHaveProperty('email', 'hueyguey@mail.com');
                        expect(customer).not.toHaveProperty('password');
                    })
                    .end(err => {
                        if(err) {
                            done(err);
                        } else {
                            done();
                        }
                    })
            })
        })

        describe('Fail', () => {
            test('should return status code 400 Bad Request because name is empty', done => {
                request(app)
                    .post('/customers/register')
                    .send({
                        name: '',
                        email: 'hueyguey@mail.com',
                        password: 'hueyguey'
                    })
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        const customer = res.body;
                        expect(customer.error).toContain('your name can\'t be empty')
                    })
                    .end(err => {
                        if(err) {
                            done(err);
                        } else {
                            done();
                        }
                    })
            })

            test('should return status code 400 Bad Request because email already registered', done => {
                request(app)
                    .post('/customers/register')
                    .send({
                        name: 'Huey McMeow',
                        email: 'pataboy@mail.com',
                        password: 'hueyguey'
                    })
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        const customer = res.body;
                        expect(customer.error).toContain('email already exist')
                    })
                    .end(err => {
                        if(err) {
                            done(err);
                        } else {
                            done();
                        }
                    })
            })

            test('should return status code 400 Bad Request because email is empty', done => {
                request(app)
                    .post('/customers/register')
                    .send({
                        name: 'Huey McMeow',
                        email: '',
                        password: 'hueyguey'
                    })
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        const customer = res.body;
                        expect(customer.error).toContain('your email can\'t be empty')
                    })
                    .end(err => {
                        if(err) {
                            done(err);
                        } else {
                            done();
                        }
                    })
            })

            test('should return status code 400 Bad Request because email format is invalid', done => {
                request(app)
                    .post('/customers/register')
                    .send({
                        name: 'Huey McMeow',
                        email: 'hueymail.com',
                        password: 'hueyguey'
                    })
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        const customer = res.body;
                        expect(customer.error).toContain('invalid email format')
                    })
                    .end(err => {
                        if(err) {
                            done(err);
                        } else {
                            done();
                        }
                    })
            })

            test('should return status code 400 Bad Request because password is empty', done => {
                request(app)
                    .post('/customers/register')
                    .send({
                        name: 'Huey McMeow',
                        email: 'huey@mail.com',
                        password: ''
                    })
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        const customer = res.body;
                        expect(customer.error).toContain('your password can\'t be empty')
                    })
                    .end(err => {
                        if(err) {
                            done(err);
                        } else {
                            done();
                        }
                    })
            })

            test('should return status code 400 Bad Request because password length is less than 8 characters', done => {
                request(app)
                    .post('/customers/register')
                    .send({
                        name: 'Huey McMeow',
                        email: 'huey@mail.com',
                        password: 'huey'
                    })
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        const customer = res.body;
                        expect(customer.error).toContain('password must be at least 8 character long')
                    })
                    .end(err => {
                        if(err) {
                            done(err);
                        } else {
                            done();
                        }
                    })
            })

            test('should return status code 400 Bad Request because password contain whitespace character', done => {
                request(app)
                    .post('/customers/register')
                    .send({
                        name: 'Huey McMeow',
                        email: 'huey@mail.com',
                        password: 'huey guey'
                    })
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        const customer = res.body;
                        expect(customer.error).toContain('password can\'t contain any whitespace character')
                    })
                    .end(err => {
                        if(err) {
                            done(err);
                        } else {
                            done();
                        }
                    })
            })
        })
    })

    describe('Customer Login', () => {
        describe('success', () => {
            sinon.stub(jwt, 'sign').returns('Hash_JWT');
            sinon.stub(jwt, 'verify').returns({
                id: 3,
                name: 'Huey McMeow',
                email: 'hueyguey@mail.com'
            })
            test('should return status code 200 Success along with json contain key of (access_token)', done => {
                request(app)
                    .post('/customers/login')
                    .send({
                        email: 'hueyguey@mail.com',
                        password: 'hueyguey'
                    })
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .expect(res => {
                        const customer = res.body;
                        expect(customer).toHaveProperty('access_token', 'Hash_JWT')
                    })
                    .end(err => {
                        if(err) {
                            done(err);
                        } else {
                            done();
                        }
                    })
            })
        })

        describe('Fail', () => {
            test('should return status code 400 Bad Request because customer input a wrong email', done => {
                request(app)
                    .post('/customers/login')
                    .send({
                        email: 'hueyuey@mail.com',
                        password: 'hueyguey'
                    })
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        const customer = res.body;
                        expect(customer.error).toContain('invalid email/password')
                    })
                    .end(err => {
                        if(err) {
                            done(err);
                        } else {
                            done();
                        }
                    })
            })

            test('should return status code 400 Bad Request because customer input a wrong password', done => {
                request(app)
                    .post('/customers/login')
                    .send({
                        email: 'hueyguey@mail.com',
                        password: 'hueyuey'
                    })
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        const customer = res.body;
                        expect(customer.error).toContain('invalid email/password')
                    })
                    .end(err => {
                        if(err) {
                            done(err);
                        } else {
                            done();
                        }
                    })
            })
        })
    })

    afterAll(() => {
        queryInterface.bulkDelete('Customers');
    })

    
})