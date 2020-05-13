const app = require('../app.js')
const request = require('supertest')
const { queryInterface } = require('../models/index.js').sequelize
const { Product, User } = require('../models/index.js')

beforeAll( done => {
    Promise.all([
        Product.destroy({ truncate: true, cascade: true, restartIdentity: true}),
        User.destroy({ truncate: true, cascade: true, restartIdentity: true})
    ])  
    .then(_=> { done() })
    .catch(err => { done(err) })
})

const vitamins = [
    {
        name: 'Elixir-C',
        description: 'Multivitamin untuk mendukung aktivitas hacking-mu!',
        price: 3000,
        stock: 20,
        category : 'Vitamin',
        expiry: '2020-12-12',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name: 'Elixir-B',
        description: 'Multivitamin untuk mendukung aktivitas hacking-mu!',
        price: 35000,
        stock: 5,
        category : 'Vitamin',
        expiry: '2020-12-12',
        createdAt: new Date(),
        updatedAt: new Date()
    }
]

const defaultImgUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/ImageNA.svg/600px-ImageNA.svg.png"

describe('Successful Product operations', () => {
    describe('Find All Products GET /products', () => {
        beforeAll((done) => {
            queryInterface.bulkDelete('Products')
                .then(_=> { 
                    queryInterface.bulkInsert('Products', vitamins)
                        .then(_=> { done() })
                        .catch(err => { done(err) })
                })
                .catch(err => { done(err) })            
        })
    
        test('Response code 200 returning array of products', (done) => {
            request(app)
                .get('/products')
                .end((err, response) => {
                    if (err) return done(err)
                    else {
                        expect(response.status).toBe(200)
    
                        // console.log(response.body);
                        let { products } = response.body
                        let length = products.length
                        let result = products[length - 1]
                        let vitamin = vitamins[length - 1]
    
                        expect(Array.isArray(products)).toBe(true)
                        expect(typeof result.id).toBe('number')
                        expect(result).toHaveProperty('name', vitamin.name)
                        expect(result).toHaveProperty('category', vitamin.category)
                        expect(result).toHaveProperty('stock', vitamin.stock)
                        expect(result).toHaveProperty('price', vitamin.price)
                        expect(result).toHaveProperty('description', vitamin.description)
                        return done()
                    }
                })
        })
    })

    describe('Find one by id GET /products/:id', () => {
        afterAll((done) => {
            queryInterface.bulkDelete('Products')
                .then(_=> { done() })
                .catch(err => { done(err) })
        })

        test('Response code 200 returning one instance of Product', done => {
            request(app)
                .get('/products/1')
                .end((err, response) => {
                    if (err) return done(err)
                    else {
                        expect(response.status).toBe(200)
    
                        // console.log(response.body);
                        let { product } = response.body
                        let vitamin = vitamins[0]
    
                        expect(typeof product.id).toBe('number')
                        expect(product).toHaveProperty('name', vitamin.name)
                        expect(product).toHaveProperty('category', vitamin.category)
                        expect(product).toHaveProperty('stock', vitamin.stock)
                        expect(product).toHaveProperty('price', vitamin.price)
                        expect(product).toHaveProperty('description', vitamin.description)
                        return done()
                    }
                })
        })
    })
    
    describe('Create Product POST /products', () => {
        beforeAll((done) => {
            queryInterface.bulkDelete('Products')
                .then(_=> { done() })
                .catch(err => { done(err) })
        })
    
        afterAll((done) => {
            queryInterface.bulkDelete('Products')
                .then(_=> { done() })
                .catch(err => { done(err) })
        })
    
    
        test('Success: Response code 201 returning created product', done => {
            let vitamin = vitamins[0]
            
            request(app)
                .post('/products')
                .send(vitamin)
                .end((err, response) => {
                    if (err) return done(err)
                    else {
                        expect(response.status).toBe(201)
    
                        // console.log(response.body);                    
                        let { product, msg } = response.body       
                        expect(typeof product.id).toBe('number')
                        expect(product).toHaveProperty('name', vitamin.name)
                        expect(product).toHaveProperty('description', vitamin.description)
                        expect(product).toHaveProperty('price', vitamin.price)
                        expect(product).toHaveProperty('stock', vitamin.stock)
                        expect(product).toHaveProperty('category', vitamin.category)
                        expect(product).toHaveProperty('image_url', defaultImgUrl)
                        expect(msg).toBe('Product has been successfully added')
                        return done()
                    }
                })
        })
    })

    describe('Update Product PUT /products/:id', () => {
        beforeAll((done) => {
            Product.destroy({ truncate: true, cascade: true, restartIdentity: true})
                .then( _=> {
                    queryInterface.bulkInsert('Products', vitamins)
                        .then(_=> { done() })
                        .catch(err => { done(err) })
                })
                .catch(err => { done(err) })                      
        })

        afterAll((done) => {
            queryInterface.bulkDelete('Products')
                .then(_=> { done() })
                .catch(err => { done(err) })
        })

        test('Response code 200 product has been successfully updated', done => {
            let updatedVitamin = {
                name: 'Elixir Update',
                description: 'Updated Vitamin description',
                price: 100,
                stock: 100,
                category: 'Multivitamin',
                expiry: '2045-08-17',
                image_url: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/404_File_not_found.png'
            }

            request(app)
                .put('/products/1')
                .send(updatedVitamin)
                .end((err, response) => {
                    if (err) return done(err)
                    else {
                        expect(response.status).toBe(200)
    
                        // console.log(response.body);                    
                        let { product, msg } = response.body
    
                        expect(product).toHaveProperty('id', 1)
                        expect(product).toHaveProperty('name', updatedVitamin.name)
                        expect(product).toHaveProperty('description', updatedVitamin.description)
                        expect(product).toHaveProperty('price', updatedVitamin.price)
                        expect(product).toHaveProperty('stock', updatedVitamin.stock)
                        expect(product).toHaveProperty('category', updatedVitamin.category)
                        expect(product).toHaveProperty('image_url', updatedVitamin.image_url)
                        expect(msg).toBe(`Product ${updatedVitamin.name} has been successfully updated`)
                        return done()
                    }
                })
        })
    })
})


describe('Failed Product operations', () => {
    beforeAll((done) => {
        Product.destroy({ truncate: true, cascade: true, restartIdentity: true})
            .then(_=> { 
                queryInterface.bulkInsert('Products', vitamins)
                    .then(_=> { done() })
                    .catch(err => { done(err) })
            })
            .catch(err => { done(err) })
    })

    afterAll((done) => {
        queryInterface.bulkDelete('Products')
            .then(_=> { done() })
            .catch(err => { done(err) })
    })

    describe('Failed to Create Product POST /products', () => {
        test('Response code 400 product with the same name already exists', done => {
            let vitamin = vitamins[0]
            request(app)
                .post('/products')
                .send(vitamin)
                .end((err, response) => {
                    if (err) return done(err)
                    else {
                        expect(response.status).toBe(400)
    
                        // console.log(response.body);                    
                        let { loc, msg } = response.body

                        expect(loc).toBe('@sequelize')
                        expect(msg).toBe('Product already exists')
                        return done()
                    }
                })
        })

        test('Response code 400 price cannot be less than 0', done => {
            let vitamin = vitamins[0]
            let negativePrice = -45000
            vitamin.name = 'otherVitamin'
            vitamin.price = negativePrice
            request(app)
                .post('/products')
                .send(vitamin)
                .end((err, response) => {
                    if (err) return done(err)
                    else {
                        expect(response.status).toBe(400)
    
                        // console.log(response.body);                    
                        let { loc, msg, type } = response.body

                        expect(type).toBe('Bad Request')
                        expect(loc).toBe('@sequelize')
                        expect(msg).toBe('Price cannot be less than 0')
                        return done()
                    }
                })
        })

        test('Response code 400 stock cannot be less than 0', done => {
            let vitamin = vitamins[1]
            let negativeStock = -45
            vitamin.name = 'someOtherVitamin'
            vitamin.stock = negativeStock            
            request(app)
                .post('/products')
                .send(vitamin)
                .end((err, response) => {
                    if (err) return done(err)
                    else {
                        expect(response.status).toBe(400)
    
                        // console.log(response.body);                    
                        let { loc, msg, type } = response.body

                        expect(type).toBe('Bad Request')
                        expect(loc).toBe('@sequelize')
                        expect(msg).toBe('Stock cannot be less than 0')
                        return done()
                    }
                })
        })

        test('Response code 400 expiry date cannot be set in the past', done => {
            let vitamin = vitamins[1]
            let yesterday = '2020-01-01'
            vitamin.name = 'expiredVitamin'
            vitamin.expiry = yesterday    
            request(app)
                .post('/products')
                .send(vitamin)
                .end((err, response) => {
                    if (err) return done(err)
                    else {
                        expect(response.status).toBe(400)
    
                        // console.log(response.body);                    
                        let { loc, msg, type } = response.body

                        expect(loc).toBe('@sequelize')
                        expect(msg).toBe('Expiry date cannot be set in the past')
                        expect(type).toBe('Bad Request')
                        return done()
                    }
                })
        })

        test('Response code 400 invalid image_url format', done => {
            let vitamin = vitamins[1]
            let invalidUrl = 'http://::'
            vitamin.name = 'noImageVitamin'
            vitamin.image_url = invalidUrl
            vitamin.expiry = '2020-09-09'  
            request(app)
                .post('/products')
                .send(vitamin)
                .end((err, response) => {
                    if (err) return done(err)
                    else {
                        expect(response.status).toBe(400)
    
                        // console.log(response.body);                    
                        let { loc, msg, type } = response.body

                        expect(loc).toBe('@sequelize')
                        expect(msg).toBe('Invalid url format for product image')
                        expect(type).toBe('Bad Request')
                        return done()
                    }
                })
        })
    })

    describe('Failed to Update Product PUT /products/:id', () => {
        let wrongVitamin = {
            name: 'Elixir Update',
            description: 'Updated Vitamin description',
            price: 100,
            stock: 100,
            category: 'Multivitamin',
            expiry: '2020-08-17',
            image_url: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/404_File_not_found.png'
        }

        test('Response code 500 product not availablee', done => {
            let fakeId = 999
            request(app)
                .put(`/products/${fakeId}`)
                .end((err, response) => {
                    if (err) return done(err)
                    else {
                        expect(response.status).toBe(500)
    
                        // console.log(response.body);
                        let { error } = response.body    
                        expect(error).toBe(`Product with id ${fakeId} is not available`)
                        return done()
                    }
                })
        })

        test('Response code 400 expiry date cannot be set in the past', done => {
            let expiredVitamin = wrongVitamin
            expiredVitamin.expiry = '2015-08-09'

            request(app)
                .put('/products/1')
                .send(expiredVitamin)
                .end((err, response) => {
                    if (err) return done(err)
                    else {
                        expect(response.status).toBe(400)
    
                        // console.log(response.body);                    
                        let { msg, loc, type } = response.body
                        
                        expect(type).toBe(`Bad Request`)
                        expect(loc).toBe(`@sequelize`)
                        expect(msg).toBe("Expiry date cannot be set in the past")
                        return done()
                    }
                })
        })

        test('Response code 400 invalid image_url format', done => {            
            let noImageVitamin = wrongVitamin
            noImageVitamin.expiry = '2020-12-12'
            noImageVitamin.image_url = 'hps://upload.wikimedia.org/wiki'

            request(app)
                .put('/products/1')
                .send(noImageVitamin)
                .end((err, response) => {
                    if (err) return done(err)
                    else {
                        expect(response.status).toBe(400)
    
                        // console.log(response.body);                    
                        let { msg, loc, type } = response.body
                        
                        expect(type).toBe(`Bad Request`)
                        expect(loc).toBe(`@sequelize`)
                        expect(msg).toBe("Invalid url format for product image")
                        return done()
                    }
                })
        })
    })

    describe('Failed to Get One Product GET /products/:id', () => {
        test('Response code 500 returning error message', done => {
            let fakeId = 999
            request(app)
                .get(`/products/${fakeId}`)
                .end((err, response) => {
                    if (err) return done(err)
                    else {
                        expect(response.status).toBe(500)
    
                        // console.log(response.body);
                        let { error } = response.body
    
                        expect(error).toBe(`Product with id ${fakeId} is not available`)
                        return done()
                    }
                })
        })
    })
})
