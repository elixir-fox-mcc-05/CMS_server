const app = require('../app.js');
const request = require('supertest');
const sinon = require('sinon');
const jwt = require('jsonwebtoken');

const { queryInterface } = require('../models').sequelize;

describe('User Router', () => {
    beforeAll(() => {
        queryInterface.bulkDelete('Users');
    });

    describe('User Register', () => {
        describe('success', () => { 
            test('should return status code 201 along with result of JSON with key (id, email)', done => {
                request(app)
                    .post('/users/register')
                    .send({
                        name: 'Ulul Azmi',
                        email: 'ulaz1411@mail.com',
                        password: 'gothenburg'
                    })
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(201)
                    .expect(res => {
                        let user = res.body;
                        expect(user).toHaveProperty('email', 'ulaz1411@mail.com');
                        expect(user).not.toHaveProperty('password');
                    })
                    .end(err => {
                        if (err) {
                            done(err);
                        } else {
                            done();
                        }
                    })
            })
        })

        describe('failed', () => {
            test('should return status code 400 bad request because name is empty', done => {
                request(app)
                    .post('/users/register')
                    .send({
                        name: '',
                        email: 'ulaz1411@mail.com',
                        password: 'gothenburg'
                    })
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        let user = res.body;
                        expect(user.error).toContain('name can\'t be empty');
                    })
                    .end(err => {
                        if (err) {
                            done(err);
                        } else {
                            done();
                        }
                    })
            })
        })
    })

    describe('User login', () => {
        describe('success', () => {

            sinon.stub(jwt, 'sign').returns('Hash_JWT');
            sinon.stub(jwt, 'verify').returns({
                id: 1,
                email: 'ulaz1411@mail.com'
            })

            test('should return status code 200 along with json contain key of (access_token)', done => {
                request(app)
                    .post('/users/login')
                    .send({
                        email: 'ulaz1411@mail.com',
                        password: 'gothenburg' 
                    })
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .expect(res => {
                        let user = res.body;
                        expect(user).toHaveProperty('access_token', 'Hash_JWT');
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

        describe('failed', () => {
            test('should return status code 400 bad request as the result of wrong email input', done => {
                request(app)
                    .post('/users/login')
                    .send({
                        email: 'ulaz14@mail.com',
                        password: 'gothenburg'
                    })
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        let user = res.body;
                        expect(user.error).toContain('invalid email');
                    })
                    .end(err => {
                        if (err) {
                            done(err);
                        } else {
                            done();
                        }
                    })
            })

            test('should return status code 400 bad request as the result of wrong password input', done => {
                request(app)
                    .post('/users/login')
                    .send({
                        email: 'ulaz1411@mail.com',
                        password: 'gothenbug'
                    })
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        let user = res.body;
                        expect(user.error).toContain('invalid email/password');
                    })
                    .end(err => {
                        if (err) {
                            done(err);
                        } else {
                            done();
                        }
                    })
            })
        })
    })

    afterAll(() => {
        queryInterface.bulkDelete('Users');
    })
})