const app = require('../app.js');
const request = require('supertest');
const { queryInterface } = require('../models').sequelize;
const { hashPassword } = require('../helpers/bcrypt.js');
const { generateToken } = require('../helpers/jwt.js');
const customerData = require('../rawData/rawCustomer.json');
const productData = require('../rawData/rawProduct.json');
const cartProductData = require('../rawData/rawCartProduct.json');
const categoryData = require('../rawData/rawCategory.json');
const userData = require('../rawData/rawUser.json');
const cartData = require('../rawData/rawCart.json')

describe('Cart Router', () => {
    let cartProducts = [];
    let customers = [];
    let products = [];
    let users = [];
    let categories = [];
    let carts = [];

    customerData.map(customer => {
        customer.password = hashPassword(customer.password);
        customer.createdAt = new Date();
        customer.updatedAt = new Date();

        return customer;
    })

    userData.map(user => {
        user.password = hashPassword(user.password);
        user.createdAt = new Date();
        user.updatedAt = new Date();

        return user;
    })

    cartProductData.map(cart => {
        cart.createdAt = new Date();
        cart.updatedAt = new Date();

        return cart;
    })

    categoryData.map(category => {
        category.createdAt = new Date();
        category.updatedAt = new Date();

        return category;
    })

    cartData.map(cart => {
        cart.createdAt = new Date();
        cart.updatedAt = new Date();

        return cart;
    })

    productData.map(product => {
        product.createdAt = new Date();
        product.updatedAt = new Date();
        product.UserId = 1;

        return product;
    })

    beforeAll(done => {
        queryInterface.bulkInsert('Customers', customerData, {
            returning: true
        })
        .then(res => {
            customers = res;
            return queryInterface.bulkInsert('Carts', cartData, {
                returning: true
            })
        })
        .then(res => {
            carts = res;
            return queryInterface.bulkInsert('Users', userData, {
                returning: true
            })
        })
        .then(res => {
            users = res;
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
            return queryInterface.bulkInsert('ProductCarts', cartProductData, {
                returning: true
            })
        })
        .then(res => {
            cartProducts = res;
            done();
        })
        .catch(err => {
            done(err);
        })
    })

    describe('Show Cart', () => {
        describe('Success', () => {
            test('should return status code 200 with json contain all product in logged in user\'s cart', done => {
                const customer = customers[0];
                const access_token = generateToken({
                    id: customer.id,
                    name: customer.name,
                    email: customer.email
                })
                request(app)
                    .get('/carts')
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .expect(res => {
                        const { cart } = res.body;
                        expect(cart).toHaveProperty('id',1)
                        expect(cart).toHaveProperty('CustomerId',1)
                        expect(cart).toHaveProperty('total_price','3000000')
                        expect(cart.Products).toEqual(
                            expect.arrayContaining([
                                expect.objectContaining({
                                    id: 2,
                                    name: 'Dallas Cowboys Helmet',
                                    image_url: 'https://fanatics.frgimages.com/FFImage/thumb.aspx?i=/productimages/_3898000/ff_3898657-ccf691495748ccdae213_full.jpg&w=2000',
                                    price: '1500000',
                                    stock: 15,
                                    UserId: 1,
                                    CategoryId: 3
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

        describe('Fail', () => {
            test('should return status code 401 unauthorized because customer doesn\'t have permission to see shopping cart', done => {
                const customer = customers[0];
                const access_token = generateToken({
                    id: 3,
                    name: customer.name,
                    email: customer.email
                })
                request(app)
                    .get('/carts')
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(401)
                    .expect(res => {
                        const cart = res.body;
                        expect(cart.error).toContain('You dont have the authority to do this action')
                    })
                    .end(err =>{
                        if(err) {
                            done(err);
                        } else {
                            done();
                        }
                    })
            })

            test('should return status code 401 unauthorized because customer is not registered or logged in', done => {
                const customer = customers[0];
                const access_token = generateToken({
                    id: 1,
                    name: customer.name,
                    email: customer.email
                })
                request(app)
                    .get('/carts')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(401)
                    .expect(res => {
                        const cart = res.body;
                        expect(cart.error).toContain('You have to login to access this page')
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

    describe('Add new product to cart', () => {
        describe('Success', () => {
            test('should return status code 201 created along with json containing key of (CartId, ProductId, quantity, price)', done => {
                const customer = customers[0];
                const access_token = generateToken({
                    id: customer.id,
                    name: customer.name,
                    email: customer.email
                })
                request(app)
                    .post('/carts')
                    .send({
                        quantity: 2,
                        productId: 3
                    })
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(201)
                    .expect(res => {
                        const cart = res.body;
                        expect(cart.product).toHaveProperty('ProductId', 3)
                        expect(cart.product).toHaveProperty('CartId', 1)
                        expect(cart.product).toHaveProperty('quantity', 2)
                        expect(cart.product).toHaveProperty('price', '2400000')
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

        describe('Fail', () =>{
            test('should return status code 400 Bad Request because product quantity is empty', done => {
                const customer = customers[0];
                const access_token = generateToken({
                    id: customer.id,
                    name: customer.name,
                    email: customer.email
                })
                request(app)
                    .post('/carts')
                    .send({
                        quantity: '',
                        productId: 3
                    })
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        const cart = res.body;
                        expect(cart.error).toContain('Product quantity can\'t be empty')
                    })
                    .end(err =>{
                        if(err) {
                            done(err);
                        } else {
                            done();
                        }
                    })
            })

            test('should return status code 400 Bad Request because product quantity is not integer', done => {
                const customer = customers[0];
                const access_token = generateToken({
                    id: customer.id,
                    name: customer.name,
                    email: customer.email
                })
                request(app)
                    .post('/carts')
                    .send({
                        quantity: 'x',
                        productId: 3
                    })
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        const cart = res.body;
                        expect(cart.error).toContain('Product quantity must be an integer value')
                    })
                    .end(err =>{
                        if(err) {
                            done(err);
                        } else {
                            done();
                        }
                    })
            })

            test('should return status code 400 Bad Request because product quantity is less than 1', done => {
                const customer = customers[0];
                const access_token = generateToken({
                    id: customer.id,
                    name: customer.name,
                    email: customer.email
                })
                request(app)
                    .post('/carts')
                    .send({
                        quantity: 0,
                        productId: 3
                    })
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        const cart = res.body;
                        expect(cart.error).toContain('Product quantity can\'t be lest than 1')
                    })
                    .end(err =>{
                        if(err) {
                            done(err);
                        } else {
                            done();
                        }
                    })
            })

            test('should return status code 400 Bad Request because product id is empty', done => {
                const customer = customers[0];
                const access_token = generateToken({
                    id: customer.id,
                    name: customer.name,
                    email: customer.email
                })
                request(app)
                    .post('/carts')
                    .send({
                        quantity: 1,
                        productId: ''
                    })
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        const cart = res.body;
                        expect(cart.error).toContain('Product id can\'t be empty')
                    })
                    .end(err =>{
                        if(err) {
                            done(err);
                        } else {
                            done();
                        }
                    })
            })

            test('should return status code 400 Bad Request because product already added to cart', done => {
                const customer = customers[0];
                const access_token = generateToken({
                    id: customer.id,
                    name: customer.name,
                    email: customer.email
                })
                request(app)
                    .post('/carts')
                    .send({
                        quantity: 1,
                        productId: 2
                    })
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        const cart = res.body;
                        expect(cart.error).toContain('Product already added to your cart')
                    })
                    .end(err =>{
                        if(err) {
                            done(err);
                        } else {
                            done();
                        }
                    })
            })

            test('should return status code 400 Bad Request because product stock is not enough', done => {
                const customer = customers[0];
                const access_token = generateToken({
                    id: customer.id,
                    name: customer.name,
                    email: customer.email
                })
                request(app)
                    .post('/carts')
                    .send({
                        quantity: 3,
                        productId: 1
                    })
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        const cart = res.body;
                        expect(cart.error).toContain('only 1 Duke Football is available on the stock')
                    })
                    .end(err =>{
                        if(err) {
                            done(err);
                        } else {
                            done();
                        }
                    })
            })

            test('should return status code 400 Bad Request because product stock is out of stock', done => {
                const customer = customers[0];
                const access_token = generateToken({
                    id: customer.id,
                    name: customer.name,
                    email: customer.email
                })
                request(app)
                    .post('/carts')
                    .send({
                        quantity: 1,
                        productId: 4
                    })
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        const cart = res.body;
                        expect(cart.error).toContain('Dallas Mavericks City Edition 19-20 is out of stock')
                    })
                    .end(err =>{
                        if(err) {
                            done(err);
                        } else {
                            done();
                        }
                    })
            })

            test('should return status code 401 unauthorized because customer doesn\'t have permission to add product to shopping cart', done => {
                const customer = customers[0];
                const access_token = generateToken({
                    id: 3,
                    name: customer.name,
                    email: customer.email
                })
                request(app)
                    .post('/carts')
                    .send({
                        quantity: 1,
                        productId: 3
                    })
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(401)
                    .expect(res => {
                        const cart = res.body;
                        expect(cart.error).toContain('You dont have the authority to do this action')
                    })
                    .end(err =>{
                        if(err) {
                            done(err);
                        } else {
                            done();
                        }
                    })
            })

            test('should return status code 401 unauthorized because customer is not registered or logged in', done => {
                const customer = customers[0];
                const access_token = generateToken({
                    id: 1,
                    name: customer.name,
                    email: customer.email
                })
                request(app)
                    .post('/carts')
                    .send({
                        quantity: 1,
                        productId: 3
                    })
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(401)
                    .expect(res => {
                        const cart = res.body;
                        expect(cart.error).toContain('You have to login to access this page')
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

    describe('Show Transaction History', () => {
        describe('success', () => {
            test('should return status code 200 along with json containing list of purchased products', done => {
                const customer = customers[0];
                const access_token = generateToken({
                    id: customer.id,
                    name: customer.name,
                    email: customer.email
                })
                request(app)
                    .get('/carts/history')
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .expect(res => {
                        const { products } = res.body;
                        expect(products[0].Product).toEqual({
                            id: 3,
                            name: 'Custom Name Dallas Cowboys Men Jersey',
                            image_url: 'https://fanatics.frgimages.com/FFImage/thumb.aspx?i=/productimages/_1586000/altimages/ff_1586957alt1_full.jpg&w=900',
                            price: '1200000',
                            stock: 7,
                            UserId: 1,
                            CategoryId: 3
                        })
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

        describe('fail', () => {
            test('should return status code 401 unauthorized because customer doesn\'t have permission to see shopping cart', done => {
                const customer = customers[0];
                const access_token = generateToken({
                    id: 3,
                    name: customer.name,
                    email: customer.email
                })
                request(app)
                    .get('/carts/history')
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(401)
                    .expect(res => {
                        const cart = res.body;
                        expect(cart.error).toContain('You dont have the authority to do this action')
                    })
                    .end(err =>{
                        if(err) {
                            done(err);
                        } else {
                            done();
                        }
                    })
            })

            test('should return status code 401 unauthorized because customer is not registered or logged in', done => {
                const customer = customers[0];
                const access_token = generateToken({
                    id: 1,
                    name: customer.name,
                    email: customer.email
                })
                request(app)
                    .get('/carts/history')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(401)
                    .expect(res => {
                        const cart = res.body;
                        expect(cart.error).toContain('You have to login to access this page')
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

    describe('Change Product Quantity', () => {
        describe('Success', () =>{
            test('should return status 200 OK with json containing key of (CartId, ProductId, quantity, price)', done => {
                const customer = customers[0];
                const access_token = generateToken({
                    id: customer.id,
                    name: customer.name,
                    email: customer.email
                })
                request(app)
                    .patch('/carts/2')
                    .send({
                        quantity: 1
                    })
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .expect(res => {
                        const cart = res.body;
                        expect(cart.cartProduct[0]).toHaveProperty('ProductId', 2)
                        expect(cart.cartProduct[0]).toHaveProperty('CartId', 1)
                        expect(cart.cartProduct[0]).toHaveProperty('quantity', 1)
                        expect(cart.cartProduct[0]).toHaveProperty('price', '1500000')
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

        describe('Fail', () => {
            test('should return status code 400 Bad Request because product quantity is empty', done => {
                const customer = customers[0];
                const access_token = generateToken({
                    id: customer.id,
                    name: customer.name,
                    email: customer.email
                })
                request(app)
                    .patch('/carts/2')
                    .send({
                        quantity: ''
                    })
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        const cart = res.body;
                        expect(cart.error).toContain('Product quantity can\'t be empty')
                    })
                    .end(err =>{
                        if(err) {
                            done(err);
                        } else {
                            done();
                        }
                    })
            })

            test('should return status code 400 Bad Request because product quantity is not integer', done => {
                const customer = customers[0];
                const access_token = generateToken({
                    id: customer.id,
                    name: customer.name,
                    email: customer.email
                })
                request(app)
                    .patch('/carts/2')
                    .send({
                        quantity: 'x'
                    })
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        const cart = res.body;
                        expect(cart.error).toContain('Product quantity must be an integer value')
                    })
                    .end(err =>{
                        if(err) {
                            done(err);
                        } else {
                            done();
                        }
                    })
            })

            test('should return status code 400 Bad Request because product quantity is less than 1', done => {
                const customer = customers[0];
                const access_token = generateToken({
                    id: customer.id,
                    name: customer.name,
                    email: customer.email
                })
                request(app)
                    .patch('/carts/2')
                    .send({
                        quantity: 0
                    })
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        const cart = res.body;
                        expect(cart.error).toContain('Product quantity can\'t be lest than 1')
                    })
                    .end(err =>{
                        if(err) {
                            done(err);
                        } else {
                            done();
                        }
                    })
            })

            test('should return status code 400 Bad Request because product stock is not enough', done => {
                const customer = customers[0];
                const access_token = generateToken({
                    id: customer.id,
                    name: customer.name,
                    email: customer.email
                })
                request(app)
                    .patch('/carts/2')
                    .send({
                        quantity: 20
                    })
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        const cart = res.body;
                        expect(cart.error).toContain('only 15 Dallas Cowboys Helmet is available on the stock')
                    })
                    .end(err =>{
                        if(err) {
                            done(err);
                        } else {
                            done();
                        }
                    })
            })

            test('should return status code 400 Bad Request because product stock is out of stock', done => {
                const customer = customers[0];
                const access_token = generateToken({
                    id: customer.id,
                    name: customer.name,
                    email: customer.email
                })
                request(app)
                    .patch('/carts/4')
                    .send({
                        quantity: 2
                    })
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        const cart = res.body;
                        expect(cart.error).toContain('Dallas Mavericks City Edition 19-20 is out of stock')
                    })
                    .end(err =>{
                        if(err) {
                            done(err);
                        } else {
                            done();
                        }
                    })
            })

            test('should return status code 404 not found because product doesn\'t found in shopping cart', done => {
                const customer = customers[0];
                const access_token = generateToken({
                    id: customer.id,
                    name: customer.name,
                    email: customer.email
                })
                request(app)
                    .patch('/carts/5')
                    .send({
                        quantity: 2
                    })
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(404)
                    .expect(res => {
                        const cart = res.body;
                        expect(cart.error).toContain('no product with id 5 found in your cart')
                    })
                    .end(err =>{
                        if(err) {
                            done(err);
                        } else {
                            done();
                        }
                    })
            })

            test('should return status code 401 unauthorized because customer doesn\'t have permission to change quantity of product in shopping cart', done => {
                const customer = customers[0];
                const access_token = generateToken({
                    id: 3,
                    name: customer.name,
                    email: customer.email
                })
                request(app)
                    .patch('/carts/2')
                    .send({
                        quantity: 1
                    })
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(401)
                    .expect(res => {
                        const cart = res.body;
                        expect(cart.error).toContain('You dont have the authority to do this action')
                    })
                    .end(err =>{
                        if(err) {
                            done(err);
                        } else {
                            done();
                        }
                    })
            })

            test('should return status code 401 unauthorized because customer is not registered or logged in', done => {
                const customer = customers[0];
                const access_token = generateToken({
                    id: 1,
                    name: customer.name,
                    email: customer.email
                })
                request(app)
                    .patch('/carts/2')
                    .send({
                        quantity: 1
                    })
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(401)
                    .expect(res => {
                        const cart = res.body;
                        expect(cart.error).toContain('You have to login to access this page')
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

    describe('Remove Product from Shopping Cart', () => {
        describe('Success', () => {
            test('should return success message with id of deleted product', done => {
                const customer = customers[0];
                const access_token = generateToken({
                    id: customer.id,
                    name: customer.name,
                    email: customer.email
                })
                request(app)
                    .delete('/carts/2')
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .expect(res => {
                        const cart = res.body;
                        expect(cart.msg).toEqual('Success remove product with id 2 from your cart')
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

        describe('Fail', () => {
            test('should return status code 404 not found because product doesn\'t found in shopping cart', done => {
                const customer = customers[0];
                const access_token = generateToken({
                    id: customer.id,
                    name: customer.name,
                    email: customer.email
                })
                request(app)
                    .delete('/carts/5')
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(404)
                    .expect(res => {
                        const cart = res.body;
                        expect(cart.error).toContain('no product with id 5 found in your cart')
                    })
                    .end(err =>{
                        if(err) {
                            done(err);
                        } else {
                            done();
                        }
                    })
            })

            test('should return status code 401 unauthorized because customer doesn\'t have permission to remove product from shopping cart', done => {
                const customer = customers[0];
                const access_token = generateToken({
                    id: 3,
                    name: customer.name,
                    email: customer.email
                })
                request(app)
                    .delete('/carts/2')
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(401)
                    .expect(res => {
                        const cart = res.body;
                        expect(cart.error).toContain('You dont have the authority to do this action')
                    })
                    .end(err =>{
                        if(err) {
                            done(err);
                        } else {
                            done();
                        }
                    })
            })

            test('should return status code 401 unauthorized because customer is not registered or logged in', done => {
                const customer = customers[0];
                const access_token = generateToken({
                    id: 1,
                    name: customer.name,
                    email: customer.email
                })
                request(app)
                    .delete('/carts/2')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(401)
                    .expect(res => {
                        const cart = res.body;
                        expect(cart.error).toContain('You have to login to access this page')
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

    describe('Checkout', () => {
        describe('Success', () => {
            test('should return status code 200 along with success message', done => {
                const customer = customers[0];
                const access_token = generateToken({
                    id: customer.id,
                    name: customer.name,
                    email: customer.email
                })
                request(app)
                    .patch('/carts/checkout')
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .expect(res => {
                        const checkout = res.body;
                        expect(checkout.msg).toEqual('Checkout Success')
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

        describe('fail', () => {
            test('should return status code 401 unauthorized because customer doesn\'t have permission to change quantity of product in shopping cart', done => {
                const customer = customers[0];
                const access_token = generateToken({
                    id: 3,
                    name: customer.name,
                    email: customer.email
                })
                request(app)
                    .patch('/carts/history')
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(401)
                    .expect(res => {
                        const cart = res.body;
                        expect(cart.error).toContain('You dont have the authority to do this action')
                    })
                    .end(err =>{
                        if(err) {
                            done(err);
                        } else {
                            done();
                        }
                    })
            })

            test('should return status code 401 unauthorized because customer is not registered or logged in', done => {
                const customer = customers[0];
                const access_token = generateToken({
                    id: 1,
                    name: customer.name,
                    email: customer.email
                })
                request(app)
                    .patch('/carts/history')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(401)
                    .expect(res => {
                        const cart = res.body;
                        expect(cart.error).toContain('You have to login to access this page')
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

    afterAll(done => {
        queryInterface.bulkDelete('Customers')
            .then(() => {
                return queryInterface.bulkDelete('Carts')
            })
            .then(() => {
                return queryInterface.bulkDelete('Users')
            })
            .then(() => {
                return queryInterface.bulkDelete('Categories')
            })
            .then(() => {
                return queryInterface.bulkDelete('Products')
            })
            .then(() => {
                return queryInterface.bulkDelete('ProductCarts')
            })
            .then(() => {
                done();
            })
            .catch(err => {
                done(err);
            })
    })
})