const request = require('supertest');
const app = require('../app')
const sinon = require('sinon')
const bcrypt = require('bcryptjs')
const { queryInterface } = require('../models/index.js').sequelize

describe('user routes', () => {
    beforeAll(() => { queryInterface.bulkDelete('Users'); })
    
    describe('POST /register', () => {
        describe('successfully registered', () => {

            sinon.stub(bcrypt, 'genSaltSync').returns('HASH')
            sinon.stub(bcrypt, 'hashSync').returns('HASH')
            
            test('created new user', (done) => {
                request(app)
                    .post('/register') // route: method and name
                    .send({
                        first_name: 'irwan',
                        last_name: 'syafani',
                        email: 'irwan@gmail.com',
                        password: '1234'
                    })
                    .expect(201)
                    .expect('Content-Type', /json/)
                    .expect((req) => {
                        let data = req.body
                        expect(data).toHaveProperty('email', 'irwan@gmail.com')
                        expect(data).not.toHaveProperty('password')
                    })
                    .end((err) => { err ? done(err) : done() })
            })
        })
        describe('error registered', () => {
            
            test('error created new user', (done) => {
                request(app)
                    .post('/register') // route: method and name
                    .send({
                        first_name: 'irwan',
                        last_name: 'syafani',
                        email: 'irwangmail.com',
                        password: '1234'
                    })
                    .expect(400)
                    .expect('Content-Type', /json/)
                    .expect((req) => {
                        let err = req.body
                        expect(err).toHaveProperty('name', 'Sequelize validation error :')
                        expect(err).toHaveProperty('data')
                    })
                    .end((err) => { err ? done(err) : done() })
            })
        })
        describe('error registered', () => {
            
            test('new user using invalid email', (done) => {
                request(app)
                    .post('/register') // route: method and name
                    .send({
                        first_name: 'irwan',
                        last_name: 'syafani',
                        email: 'irwangmail.com',
                        password: '1234'
                    })
                    .expect(400)
                    .expect('Content-Type', /json/)
                    .expect((req) => {
                        let err = req.body
                        expect(err).toHaveProperty('name', 'Sequelize validation error :')
                    })
                    .end((err) => { err ? done(err) : done() })
            })
        })
        describe('error registered', () => {
            
            test('new user using empty password', (done) => {
                request(app)
                    .post('/register') // route: method and name
                    .send({
                        first_name: 'irwan',
                        last_name: 'syafani',
                        email: 'irwan@gmail.com',
                        password: ''
                    })
                    .expect(400)
                    .expect('Content-Type', /json/)
                    .expect((req) => {
                        let err = req.body
                        expect(err).toHaveProperty('name', 'Sequelize validation error :')
                        expect(err).toHaveProperty('data')
                    })
                    .end((err) => { err ? done(err) : done() })
            })
        })
        describe('error registered', () => {
            
            test('new user using exist email', (done) => {
                request(app)
                    .post('/register') // route: method and name
                    .send({
                        first_name: 'irwan',
                        last_name: 'syafani',
                        email: 'irwan@gmail.com',
                        password: '1234'
                    })
                    .expect(400)
                    .expect('Content-Type', /json/)
                    .expect((req) => {
                        let err = req.body
                        expect(err).toHaveProperty('name', 'email must unique')
                        expect(err).toHaveProperty('data', 'your mail already exist')
                    })
                    .end((err) => { err ? done(err) : done() })
            })
        })
    })
    describe('POST /login', ()=> {
        describe('success lgging in', () => {

            sinon.stub(bcrypt, 'compareSync').returns(true)

            test('user logged in', (done) => {
                request(app)
                    .post('/login') // route: method and name
                    .send({
                        email: 'irwan@gmail.com',
                        password: '1234'
                    })
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .expect((req) => {
                        let data = req.body
                        expect(data).toHaveProperty('access_token')
                    })
                    .end((err) => { err ? done(err) : done() })
            })
        })
        describe('error logging in', () => {

            test('email is not valid', (done) => {
                request(app)
                    .post('/login') // route: method and name
                    .send({
                        email: 'ahmad@gmailcom',
                        password: '1234'
                    })
                    .expect(404)
                    .expect('Content-Type', /json/)
                    .expect((req) => {
                        let err = req.body
                        expect(err).toHaveProperty('err', 'NOT FOUND')
                    })
                    .end((err) => { err ? done(err) : done() })
            })
        })
        describe('error logging in', () => {

            test('password is not valid', (done) => {
                request(app)
                    .post('/login') // route: method and name
                    .send({
                        email: 'ahmad@gmail.com',
                        password: '12345'
                    })
                    .expect(404)
                    .expect('Content-Type', /json/)
                    .expect((req) => {
                        let err = req.body
                        expect(err).toHaveProperty('err', 'NOT FOUND')
                    })
                    .end((err) => { err ? done(err) : done() })
            })
        })
        describe('error logging in', () => {

            test('user with empty email', (done) => {
                request(app)
                    .post('/login') // route: method and name
                    .send({
                        email: 'humed@gmail.com',
                        password: '12345'
                    })
                    .expect(404)
                    .expect('Content-Type', /json/)
                    .expect((req) => {
                        let err = req.body
                        expect(err).toHaveProperty('err', 'NOT FOUND')
                    })
                    .end((err) => { err ? done(err) : done() })
            })
        })
        describe('error logging in', () => {

            test('user is not found', (done) => {
                request(app)
                    .post('/login') // route: method and name
                    .send({
                        email: 'humed@gmail.com',
                        password: '12345'
                    })
                    .expect(404)
                    .expect('Content-Type', /json/)
                    .expect((req) => {
                        let err = req.body
                        expect(err).toHaveProperty('err', 'NOT FOUND')
                    })
                    .end((err) => { err ? done(err) : done() })
            })
        })
    })
    
    afterAll(() => { queryInterface.bulkDelete('Users'); })
})
