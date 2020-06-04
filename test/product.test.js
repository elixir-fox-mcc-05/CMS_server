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
    let token2 = '';
    let ProductId = '';
    beforeAll(function(done) {
        queryInterface.bulkInsert('Users', fakePeople, {
            returning: true
        })
            .then(newUsers => {
                people = newUsers;
                token = generateToken({
                    id: people[0].id,
                    email: people[0].email
                });
                token2 = generateToken({
                    id: people[1].id,
                    email: people[1].email
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
                    category: 'Rumah tangga'
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
                    category: 'Rumah Tangga'
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
                    category: 'Rumah Tangga'
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
            test('Should return 400 status code with json data', function(done) {
                request(app)
                .post('/products')
                .set('token', token)
                .send({
                    name: 'Sabun',
                    price: '3000',
                    stock: '200',
                    image_url: 'http://google.co.id',
                    category: ''
                })
                .expect(400)
                .expect('Content-Type', /json/)
                .expect(function(result) {
                    let data = result.body;
                    expect(data.message).toEqual([{ message: `Category can't be empty`}]);
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
                    stock: '0',
                    image_url: 'http://google.co.id',
                    category: 'Rumah Tangga'
                })
                .expect(400)
                .expect('Content-Type', /json/)
                .expect(function(result) {
                    let data = result.body;
                    expect(data.message).toEqual([{ message: `Minimum stock is 1`}]);
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
                    price: '0',
                    stock: '111',
                    image_url: 'http://google.co.id',
                    category: 'Rumah Tangga'
                })
                .expect(400)
                .expect('Content-Type', /json/)
                .expect(function(result) {
                    let data = result.body;
                    expect(data.message).toEqual([{ message: `Minimum price is 1`}]);
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
                    category: 'Rumah Tangga'
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

    describe('Read Product', function() {
        describe('Succsess', function() {
            test('It will return 200 status code with JSON data', function(done) {
                request(app)
                .get('/products')
                .set('token', token)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(function(result) {
                    let data = result.body.Products;
                    ProductId = data[0].id;
                    expect(data[0]).toHaveProperty('name');
                    expect(data[0]).toHaveProperty('price');
                    expect(data[0]).toHaveProperty('stock');
                })
                .end(function(err) {
                    if (err) {
                        done(err);
                    } else {
                        done();
                    }
                })
            });
        });

        describe('Failed', function() {
            test('It will return 401 status code', function(done) {
                request(app)
                .get('/products')
                .expect(401)
                .expect('Content-Type', /json/)
                .expect(function(result) {
                    let data = result.body;
                    expect(data.message).toContain(`Please login first`);
                })
                .end(function(err) {
                    if (err) {
                        done(err);
                    } else {
                        done();
                    }
                })
            });
        });
    });


    describe('Update Product', function() {        
        describe('Success', function() {
            test('It will show status code 200 with json data', function(done) {
                request(app)
                .patch(`/products/${ProductId}`)
                .set('token', token)
                .send({
                    name: 'Minyak',
                    price: '5000',
                    stock: '123',
                    category: 'Rumah Tangga',
                    image_url: 'http://google.com'

                })
                .end(function(err, response) {
                    if(err) {
                        console.log(`Error: ${err}`);
                        return done(err);
                    } else {
                        expect(response.status).toBe(200);
                        expect(response.body.Product).toHaveProperty('name');
                        expect(response.body.Product).toHaveProperty('price');
                        return done();
                    }
                })
            });
        });

        describe('Failed', function() {
            test(`It will show status code 401 with message "User don't have access"`, function(done) {
                request(app)
                .patch(`/products/${ProductId}`)
                .set('token', token2)
                .send({
                    name: 'Minyak',
                    price: '5000',
                    stock: '123',
                   category: 'Rumah Tangga',
                    image_url: 'http://google.com'

                })
                .end(function (err, response) {
                    if(err) {
                        console.log(`Error: ${err}`);
                        return done(err);
                    } else {
                        expect(response.status).toBe(401);
                        expect(response.body.message.message).toContain(`User don't have access`);
                        return done();
                    }
                })
            });
        });
    });

    describe('Delete', function() {
        describe('Success', function() {
            test('It will show status code 200 with message "Successfully delete"', function(done) {
                request(app)
                .delete(`/products/${ProductId}`)
                .set('token', token)
                .end(function (err, response) {
                    if(err) {
                        console.log(`Error: ${err}`);
                        return done(err);
                    } else {
                        expect(response.status).toBe(200);
                        expect(response.body.Message).toContain('Successfully delete');
                        return done();
                    }
                })
            });
        });
    });

    afterAll(function(done) {
        queryInterface.bulkDelete('Users')
            .then(_ => {
                done();
            })
            .catch(err => {
                done(err);
            })
    });
});
