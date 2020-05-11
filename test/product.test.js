const app = require('../app.js');
const request = require('supertest');

const jwt = require('jsonwebtoken');
const { generateToken } = require('../helpers/jwt');

const { queryInterface } = require('../models/index.js').sequelize;

describe('Product Router', function() {
    let people = [];
    let fakePeople = require('../users.json');
    fakePeople.forEach(el => {
        el['createdAt'] = new Date();
        el['updatedAt'] = new Date();
    });

    let token = '';
    beforeAll(function(done) {
        queryInterface.bulkDelete('Products');
        queryInterface.bulkInsert('Users', fakePeople, {
            returning: true
        })
            .then(newUsers => {
                people = newUsers;
                token = generateToken({
                    id: people[0].id,
                    email: people[0].email
                });
                done();
            })
            .catch(err => {
                done(err);
            })
    });

    describe('Add new product to system', function() {
        describe('Success', function() {
            test('Should return 201 status code with json data', function(done) {
                request(app)
                .post('/products')
                .set('Accept', 'application/json')
                .set('token', token)
                .send({
                    name: 'Sabun',
                    price: '3000',
                    stock: '120',
                    image_url: 'http://google.co.id',
                    description: 'Sabun wangi dan higienis'
                })
                .expect(201)
                .expect('Content-Type', /json/)
                .expect(function(result) {
                    let data = result.body.Product;
                    expect(data).toHaveProperty('name', 'Sabun');
                    expect(data).toHaveProperty('price', 3000);
                    expect(data).toHaveProperty('stock', 120);
                })
                .end(function(err) {
                    if(err) {
                        return done(err);
                    } else {
                        return done();
                    }
                })
            });
        });

        describe('Failed', function() {
            test('Should return 400 status code with json data', function(done) {
                request(app)
                .post('/products')
                .set('token', token)
                .send({
                    name: '',
                    price: '3000',
                    stock: '120',
                    image_url: 'http://google.co.id',
                    description: 'Sabun wangi dan higienis'
                })
                .expect(400)
                .expect('Content-Type', /json/)
                .expect(function(result) {
                    let data = result.body;
                    expect(data.message).toEqual([{ message: `Name can't be empty`}]);
                })
                .end(function(err) {
                    if(err) {
                        return done(err);
                    } else {
                        return done();
                    }
                })
            });
        });

        describe('Failed', function() {
            test('Should return 400 status code with json data', function(done) {
                request(app)
                .post('/products')
                .set('token', token)
                .send({
                    name: 'Sabun',
                    price: '',
                    stock: '120',
                    image_url: 'http://google.co.id',
                    description: 'Sabun wangi dan higienis'
                })
                .expect(400)
                .expect('Content-Type', /json/)
                .expect(function(result) {
                    let data = result.body;
                    expect(data.message).toEqual([{ message: `Price can't be empty`}]);
                })
                .end(function(err) {
                    if(err) {
                        return done(err);
                    } else {
                        return done();
                    }
                })
            });
        });

        describe('Failed', function() {
            test('Should return 400 status code with json data', function(done) {
                request(app)
                .post('/products')
                .set('token', token)
                .send({
                    name: 'Sabun',
                    price: '3000',
                    stock: '',
                    image_url: 'http://google.co.id',
                    description: 'Sabun wangi dan higienis'
                })
                .expect(400)
                .expect('Content-Type', /json/)
                .expect(function(result) {
                    let data = result.body;
                    expect(data.message).toEqual([{ message: `Stock can't be empty`}]);
                })
                .end(function(err) {
                    if(err) {
                        return done(err);
                    } else {
                        return done();
                    }
                })
            });
        });

        describe('Failed', function() {
            test('Should return 401 status code with json data', function(done) {
                request(app)
                .post('/products')
                .send({
                    name: 'Sabun',
                    price: '3000',
                    stock: '120',
                    image_url: 'http://google.co.id',
                    description: 'Sabun wangi dan higienis'
                })
                .expect(401)
                .expect('Content-Type', /json/)
                .expect(function(result) {
                    let data = result.body;
                    expect(data.message).toContain(`Please login first`);
                })
                .end(function(err) {
                    if(err) {
                        return done(err);
                    } else {
                        return done();
                    }
                })
            });
        });
    });

    afterAll(function(done) {
        queryInterface.bulkDelete('Products');
        queryInterface.bulkDelete('Users')
            .then(_ => {
                done();
            })
            .catch(err => {
                done(err);
            })
    });
});