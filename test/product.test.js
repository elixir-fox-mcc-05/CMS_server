const app = require('../app.js')
const request = require('supertest')
const { queryInterface } = require('../models/index.js').sequelize

const vitamins = [
    {
        name: 'Elixir-C',
        description: 'Multivitamin untuk mendukung aktivitas hacking-mu!',
        price: 3000,
        stock: 20,
        category : 'Vitamin',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name: 'Elixir-B',
        description: 'Multivitamin untuk mendukung aktivitas hacking-mu!',
        price: 35000,
        stock: 5,
        category : 'Vitamin',
        createdAt: new Date(),
        updatedAt: new Date()
    }
]

const defaultImgUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/ImageNA.svg/600px-ImageNA.svg.png"

describe('Successful Product operations', () => {
    describe('Get All Products', () => {
        beforeAll((done) => {
            queryInterface.bulkInsert('Products', vitamins)
                .then(_=> { done() })
                .catch(err => { done(err) })
        })
    
        afterAll((done) => {
            queryInterface.bulkDelete('Products')
                .then(_=> { done() })
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
    
    describe('Create Products', () => {
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
                        expect(product).toHaveProperty('description', vitamin.description)
                        expect(product).toHaveProperty('image_url', defaultImgUrl)
                        expect(msg).toBe('Product has been successfully added')
                        return done()
                    }
                })
        })
    })
})

describe('Failed Product operations', () => {
    beforeAll((done) => {
        queryInterface.bulkDelete('Products')
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

    describe('Failed to create Product', () => {
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


})
