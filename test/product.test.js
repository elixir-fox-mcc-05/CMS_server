const app = require('../app')
const request = require('supertest')
const {sequelize} = require('../models')
const {queryInterface} = sequelize
const { generatePassword } = require('../helpers/bcrypt.js')
const { generateToken } = require('../helpers/jwt.js')

const Products = require('../product.json').map(product => {
    product.createdAt = new Date ()
    product.updatedAt = new Date ()
    return product;
})

const Users = require('../admin.json').map(user => {
    user.createdAt = new Date ()
    user.updatedAt = new Date ()
    user.password = generatePassword(user.password)
    return user;
})
let prodId;
let token;

afterAll(done => {
    queryInterface.bulkDelete('Products')
        .then(_=> {
            return queryInterface.bulkDelete('Users')
        })    
        .then(_ => {
            done()
        })
        .catch(err => {
            done(err)
        })
})

describe('Product service', () => {
    describe('Success : ', () => {
        describe('get Product by id Product ', () => {
            beforeAll(done => {
                jest.setTimeout(10000);
                queryInterface.bulkInsert('Products', Products, { returning : true })
                    .then(response => {
                        prodId = response[0].id
                        // console.log(prodId)
                        return queryInterface.bulkInsert('Users', Users, { returning : true })
                    }) 
                    .then(result => {
                        token = generateToken({
                            id : result[0].id,
                            email : result[0].email
                        })
                        done()
                    })
                    .catch(err => {
                        done(err)
                })
            
            })

            test('should return one Product by id', done => {
                request(app)
                    .get('/products/' + prodId)
                    .end((err, response) => {
                        if(err) {
                            return done(err)
                        } else {
                            expect(response.status).toBe(200)
                            // console.log(response.body)
                            let product = response.body.products
                            expect(product).toHaveProperty('id', expect.any(Number))
                            expect(product).toHaveProperty('name', product.name)
                            expect(product).toHaveProperty('price', product.price)
                            expect(product).toHaveProperty('stock', product.stock)
                            expect(product).toHaveProperty('imageUrl', product.imageUrl)
                            return done()
                        }
                    })
            })
        })
    })

    describe('get all product', () => {
        test('should retrun all product', done => {
            request(app)
                .get('/products')
                .end((err, response) => {
                    if(err){
                        return done(err)
                    } else {
                        // console.log(prodId, 'ini product id')
                        expect(response.status).toBe(200)
                        // console.log(response.body.products)
                        expect(response.body).toHaveProperty('products')
                        return done()
                    }
                })
        })
    })

    describe('Create a Product', () => {
        test('should return a new Product with Json', done => {
            const newProduct = {
                name : "Yeezy Boost 350 V2 Cloud White (Non-Reflective)",
                price : 6250000,
                stock : 6,
                imageUrl : "https://d38t85204sb0x0.cloudfront.net/eyJidWNrZXQiOiJraWNrYXZlbnVlLWFzc2V0cyIsImtleSI6InByb2R1Y3RzLzQ5MjkvMTg3NDliMWUtOGMzMS00ODhjLTk5MDAtZmJlYjVkN2ZjMTdhLmpwZWciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjUwMH19fQ=="
            }
            request(app)
                .post('/products')
                .send(newProduct)
                .set('token', token)
                .end((err, response) => {
                    if(err){
                        return done(err)
                    }else{
                        // console.log(response)
                        expect(response.status).toBe(201)
                        let product = response.body.products
                        expect(product).toHaveProperty('id', expect.any(Number))
                        expect(product).toHaveProperty('name', product.name)
                        expect(product).toHaveProperty('price', product.price)
                        expect(product).toHaveProperty('stock', product.stock)
                        expect(product).toHaveProperty('imageUrl', product.imageUrl)
                        return done()
                    }
                })
        })
    })
    
    describe('Update a Product', () => {
        test('should return a updated Product with json', done => {
            let updatedProduct = {
                name : "Yeezy Boost 350 V2 Cloud White (Non-Reflective)",
                price : 6250000,
                stock : 6,
                imageUrl : "https://d38t85204sb0x0.cloudfront.net/eyJidWNrZXQiOiJraWNrYXZlbnVlLWFzc2V0cyIsImtleSI6InByb2R1Y3RzLzQ5MjkvMTg3NDliMWUtOGMzMS00ODhjLTk5MDAtZmJlYjVkN2ZjMTdhLmpwZWciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjUwMH19fQ=="
            }

            request(app)
                .put('/products/' + prodId)
                .send(updatedProduct)
                .set('token', token)
                .end((err, response) => {
                    if(err) {
                        return done(err)
                    }else{
                        expect(response.status).toBe(201)
                        return done()
                    }
                })
        })
    })

    describe('Delete a Product', () => {
        test('Should return a deleted Product with json', done => {
            request(app)
                .delete('/products/' + prodId)
                .set('token', token)
                .end((err, response) => {
                    if(err) {
                        return done(err)
                    } else {
                        console.log(prodId)
                        expect(response.status).toBe(200)
                        return done()
                    }
                })
        })
    })

    describe('Failed : ', () => {
        describe('failed get by id Product ', () => {
            test('should return message Product not found with code 404', done => {
                request(app)
                    .get('/products/' + (prodId + 20))
                    .end((err, response) => {
                        if(err) {
                            return done(err)
                        } else {
                            expect(response.status).toBe(404)
                            expect(response.body.error).toContain('Product not found')
                            return done()
                        }
                    })
            })
        })

        describe('failed get all Product ', () => {
            test('should return message Product not found with code 404', done => {
                request(app)
                    .get('/products/' + (prodId + 20))
                    .end((err, response) => {
                        if(err) {
                            return done(err)
                        } else {
                            expect(response.status).toBe(404)
                            expect(response.body.error).toContain('Product not found')
                            return done()
                        }
                    })
            })
        })

        describe('failed created a Product ', () => {
            test('should return message Product not found with code 400', done => {
                request(app)
                    .post('/products/')
                    .set('token', token)
                    .end((err, response) => {
                        if(err) {
                            return done(err)
                        } else {
                            expect(response.status).toBe(400)
                            // console.log(response.body.error)
                            expect(response.body.error).toContain('notNull Violation: product name is required')
                            return done()
                        }
                    })
            })
        })

        describe('failed updated a Product ', () => {
            test('should return message Product not found with code 404', done => {
                let updateProduct = {
                    name : '',
                    price : 4002000,
                    stock : 1,
                    imageUrl : "https://d38t85204sb0x0.cloudfront.net/eyJidWNrZXQiOiJraWNrYXZlbnVlLWFzc2V0cyIsImtleSI6InByb2R1Y3RzLzQ5MjkvNGEyMTZlNGUtNjA5NS00ZDY3LTkxNGYtZDZlMDI5ZWI5NzZmLmpwZWciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjUwMH19fQ=="
                }
                request(app)
                    .put('/products/' + (prodId + 20))
                    .set('token', token)
                    .send(updateProduct)
                    .end((err, response) => {
                        if(err) {
                            return done(err)
                        } else {
                            expect(response.status).toBe(400)
                            expect(response.body.error).toContain('Validation error: Product name cannot be Empty')
                            return done()
                        }
                    })
            })
        })

        describe('failed updated a Product ', () => {
            test('should return message Product not found with code 404', done => {
                let updateProduct = {
                    name : 'Yeezy Boost 350 V2 Cloud White (Non-Reflective)',
                    price : 4002000,
                    stock : 0,
                    imageUrl : "https://d38t85204sb0x0.cloudfront.net/eyJidWNrZXQiOiJraWNrYXZlbnVlLWFzc2V0cyIsImtleSI6InByb2R1Y3RzLzQ5MjkvNGEyMTZlNGUtNjA5NS00ZDY3LTkxNGYtZDZlMDI5ZWI5NzZmLmpwZWciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjUwMH19fQ=="
                }
                request(app)
                    .put('/products/' + (prodId + 20))
                    .set('token', token)
                    .send(updateProduct)
                    .end((err, response) => {
                        if(err) {
                            return done(err)
                        } else {
                            expect(response.status).toBe(400)
                            // console.log(response.body.error)
                            expect(response.body.error).toContain('Validation error: Validation min on stock failed')
                            return done()
                        }
                    })
            })
        })
    })

    describe('Authentication test :', () => {
        describe('fail authentication : ', () => {
            test('should return error with code 400', done => {
                request(app)
                    .post('/products/')
                    .end((err, response) => {
                        if(err) {
                            return done(err)
                        }else{
                            expect(response.status).toBe(400)
                            expect(response.body.error).toContain('Please Login First')
                            return done()
                        }
                    })
            })
        })
    })

    describe('Authorization test :', () => {
        describe('fail authorization : ', () => {
            test('should return error with code 400', done => {
                request(app)
                    .post('/products/')
                    .end((err, response) => {
                        if(err) {
                            return done(err)
                        }else{
                            expect(response.status).toBe(400)
                            expect(response.body.error).toContain('Please Login First')
                            return done()
                        }
                    })
            })
        })
    })

})

