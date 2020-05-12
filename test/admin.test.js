const request = require('supertest');
const app = require('../app')
const sinon = require('sinon')
const bcrypt = require('bcryptjs')
const { queryInterface } = require('../models/index.js').sequelize

describe('admin routes', () => {
    beforeAll(() => { queryInterface.bulkDelete('Administrators'); })
    
    describe.only('POST /register', () => {
        describe('successfully registered', () => {

            sinon.stub(bcrypt, 'genSaltSync').returns('HASH')
            sinon.stub(bcrypt, 'hashSync').returns('HASH')
            
            test('created new admin', (done) => {
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
        describe('error register', () => {
            
            test('error creating new admin', (done) => {
                request(app)
                    .post('/register') // route: method and name
                    .send({
                        first_name: 'irwan',
                        last_name: 'syafani',
                        email: 'irwangmail.com',
                        password: '1234'
                    })
                    .expect(400)
                    .expect((err) => {
                        expect(err).toBe(null)
                        // expect(data).not.toHaveProperty('email', 'irwan@gmail.com')
                    })
                    .end((err) => { err ? done(err) : done() })
            })
        })
    })
    describe('POST /login', ()=> {
        describe('success', () => {

            sinon.stub(bcrypt, 'compareSync').returns(true)

            test('admin logged in', (done) => {
                request(app)
                    .post('/login') // route: method and name
                    .send({
                        first_name: 'irwan',
                        last_name: 'syafani',
                        email: 'irwan@gmail.com',
                        password: '1234'
                    })
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .expect((req) => {
                        let data = req.body
                        expect(data).toHaveProperty('admin_token')
                    })
                    .end((err) => { err ? done(err) : done() })
            })
        })
    })
    
    afterAll(() => { queryInterface.bulkDelete('Administrators'); })
})

