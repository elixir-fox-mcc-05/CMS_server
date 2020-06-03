const app = require('../app.js');
const request = require('supertest');
const { queryInterface } = require('../models').sequelize;
const { hashPassword } = require('../helpers/bcrypt.js');
const productData = require('../rawData/rawProduct.json');
const userData = require('../rawData/rawUser.json');
const categoryData = require('../rawData/rawCategory.json');
const { generateToken } = require('../helpers/jwt.js');

describe('Product Router', () => {
    let products = [];
    let user = [];
    let categories = [];
    productData.map(product => {
        product.createdAt = new Date();
        product.updatedAt = new Date();
        product.UserId = 1;

        return product;
    });

    userData.map(user => {
        user.password = hashPassword(user.password);
        user.createdAt = new Date();
        user.updatedAt = new Date();
        return user;
    })

    categoryData.map(category => {
        category.createdAt = new Date();
        category.updatedAt = new Date();
        return category
    })

    beforeAll(done => {
        queryInterface.bulkInsert('Users', userData, {
            returning: true
        })
            .then(res => {
                user = res;
                return queryInterface.bulkInsert('Categories', categoryData, {
                    returning: true
                })
            })
            .then(res => {
                categories = res;
                return queryInterface.bulkInsert('Products', productData, {
                    returning: true
                })
            })
            .then(res => {
                products = res;
                done();
            })
            .catch(err => {
                done(err);
            })
    })

    
    describe('Add new product', () => {
        describe('Success', () => {
            test('should return status code 201 created along with json with key(name, image_url, price, stock, CategoryId)', done => {
                let admin = user[0];
                let access_token = generateToken({
                    id: admin.id,
                    name: admin.name,
                    email: admin.email
                })
                request(app)
                    .post('/products')
                    .send({
                        name: 'Dallas Cowboys White Game Jersey',
                        image_url: 'https://fanatics.frgimages.com/FFImage/thumb.aspx?i=/productimages/_2444000/altimages/ff_2444895alt1_full.jpg&w=900',
                        price: 12000,
                        stock: 10,
                        categoryId: 3
                    })
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(201)
                    .expect(res => {
                        let { product } = res.body;
                        expect(product).toHaveProperty('name', 'Dallas Cowboys White Game Jersey')
                        expect(product).toHaveProperty('image_url', 'https://fanatics.frgimages.com/FFImage/thumb.aspx?i=/productimages/_2444000/altimages/ff_2444895alt1_full.jpg&w=900')
                        expect(product).toHaveProperty('price', '12000')
                        expect(product).toHaveProperty('stock', 10)
                        expect(product).toHaveProperty('CategoryId', 3)
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
            test('should return status 400 bad request because product name is empty', done => {
                let admin = user[0];
                let access_token = generateToken({
                    id: admin.id,
                    name: admin.name,
                    email: admin.email
                })
                request(app)
                    .post('/products')
                    .send({
                        name: '',
                        image_url: 'https://fanatics.frgimages.com/FFImage/thumb.aspx?i=/productimages/_2444000/altimages/ff_2444895alt1_full.jpg&w=900',
                        price: 12000,
                        stock: 10,
                        categoryId: 3
                    })
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        let product = res.body;
                        expect(product.error).toContain('Product name can\'t be empty')
                    })
                    .end(err => {
                        if (err) {
                            done(err);
                        } else {
                            done();
                        }
                    })
            })

            test('should return status 400 bad request because product name is violate unique constraint', done => {
                let admin = user[0];
                let access_token = generateToken({
                    id: admin.id,
                    name: admin.name,
                    email: admin.email
                })
                request(app)
                    .post('/products')
                    .send({
                        name: 'Duke Football',
                        image_url: 'https://fanatics.frgimages.com/FFImage/thumb.aspx?i=/productimages/_2444000/altimages/ff_2444895alt1_full.jpg&w=900',
                        price: 12000,
                        stock: 10,
                        categoryId: 3
                    })
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        let product = res.body;
                        expect(product.error).toContain('Product already added to the system')
                    })
                    .end(err => {
                        if (err) {
                            done(err);
                        } else {
                            done();
                        }
                    })
            })

            test('should return status 400 bad request because product image_url is violate unique constraint', done => {
                let admin = user[0];
                let access_token = generateToken({
                    id: admin.id,
                    name: admin.name,
                    email: admin.email
                })
                request(app)
                    .post('/products')
                    .send({
                        name: 'Dallas Cowboys Blue Game Jersey',
                        image_url: 'https://fanatics.frgimages.com/FFImage/thumb.aspx?i=/productimages/_2768000/altimages/ff_2768013alt1_full.jpg&w=900',
                        price: 12000,
                        stock: 10,
                        categoryId: 3
                    })
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        let product = res.body;
                        expect(product.error).toContain('Product image already added to the system')
                    })
                    .end(err => {
                        if (err) {
                            done(err);
                        } else {
                            done();
                        }
                    })

                    
            })

            test('should return status 400 bad request because product image_url is empty', done => {
                let admin = user[0];
                let access_token = generateToken({
                    id: admin.id,
                    name: admin.name,
                    email: admin.email
                })
                request(app)
                    .post('/products')
                    .send({
                        name: 'Dallas Cowboys White Game Jersey',
                        image_url: '',
                        price: 12000,
                        stock: 10,
                        categoryId: 3
                    })
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        let product = res.body;
                        expect(product.error).toContain('Product image can\'t be empty')
                    })
                    .end(err => {
                        if (err) {
                            done(err);
                        } else {
                            done();
                        }
                    })

                    
            })

            test('should return status 400 bad request because product image_url format is invalid', done => {
                let admin = user[0];
                let access_token = generateToken({
                    id: admin.id,
                    name: admin.name,
                    email: admin.email
                })
                request(app)
                    .post('/products')
                    .send({
                        name: 'Dallas Cowboys Game Jersey',
                        image_url: 'fanatic website',
                        price: 12000,
                        stock: 10,
                        categoryId: 3
                    })
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        let product = res.body;
                        expect(product.error).toContain('Invalid image url format')
                    })
                    .end(err => {
                        if (err) {
                            done(err);
                        } else {
                            done();
                        }
                    })

                    
            })

            test('should return status 400 bad request because product price is less than 0', done => {
                let admin = user[0];
                let access_token = generateToken({
                    id: admin.id,
                    name: admin.name,
                    email: admin.email
                })
                request(app)
                    .post('/products')
                    .send({
                        name: 'Duke Football',
                        image_url: 'https://fanatics.frgimages.com/FFImage/thumb.aspx?i=/productimages/_2768000/altimages/ff_2768013alt1_full.jpg&w=900',
                        price: -12000,
                        stock: 10,
                        categoryId: 3
                    })
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        let product = res.body;
                        expect(product.error).toContain('Product price has to be greater than zero')
                    })
                    .end(err => {
                        if (err) {
                            done(err);
                        } else {
                            done();
                        }
                    })

                    
            })

            test('should return status 400 bad request because product price is empty', done => {
                let admin = user[0];
                let access_token = generateToken({
                    id: admin.id,
                    name: admin.name,
                    email: admin.email
                })
                request(app)
                    .post('/products')
                    .send({
                        name: 'Duke Football',
                        image_url: 'https://fanatics.frgimages.com/FFImage/thumb.aspx?i=/productimages/_2768000/altimages/ff_2768013alt1_full.jpg&w=900',
                        price: '',
                        stock: 10,
                        categoryId: 3
                    })
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        let product = res.body;
                        expect(product.error).toContain('Product price can\'t be empty')
                    })
                    .end(err => {
                        if (err) {
                            done(err);
                        } else {
                            done();
                        }
                    })

                    
            })

            test('should return status 400 bad request because product price is not in numeric format', done => {
                let admin = user[0];
                let access_token = generateToken({
                    id: admin.id,
                    name: admin.name,
                    email: admin.email
                })
                request(app)
                    .post('/products')
                    .send({
                        name: 'Dallas Cowboys Game Jersey',
                        image_url: 'fanatic website',
                        price: 'twelve thousand',
                        stock: 10,
                        categoryId: 3
                    })
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        let product = res.body;
                        expect(product.error).toContain('Product price must be a numeric value')
                    })
                    .end(err => {
                        if (err) {
                            done(err);
                        } else {
                            done();
                        }
                    })
            })

            test('should return status 400 bad request because product stock is less than 0', done => {
                let admin = user[0];
                let access_token = generateToken({
                    id: admin.id,
                    name: admin.name,
                    email: admin.email
                })
                request(app)
                    .post('/products')
                    .send({
                        name: 'Duke Football',
                        image_url: 'https://fanatics.frgimages.com/FFImage/thumb.aspx?i=/productimages/_2768000/altimages/ff_2768013alt1_full.jpg&w=900',
                        price: 12000,
                        stock: -3,
                        categoryId: 3
                    })
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        let product = res.body;
                        expect(product.error).toContain('Product stock has to be greater than zero')
                    })
                    .end(err => {
                        if (err) {
                            done(err);
                        } else {
                            done();
                        }
                    })

                    
            })

            test('should return status 400 bad request because product stock is empty', done => {
                let admin = user[0];
                let access_token = generateToken({
                    id: admin.id,
                    name: admin.name,
                    email: admin.email
                })
                request(app)
                    .post('/products')
                    .send({
                        name: 'Duke Football',
                        image_url: 'https://fanatics.frgimages.com/FFImage/thumb.aspx?i=/productimages/_2768000/altimages/ff_2768013alt1_full.jpg&w=900',
                        price: 1200000,
                        stock: '',
                        categoryId: 3
                    })
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        let product = res.body;
                        expect(product.error).toContain('Product stock can\'t be empty')
                    })
                    .end(err => {
                        if (err) {
                            done(err);
                        } else {
                            done();
                        }
                    })    
            })

            test('should return status 400 bad request because product stock is not in integer format', done => {
                let admin = user[0];
                let access_token = generateToken({
                    id: admin.id,
                    name: admin.name,
                    email: admin.email
                })
                request(app)
                    .post('/products')
                    .send({
                        name: 'Dallas Cowboys Game Jersey',
                        image_url: 'https://fanatics.frgimages.com/FFImage/thumb.aspx?i=/productimages/_2768000/altimages/ff_2768013alt1_full.jpg&w=900',
                        price: 1200000,
                        stock: 1.4,
                        categoryId: 3
                    })
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        let product = res.body;
                        expect(product.error).toContain('Product stock must be an integer value')
                    })
                    .end(err => {
                        if (err) {
                            done(err);
                        } else {
                            done();
                        }
                    })      
            })

            test('should return status 400 bad request because product category is empty', done => {
                let admin = user[0];
                let access_token = generateToken({
                    id: admin.id,
                    name: admin.name,
                    email: admin.email
                })
                request(app)
                    .post('/products')
                    .send({
                        name: 'Duke Football',
                        image_url: 'https://fanatics.frgimages.com/FFImage/thumb.aspx?i=/productimages/_2768000/altimages/ff_2768013alt1_full.jpg&w=900',
                        price: 1200000,
                        stock: '',
                        categoryId: ''
                    })
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        let product = res.body;
                        expect(product.error).toContain('Product Category can\'t be empty')
                    })
                    .end(err => {
                        if (err) {
                            done(err);
                        } else {
                            done();
                        }
                    })    
            })

            test('should return status code 401 unauthorized because user doesnt have permission to add product', done => {
                let admin = user[0];
                let access_token = generateToken({
                    id: 3,
                    name: admin.name,
                    email: admin.email
                })
                request(app)
                    .post('/products')
                    .send({
                        name: 'Dallas Cowboys White Game Jersey',
                        image_url: 'https://fanatics.frgimages.com/FFImage/thumb.aspx?i=/productimages/_2444000/altimages/ff_2444895alt1_full.jpg&w=900',
                        price: 12000,
                        stock: 10,
                        categoryId: 3
                    })
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(401)
                    .expect(res => {
                        let product = res.body;
                        expect(product.error).toContain('You dont have the authority to do this action')
                    })
                    .end(err => {
                        if (err) {
                            done(err);
                        } else {
                            done();
                        }
                    })
            })

            test('should return status code 401 unauthorized because user is not registered or logged in', done => {
                let admin = user[0];
                let access_token = generateToken({
                    id: 3,
                    name: admin.name,
                    email: admin.email
                })
                request(app)
                    .post('/products')
                    .send({
                        name: 'Dallas Cowboys White Game Jersey',
                        image_url: 'https://fanatics.frgimages.com/FFImage/thumb.aspx?i=/productimages/_2444000/altimages/ff_2444895alt1_full.jpg&w=900',
                        price: 12000,
                        stock: 10,
                        categoryId: 3
                    })
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(401)
                    .expect(res => {
                        let product = res.body;
                        expect(product.error).toContain('You have to login to access this page')
                    })
                    .end(err => {
                        if (err) {
                            done(err);
                        } else {
                            done();
                        }
                    })
            })

            test('should return status 401 unauthorized because user doesnt have permission to add new product(user is not an admin)', done => {
                let admin = user[1];
                let access_token = generateToken({
                    id: admin.id,
                    name: admin.name,
                    email: admin.email
                })
                request(app)
                    .post('/products')
                    .send({
                        name: 'Dallas Cowboys Game Jersey',
                        image_url: 'https://fanatics.frgimages.com/FFImage/thumb.aspx?i=/productimages/_2768000/altimages/ff_2768013alt1_full.jpg&w=900',
                        price: 1200000,
                        stock: 1.4,
                        categoryId: 3
                    })
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(401)
                    .expect(res => {
                        let product = res.body;
                        expect(product.error).toContain('Only admin has the authority to do this action')
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
    
    describe('Show all products', () => {
        describe('success', () => {
            test('should return status code 200 OK with json contain all data of products', done => {
                let admin = user[0];
                let access_token = generateToken({
                    id: admin.id,
                    name: admin.name,
                    email: admin.email
                })
                request(app)
                    .get('/products?sort=name|asc&page=1&per_page=10&search=')
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .expect(res => {
                        let { products } = JSON.parse(res.text)
                        expect(products.data).toEqual(
                            expect.arrayContaining([
                                expect.objectContaining({
                                    CategoryId: 3,
                                    UserId: 1,
                                    id: 1,
                                    image_url: "https://fanatics.frgimages.com/FFImage/thumb.aspx?i=/productimages/_2768000/altimages/ff_2768013alt1_full.jpg&w=900",
                                    name: "Duke Football",
                                    price: "1800000",
                                    stock: 1
                                })
                            ])
                        )
                    })
                    .end(err =>{
                        if(err) {
                            done(err);
                        } else {
                            done();
                        }
                    })
            })
        })
    })

    describe('Get Product By Id', () => {
        describe('success', () => {
            test('should return status code 200 OK with json contain selected products', done => {
                let admin = user[0];
                let access_token = generateToken({
                    id: admin.id,
                    name: admin.name,
                    email: admin.email
                })
                request(app)
                    .get('/products/1')
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .expect(res => {
                        let { product } = res.body;
                        expect(product).toHaveProperty('id', 1)
                        expect(product).toHaveProperty('name', 'Duke Football')
                        expect(product).toHaveProperty('image_url', "https://fanatics.frgimages.com/FFImage/thumb.aspx?i=/productimages/_2768000/altimages/ff_2768013alt1_full.jpg&w=900")
                        expect(product).toHaveProperty('price', '1800000')
                        expect(product).toHaveProperty('stock', 1)
                        expect(product).toHaveProperty('CategoryId', 3)
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

        describe('fail', () => {
            test('should return status code 404 because no product found', done => {
                let admin = user[0];
                let access_token = generateToken({
                    id: admin.id,
                    name: admin.name,
                    email: admin.email
                })
                request(app)
                    .get('/products/11')
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(404)
                    .expect(res => {
                        let product = res.body;
                        expect(product.error).toContain('no product with id 11 found')
                    })
                    .end(err => {
                        if (err) {
                            done(err);
                        } else {
                            done();
                        }
                    })
            })

            test('should return status code 401 unauthorized because user doesnt have permission to add product', done => {
                let admin = user[0];
                let access_token = generateToken({
                    id: 3,
                    name: admin.name,
                    email: admin.email
                })
                request(app)
                    .post('/products/1')
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(401)
                    .expect(res => {
                        let product = res.body;
                        expect(product.error).toContain('You dont have the authority to do this action')
                    })
                    .end(err => {
                        if (err) {
                            done(err);
                        } else {
                            done();
                        }
                    })
            })

            test('should return status code 401 unauthorized because user is not registered or logged in', done => {
                let admin = user[0];
                let access_token = generateToken({
                    id: 3,
                    name: admin.name,
                    email: admin.email
                })
                request(app)
                    .post('/products/1')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(401)
                    .expect(res => {
                        let product = res.body;
                        expect(product.error).toContain('You have to login to access this page')
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
    
    describe('update product', () => {
        describe('Success', () => {
            test('should return status code 200 ok along with json with key(name, image_url, price, stock)', done => {
                let admin = user[0];
                let access_token = generateToken({
                    id: admin.id,
                    name: admin.name,
                    email: admin.email
                })
                request(app)
                    .put('/products/1')
                    .send({
                        name: 'Duke White Football',
                        image_url: 'https://fanatics.frgimages.com/FFImage/thumb.aspx?i=/productimages/_2768000/altimages/ff_2768013alt1_full.jpg&w=900',
                        price: 18000,
                        stock: 10,
                        categoryId: 3
                    })
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .expect(res => {
                        let product = res.body.product;
                        expect(product).toEqual(
                            expect.arrayContaining([
                                expect.arrayContaining([
                                    expect.objectContaining({
                                        CategoryId: 3,
                                        UserId: 1,
                                        id: 1,
                                        name: 'Duke White Football',
                                        image_url: 'https://fanatics.frgimages.com/FFImage/thumb.aspx?i=/productimages/_2768000/altimages/ff_2768013alt1_full.jpg&w=900',
                                        price: '18000',
                                        stock: 10
                                    })
                                ])
                            ])
                        )
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
            test('should return status 400 bad request because product name is empty', done => {
                let admin = user[0];
                let access_token = generateToken({
                    id: admin.id,
                    name: admin.name,
                    email: admin.email
                })
                request(app)
                    .put(`/products/1`)
                    .send({
                        name: '',
                        image_url: 'https://fanatics.frgimages.com/FFImage/thumb.aspx?i=/productimages/_2444000/altimages/ff_2444895alt1_full.jpg&w=900',
                        price: 12000,
                        stock: 10,
                        categoryId: 3
                    })
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        let product = res.body;
                        expect(product.error).toContain('Product name can\'t be empty')
                    })
                    .end(err => {
                        if (err) {
                            done(err);
                        } else {
                            done();
                        }
                    })
            })

            test('should return status 400 bad request because product name is violate unique constraint', done => {
                let admin = user[0];
                let access_token = generateToken({
                    id: admin.id,
                    name: admin.name,
                    email: admin.email
                })
                request(app)
                    .put('/products/1')
                    .send({
                        name: 'Dallas Cowboys Helmet',
                        image_url: 'https://fanatics.frgimages.com/FFImage/thumb.aspx?i=/productimages/_2444000/altimages/ff_2444895alt1_full.jpg&w=900',
                        price: 12000,
                        stock: 10,
                        categoryId: 3
                    })
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        let product = res.body;
                        expect(product.error).toContain('Product already added to the system')
                    })
                    .end(err => {
                        if (err) {
                            done(err);
                        } else {
                            done();
                        }
                    })
            })

            test('should return status 400 bad request because product image_url is violate unique constraint', done => {
                let admin = user[0];
                let access_token = generateToken({
                    id: admin.id,
                    name: admin.name,
                    email: admin.email
                })
                request(app)
                    .put('/products/1')
                    .send({
                        name: 'Dallas Cowboys Blue Game Jersey',
                        image_url: 'https://fanatics.frgimages.com/FFImage/thumb.aspx?i=/productimages/_1586000/altimages/ff_1586957alt1_full.jpg&w=900',
                        price: 12000,
                        stock: 10,
                        categoryId: 3
                    })
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        let product = res.body;
                        expect(product.error).toContain('Product image already added to the system')
                    })
                    .end(err => {
                        if (err) {
                            done(err);
                        } else {
                            done();
                        }
                    })

                    
            })

            test('should return status 400 bad request because product image_url is empty', done => {
                let admin = user[0];
                let access_token = generateToken({
                    id: admin.id,
                    name: admin.name,
                    email: admin.email
                })
                request(app)
                    .put('/products/1')
                    .send({
                        name: 'Dallas Cowboys White Game Jersey',
                        image_url: '',
                        price: 12000,
                        stock: 10,
                        categoryId: 3
                    })
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        let product = res.body;
                        expect(product.error).toContain('Product image can\'t be empty')
                    })
                    .end(err => {
                        if (err) {
                            done(err);
                        } else {
                            done();
                        }
                    })

                    
            })

            test('should return status 400 bad request because product image_url format is invalid', done => {
                let admin = user[0];
                let access_token = generateToken({
                    id: admin.id,
                    name: admin.name,
                    email: admin.email
                })
                request(app)
                    .put('/products/1')
                    .send({
                        name: 'Dallas Cowboys Game Jersey',
                        image_url: 'fanatic website',
                        price: 12000,
                        stock: 10,
                        categoryId: 3
                    })
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        let product = res.body;
                        expect(product.error).toContain('Invalid image url format')
                    })
                    .end(err => {
                        if (err) {
                            done(err);
                        } else {
                            done();
                        }
                    })

                    
            })

            test('should return status 400 bad request because product price is less than 0', done => {
                let admin = user[0];
                let access_token = generateToken({
                    id: admin.id,
                    name: admin.name,
                    email: admin.email
                })
                request(app)
                    .put('/products/1')
                    .send({
                        name: 'Duke Football',
                        image_url: 'https://fanatics.frgimages.com/FFImage/thumb.aspx?i=/productimages/_2768000/altimages/ff_2768013alt1_full.jpg&w=900',
                        price: -12000,
                        stock: 10,
                        categoryId: 3
                    })
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        let product = res.body;
                        expect(product.error).toContain('Product price has to be greater than zero')
                    })
                    .end(err => {
                        if (err) {
                            done(err);
                        } else {
                            done();
                        }
                    })

                    
            })

            test('should return status 400 bad request because product price is empty', done => {
                let admin = user[0];
                let access_token = generateToken({
                    id: admin.id,
                    name: admin.name,
                    email: admin.email
                })
                request(app)
                    .put('/products/1')
                    .send({
                        name: 'Duke Football',
                        image_url: 'https://fanatics.frgimages.com/FFImage/thumb.aspx?i=/productimages/_2768000/altimages/ff_2768013alt1_full.jpg&w=900',
                        price: '',
                        stock: 10,
                        categoryId: 3
                    })
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        let product = res.body;
                        expect(product.error).toContain('Product price can\'t be empty')
                    })
                    .end(err => {
                        if (err) {
                            done(err);
                        } else {
                            done();
                        }
                    })

                    
            })

            test('should return status 400 bad request because product price is not in numeric format', done => {
                let admin = user[0];
                let access_token = generateToken({
                    id: admin.id,
                    name: admin.name,
                    email: admin.email
                })
                request(app)
                    .put('/products/1')
                    .send({
                        name: 'Dallas Cowboys Game Jersey',
                        image_url: 'fanatic website',
                        price: 'twelve thousand',
                        stock: 10,
                        categoryId: 3
                    })
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        let product = res.body;
                        expect(product.error).toContain('Product price must be a numeric value')
                    })
                    .end(err => {
                        if (err) {
                            done(err);
                        } else {
                            done();
                        }
                    })
            })

            test('should return status 400 bad request because product stock is less than 0', done => {
                let admin = user[0];
                let access_token = generateToken({
                    id: admin.id,
                    name: admin.name,
                    email: admin.email
                })
                request(app)
                    .put('/products/1') 
                    .send({
                        name: 'Duke Football',
                        image_url: 'https://fanatics.frgimages.com/FFImage/thumb.aspx?i=/productimages/_2768000/altimages/ff_2768013alt1_full.jpg&w=900',
                        price: 12000,
                        stock: -3,
                        categoryId: 3
                    })
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        let product = res.body;
                        expect(product.error).toContain('Product stock has to be greater than zero')
                    })
                    .end(err => {
                        if (err) {
                            done(err);
                        } else {
                            done();
                        }
                    })

                    
            })

            test('should return status 400 bad request because product stock is empty', done => {
                let admin = user[0];
                let access_token = generateToken({
                    id: admin.id,
                    name: admin.name,
                    email: admin.email
                })
                request(app)
                    .put('/products/1')
                    .send({
                        name: 'Duke Football',
                        image_url: 'https://fanatics.frgimages.com/FFImage/thumb.aspx?i=/productimages/_2768000/altimages/ff_2768013alt1_full.jpg&w=900',
                        price: 1200000,
                        stock: '',
                        categoryId: 3
                    })
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        let product = res.body;
                        expect(product.error).toContain('Product stock can\'t be empty')
                    })
                    .end(err => {
                        if (err) {
                            done(err);
                        } else {
                            done();
                        }
                    })

                    
            })

            test('should return status 400 bad request because product stock is not in integer format', done => {
                let admin = user[0];
                let access_token = generateToken({
                    id: admin.id,
                    name: admin.name,
                    email: admin.email
                })
                request(app)
                    .put('/products/1')
                    .send({
                        name: 'Dallas Cowboys Game Jersey',
                        image_url: 'https://fanatics.frgimages.com/FFImage/thumb.aspx?i=/productimages/_2768000/altimages/ff_2768013alt1_full.jpg&w=900',
                        price: 1200000,
                        stock: 1.4,
                        categoryId: 3
                    })
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        let product = res.body;
                        expect(product.error).toContain('Product stock must be an integer value')
                    })
                    .end(err => {
                        if (err) {
                            done(err);
                        } else {
                            done();
                        }
                    })

                    
            })

            test('should return status 400 bad request because product category is empty', done => {
                let admin = user[0];
                let access_token = generateToken({
                    id: admin.id,
                    name: admin.name,
                    email: admin.email
                })
                request(app)
                    .put('/products/1')
                    .send({
                        name: 'Dallas Cowboys Game Jersey',
                        image_url: 'https://fanatics.frgimages.com/FFImage/thumb.aspx?i=/productimages/_2768000/altimages/ff_2768013alt1_full.jpg&w=900',
                        price: 1200000,
                        stock: 1,
                        categoryId: ''
                    })
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        let product = res.body;
                        expect(product.error).toContain('Product Category can\'t be empty')
                    })
                    .end(err => {
                        if (err) {
                            done(err);
                        } else {
                            done();
                        }
                    })    
            })

            test('should return status code 401 unauthorized because user doesnt have permission to update product', done => {
                let admin = user[0];
                let access_token = generateToken({
                    id: 3,
                    name: admin.name,
                    email: admin.email
                })
                request(app)
                    .put('/products/1')
                    .send({
                        name: 'Dallas Cowboys White Game Jersey',
                        image_url: 'https://fanatics.frgimages.com/FFImage/thumb.aspx?i=/productimages/_2444000/altimages/ff_2444895alt1_full.jpg&w=900',
                        price: 12000,
                        stock: 10
                    })
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(401)
                    .expect(res => {
                        let product = res.body;
                        expect(product.error).toContain('You dont have the authority to do this action')
                    })
                    .end(err => {
                        if (err) {
                            done(err);
                        } else {
                            done();
                        }
                    })
            })

            test('should return status code 401 unauthorized because user is not registered or logged in', done => {
                let admin = user[0];
                let access_token = generateToken({
                    id: 3,
                    name: admin.name,
                    email: admin.email
                })
                request(app)
                    .put('/products/1')
                    .send({
                        name: 'Dallas Cowboys White Game Jersey',
                        image_url: 'https://fanatics.frgimages.com/FFImage/thumb.aspx?i=/productimages/_2444000/altimages/ff_2444895alt1_full.jpg&w=900',
                        price: 12000,
                        stock: 10
                    })
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(401)
                    .expect(res => {
                        let product = res.body;
                        expect(product.error).toContain('You have to login to access this page')
                    })
                    .end(err => {
                        if (err) {
                            done(err);
                        } else {
                            done();
                        }
                    })
            })

            test('should return status 404 not found because product with id passing from req.params is not exist', done => {
                let admin = user[0];
                let access_token = generateToken({
                    id: admin.id,
                    name: admin.name,
                    email: admin.email
                })
                request(app)
                    .put('/products/10')
                    .send({
                        name: 'Dallas Cowboys Game Jersey',
                        image_url: 'https://fanatics.frgimages.com/FFImage/thumb.aspx?i=/productimages/_2768000/altimages/ff_2768013alt1_full.jpg&w=900',
                        price: 1200000,
                        stock: 1.4
                    })
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(404)
                    .expect(res => {
                        let product = res.body;
                        expect(product.error).toContain('no product with id 10 found')
                    })
                    .end(err => {
                        if (err) {
                            done(err);
                        } else {
                            done();
                        }
                    })

                    
            })

            test('should return status 401 unauthorized because user doesnt have permission to update product(user is not an admin)', done => {
                let admin = user[1];
                let access_token = generateToken({
                    id: admin.id,
                    name: admin.name,
                    email: admin.email
                })
                request(app)
                    .put('/products/1')
                    .send({
                        name: 'Dallas Cowboys Game Jersey',
                        image_url: 'https://fanatics.frgimages.com/FFImage/thumb.aspx?i=/productimages/_2768000/altimages/ff_2768013alt1_full.jpg&w=900',
                        price: 1200000,
                        stock: 1.4
                    })
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(401)
                    .expect(res => {
                        let product = res.body;
                        expect(product.error).toContain('Only admin has the authority to do this action')
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
    
    describe('delete product', () => {
        describe('success', () => {
            test('should return status 200 ok success delete product', done => {
                let admin = user[0];
                let access_token = generateToken({
                    id: admin.id,
                    name: admin.name,
                    email: admin.email
                })
                request(app)
                    .delete('/products/1')
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .expect(res => {
                        let product = res.body;
                        expect(product).toHaveProperty('msg', 'Success delete product with id 1')
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

        describe('fail', () => {
            test('should return status code 401 unauthorized because user doesnt have permission to delete product', done => {
                let admin = user[0];
                let access_token = generateToken({
                    id: 3,
                    name: admin.name,
                    email: admin.email
                })
                request(app)
                    .delete('/products/1')
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(401)
                    .expect(res => {
                        let product = res.body;
                        expect(product.error).toContain('You dont have the authority to do this action')
                    })
                    .end(err => {
                        if (err) {
                            done(err);
                        } else {
                            done();
                        }
                    })
            })

            test('should return status code 401 unauthorized because user is not registered or logged in', done => {
                let admin = user[0];
                let access_token = generateToken({
                    id: 3,
                    name: admin.name,
                    email: admin.email
                })
                request(app)
                    .delete('/products/3')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(401)
                    .expect(res => {
                        let product = res.body;
                        expect(product.error).toContain('You have to login to access this page')
                    })
                    .end(err => {
                        if (err) {
                            done(err);
                        } else {
                            done();
                        }
                    })
            })

            test('should return status 404 not found because product with id passing from req.params is not exist', done => {
                let admin = user[0];
                let access_token = generateToken({
                    id: admin.id,
                    name: admin.name,
                    email: admin.email
                })
                request(app)
                    .delete('/products/10')
                    .send({
                        name: 'Dallas Cowboys Game Jersey',
                        image_url: 'https://fanatics.frgimages.com/FFImage/thumb.aspx?i=/productimages/_2768000/altimages/ff_2768013alt1_full.jpg&w=900',
                        price: 1200000,
                        stock: 1.4
                    })
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(404)
                    .expect(res => {
                        let product = res.body;
                        expect(product.error).toContain('no product with id 10 found')
                    })
                    .end(err => {
                        if (err) {
                            done(err);
                        } else {
                            done();
                        }
                    })

                    
            })

            test('should return status 401 unauthorized because user doesnt have permission to delete product(user is not an admin)', done => {
                let admin = user[1];
                let access_token = generateToken({
                    id: admin.id,
                    name: admin.name,
                    email: admin.email
                })
                request(app)
                    .delete('/products/2')
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(401)
                    .expect(res => {
                        let product = res.body;
                        expect(product.error).toContain('Only admin has the authority to do this action')
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

    afterAll(done => {
        queryInterface.bulkDelete('Users')
            .then(() => {
                return queryInterface.bulkDelete('Products')
            })
            .then(() => {
                return queryInterface.bulkDelete('Categories')
            })
            .then(() => {
                done();
            })
            .catch(err => {
                done(err);
            })
    })
})
