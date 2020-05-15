const request = require('supertest');
const app = require('../app')
const sinon = require('sinon')
const jwt = require('jsonwebtoken')
const { queryInterface } = require('../models/index.js').sequelize

describe('Product routes', () => {
    beforeAll(() => { queryInterface.bulkDelete('Products'); })

    describe('POST /products', () => {
        describe('Create Product', () => {
            describe(`error coz headers doesn't exist`, () => {
                test('error coz headers not send yet', (done) => {
                    request(app)
                        .post('/products') // route: method and name
                        .send({
                            name: 'NIKE Jordan',
                            image_url: 'https://cdn-images.farfetch-contents.com/14/64/73/36/14647336_22738126_1000.jpg',
                            price: '75.00',
                            stock: '20',
                            category: 'shoe'
                        })
                        .expect(400)
                        .expect('Content-Type', /json/)
                        .expect((rec) => {
                            let data = rec.body
                            expect(data).toHaveProperty('data', `you're not logged in yet`)
                            expect(data).toHaveProperty('name')
                        })
                        .end((err) => { err ? done(err) : done() })
                })
            })
            describe(`error coz invalid input`, () => {
                test('error coz price is minus 0', (done) => {
                    request(app)
                        .post('/products') // route: method and name
                        .send({
                            name: 'YEZZY',
                            image_url: 'https://cdn-images.farfetch-contents.com/14/64/73/36/14647336_22738126_1000.jpg',
                            price: -5.00,
                            stock: 20,
                            category: 'shoe'
                        })
                        .expect(400)
                        .expect('Content-Type', /json/)
                        .expect((rec) => {
                            let err = rec.body
                            // expect(err).toHaveProperty('name', 'Sequelize validation error :')
                        })
                        .end((err) => { err ? done(err) : done() })
                })
            })
            describe(`error coz invalid input`, () => {
                test('error coz category is number', (done) => {
                    request(app)
                        .post('/products') // route: method and name
                        .send({
                            name: 'YEZZY',
                            image_url: 'https://cdn-images.farfetch-contents.com/14/64/73/36/14647336_22738126_1000.jpg',
                            price: -5.00,
                            stock: 20,
                            category: 2134
                        })
                        .expect(400)
                        .expect('Content-Type', /json/)
                        .expect((rec) => {
                            let err = rec.body
                            // console.log(err) // category shouldn't number
                        })
                        .end((err) => { err ? done(err) : done() })
                })
            })
            describe(`error coz invalid input`, () => {
                test('error coz price is undefined', (done) => {
                    request(app)
                        .post('/products') // route: method and name
                        .send({
                            name: 'YEZZY',
                            image_url: 'https://cdn-images.farfetch-contents.com/14/64/73/36/14647336_22738126_1000.jpg',
                            price: undefined,
                            stock: 20,
                            category: 'shoe'
                        })
                        .expect(400)
                        .expect('Content-Type', /json/)
                        .expect((rec) => {
                            let err = rec.body
                            // console.log(err) // price shouldn't undefined
                        })
                        .end((err) => { err ? done(err) : done() })
                })
            })
            describe(`error coz invalid input`, () => {
                test('error coz image_url is undefined', (done) => {
                    request(app)
                        .post('/products') // route: method and name
                        .send({
                            name: 'YEZZY',
                            image_url: undefined,
                            price: '75.00',
                            stock: '20',
                            category: 'shoe'
                        })
                        .expect(400)
                        .expect('Content-Type', /json/)
                        .expect((rec) => {
                            let err = rec.body
                            // console.log(err) // image_url shouldn't undefined
                        })
                        .end((err) => { err ? done(err) : done() })
                })
            })
            describe(`error coz invalid input`, () => {
                test('error coz name is undefined', (done) => {
                    request(app)
                        .post('/products') // route: method and name
                        .send({
                            name: undefined,
                            image_url: 'https://cdn-images.farfetch-contents.com/14/64/73/36/14647336_22738126_1000.jpg',
                            price: '75.00',
                            stock: '20',
                            category: 'shoe'
                        })
                        .expect(400)
                        .expect('Content-Type', /json/)
                        .expect((rec) => {
                            let err = rec.body
                            // console.log(err) // name shouldn't undefined
                        })
                        .end((err) => { err ? done(err) : done() })
                })
            })
            describe(`error send headers`, () => {
                test('error coz headers not send yet', (done) => {
                    request(app)
                        .post('/products') // route: method and name
                        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJpcndhbkBnbWFpbC5jb20iLCJpYXQiOjE1ODk0MTkzMjd9.xt-JHUNKIC9oVEP7vBNWfbv8gZ0bB-zvC-ntPDSLwEI')
                        .expect(400)
                        .expect('Content-Type', /json/)
                        .expect((rec) => {
                            let data = rec.body
                            expect(data).toHaveProperty('name','Indentify your status error')
                        })
                        .end((err) => { err ? done(err) : done() })
                })
            })
        })
    })
    describe('PUT /products', () => {
        describe('PUT by Id', () => {
            describe(`error put products`, () => {
                test('error coz header not send yet', (done) => {
                    request(app)
                        .put('/products') // route: method and name
                        .send({
                            stock: 4
                        })
                        .expect(400)
                        .expect('Content-Type', /json/)
                        .expect((rec) => {
                            let err = rec.body
                            expect(err).toHaveProperty('name', 'Indentify your status error')
                            expect(err).toHaveProperty('data', `you're not logged in yet`)
                        })
                        .end((err) => { err ? done(err) : done() })
                })
            })
            describe(`error put products`, () => {
                test('error coz params is not found', (done) => {
                    request(app)
                        .put('/products/99292') // route: method and name
                        .send({
                            stock: 4
                        })
                        .expect(400)
                        .expect('Content-Type', /json/)
                        .expect((rec) => {
                            let err = rec.body
                            // console.log(err) // params not found
                        })
                        .end((err) => { err ? done(err) : done() })
                })
            })
            describe(`error put products`, () => {
                test('error coz stock is null', (done) => {
                    request(app)
                        .put('/products') // route: method and name
                        .send({
                            stock: null
                        })
                        .expect(400)
                        .expect('Content-Type', /json/)
                        .expect((rec) => {
                            let err = rec.body
                            // console.log(err) // stock can't null
                        })
                        .end((err) => { err ? done(err) : done() })
                })
            })
        })
    })
    describe('GET /products', () => {
        describe('GET by Id', () => {
            describe(`success get all products`, () => {
                test('success', (done) => {
                    request(app)
                        .get('/products') // route: method and name
                        .expect(200)
                        .expect('Content-Type', /json/)
                        .expect((rec) => {
                            let data = rec.body
                            expect(data).toHaveProperty('products')
                        })
                        .end((err) => { err ? done(err) : done() })
                })
            })
        })
    })
    describe('GET /productId', () => {
        describe('GET by Id', () => {
            describe(`error coz headers not send yet`, () => {

                test('Headers not found', (done) => {
                    request(app)
                        .get('/products/32') // route: method and name
                        .expect(400)
                        .expect('Content-Type', /json/)
                        .expect((rec) => {
                            let data = rec.body
                            expect(data).toHaveProperty('data', `you're not logged in yet`)
                            expect(data).toHaveProperty('name')
                        })
                        .end((err) => { err ? done(err) : done() })
                })
            })
        })
    })
    describe('DELETE /productId', () => {
        describe('DELETE by Id', () => {
            describe(`error coz headers not send yet`, () => {
                test('Headers not found', (done) => {
                    request(app)
                        .delete('/products/32') // route: method and name
                        .expect(400)
                        .expect('Content-Type', /json/)
                        .expect((rec) => {
                            let data = rec.body
                            expect(data).toHaveProperty('data', `you're not logged in yet`)
                            expect(data).toHaveProperty('name')
                        })
                        .end((err) => { err ? done(err) : done() })
                })
            })
        })
    })

    afterAll(() => { queryInterface.bulkDelete('Products'); })
})