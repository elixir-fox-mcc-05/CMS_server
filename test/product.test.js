const request = require('supertest');
const app = require('../app');
const {User, Product, sequelize} = require('../models');
const {queryInterface} = sequelize;
const { generateToken } = require('../helpers/jwt');

beforeAll(async (done) => {
    try {
      const admin = await User.findOne({
        where: {
            email: 'admin@mail.com'
        }
      });    

      token_admin = generateToken({
        id: admin.id,
        email: admin.email,
        role: admin.role,
      });
  
      const customer = await User.findOne({
        where: {
            email: 'customer1@mail.com'
        }
      });
  
      token_client = generateToken({
        id: customer.id,
        email: customer.email,
        role: customer.role,
      });
  
      done();
    } catch (err) {
      done(err);
    }
  })
  
//   afterAll((done) => {
//     queryInterface.bulkDelete('Products', {})
//       .then(_ => {
//         return queryInterface.bulkDelete('Users', {})
//           .then(_=> {
//             done()
//           })
//       })
//       .catch(err => done(err))
//   })
let prodId

describe('Product', () => {
    describe(`CREATE`, () => {
        describe('success create', () => {
            describe('POST /product', () => {
                test('should return name, image_url, price, stock with status 201', done => {
                    const newProduct = {
                        name: 'sepatu',
                        image_url: 'https://cf.shopee.co.id/file/a782a5b475f99b995245eb4b1a6a11f4',
                        price: 300000,
                        stock: 15
                    }
                    request(app)
                        .post('/product')
                        .set('access_token', token_admin)
                        .send(newProduct)
                        .end((err, response) => {
                            if(err){
                                return done(err)
                            } else {
                                prodId = response.body.product.id
                                // console.log("==============================")
                                // console.log(response.body.product.id)
                                expect(response.body.product).toHaveProperty('id', expect.any(Number))
                                expect(response.body.product).toHaveProperty('name', newProduct.name)
                                expect(response.body.product).toHaveProperty('image_url', newProduct.image_url)
                                expect(response.body.product).toHaveProperty('price', newProduct.price)
                                expect(response.body.product).toHaveProperty('stock', newProduct.stock)
                                expect(response.body.product).toHaveProperty('UserId', expect.any(Number))
                                expect(response.status).toBe(201)
                                return done()
                            }
                        })
                })
            })
        })

        describe('fail create', () => {
            describe('POST /product', () => {
                test('should return should return message with status 400 because one of the field is empty', done => {
                    const newProduct = {
                        name: '',
                        image_url: '',
                        price: '',
                        stock: ''
                    }
                    request(app)
                        .post('/product')
                        .set('access_token', token_admin)
                        .send(newProduct)
                        .end((err, response) => {
                            if(err){
                                return done(err)
                            } else {
                                expect(response.status).toBe(400)
                                expect(response.body.error).toContain('please fill this field')
                                return done()
                            }
                        })
                })

                test('should return should return message image_url is not url format with status 400', done => {
                    const newProduct = {
                        name: 'sepatu',
                        image_url: 'qdqwdqwdqwdq',
                        price: 300000,
                        stock: 15
                    }
                    request(app)
                        .post('/product')
                        .set('access_token', token_admin)
                        .send(newProduct)
                        .end((err, response) => {
                            if(err){
                                return done(err)
                            } else {
                                expect(response.status).toBe(400)
                                expect(response.body.error).toContain('please use url format')
                                return done()
                            }
                        })
                })

                test('should return should return message price is not a number type with status 400', done => {
                    const newProduct = {
                        name: 'sepatu',
                        image_url: 'https://cf.shopee.co.id/file/a782a5b475f99b995245eb4b1a6a11f4',
                        price: 'ajsndoasndalsdn',
                        stock: 15
                    }
                    request(app)
                        .post('/product')
                        .set('access_token', token_admin)
                        .send(newProduct)
                        .end((err, response) => {
                            if(err){
                                return done(err)
                            } else {
                                expect(response.status).toBe(400)
                                expect(response.body.error).toContain('please input number format')
                                return done()
                            }
                        })
                })

                test('should return should return message price is not a number type with status 400 ', done => {
                    const newProduct = {
                        name: 'sepatu',
                        image_url: 'https://cf.shopee.co.id/file/a782a5b475f99b995245eb4b1a6a11f4',
                        price: 300000,
                        stock: 'ajsndoasndalsdn'
                    }
                    request(app)
                        .post('/product')
                        .set('access_token', token_admin)
                        .send(newProduct)
                        .end((err, response) => {
                            if(err){
                                return done(err)
                            } else {
                                expect(response.status).toBe(400)
                                expect(response.body.error).toContain('please input number format')
                                return done()
                            }
                        })
                })

                test('should return message please login first with status 401', done => {
                    const newProduct = {
                        name: 'sepatu',
                        image_url: 'https://cf.shopee.co.id/file/a782a5b475f99b995245eb4b1a6a11f4',
                        price: 300000,
                        stock: 15
                    }
                    request(app)
                        .post('/product')
                        .send(newProduct)
                        .end((err, response) => {
                            if(err){
                                return done(err)
                            } else {
                                expect(response.status).toBe(401)
                                expect(response.body.error).toContain('please login first')
                                return done()
                            }
                        })
                })
            })
        })
    })

    describe('READ', () => {
        describe('success read', () => {
            describe('GET /product', () => {
                test('should return all product with status 200', done => {
                    request(app)
                        .get('/product')
                        .set('access_token', token_admin)
                        .end((err, response) => {
                            if(err){
                                return done(err)
                            } else {
                                expect(response.body).toHaveProperty('products', expect.any(Array))
                                return done()
                            }
                        })
                })
            })
        })

        describe('success read', () => {
            describe('GET /product', () => {
                test('should return all product with status 200', done => {
                    request(app)
                        .get('/product')
                        // .set('access_token', token_admin)
                        .end((err, response) => {
                            if(err){
                                return done(err)
                            } else {
                                expect(response.status).toBe(200)
                                expect(response.body).toHaveProperty('products', expect.any(Array))
                                return done()
                            }
                        })
                })
            })
        })
    })

    describe('UPDATE', () => {
        describe('success update', () => {
            describe('PUT /product/:id', () => {
                test('should return all product with status 200', done => {
                    const updateProduct = {
                        name: 'puma',
                        image_url: 'https://dynamic.zacdn.com/ltavgF7U8adDwwne5o3Q7VItuhk=/fit-in/346x500/filters:quality(90):fill(ffffff)/http://static.id.zalora.net/p/precise-1547-3274061-1.jpg',
                        price: 750000,
                        stock: 15
                    }
                    request(app)
                        .put(`/product/${prodId}`)
                        .set('access_token', token_admin)
                        .send(updateProduct)
                        .end((err, response) => {
                            if(err){
                                return done(err)
                            } else {
                                expect(response.status).toBe(200)
                                // console.log(response.body)
                                expect(response.body.product).toHaveProperty('id', expect.any(Number))
                                expect(response.body.product).toHaveProperty('name', updateProduct.name)
                                expect(response.body.product).toHaveProperty('image_url', updateProduct.image_url)
                                expect(response.body.product).toHaveProperty('price', updateProduct.price)
                                expect(response.body.product).toHaveProperty('stock', updateProduct.stock)
                                expect(response.body.product).toHaveProperty('UserId', expect.any(Number))
                                return done()
                            }
                        })
                })
            })
        })

        describe('fail update', () => {
            describe('PUT /product', () => {
                test('should return message with status 404 because product not found', done => {
                    const updateProduct = {
                        name: 'puma',
                        image_url: 'https://dynamic.zacdn.com/ltavgF7U8adDwwne5o3Q7VItuhk=/fit-in/346x500/filters:quality(90):fill(ffffff)/http://static.id.zalora.net/p/precise-1547-3274061-1.jpg',
                        price: 750000,
                        stock: 15
                    }
                    request(app)
                        .put(`/product/0`)
                        .set('access_token', token_admin)
                        .send(updateProduct)
                        .end((err, response) => {
                            if(err){
                                return done(err)
                            } else {
                                expect(response.status).toBe(404)
                                expect(response.body.error).toContain('product not found')
                                return done()
                            }
                        })
                })

                test('should return message with status 401 because unauthorized', done => {
                    const updateProduct = {
                        name: 'puma',
                        image_url: 'https://dynamic.zacdn.com/ltavgF7U8adDwwne5o3Q7VItuhk=/fit-in/346x500/filters:quality(90):fill(ffffff)/http://static.id.zalora.net/p/precise-1547-3274061-1.jpg',
                        price: 750000,
                        stock: 15
                    }
                    request(app)
                        .put(`/product/6`)
                        .set('access_token', token_client)
                        .send(updateProduct)
                        .end((err, response) => {
                            if(err){
                                return done(err)
                            } else {
                                expect(response.status).toBe(401)
                                expect(response.body.error).toContain('unauthorized')
                                return done()
                            }
                        })
                })

                test('should return message with status 404 because data not found', done => {
                    const updateProduct = {
                        name: 'puma',
                        image_url: 'https://dynamic.zacdn.com/ltavgF7U8adDwwne5o3Q7VItuhk=/fit-in/346x500/filters:quality(90):fill(ffffff)/http://static.id.zalora.net/p/precise-1547-3274061-1.jpg',
                        price: 750000,
                        stock: 15
                    }
                    request(app)
                        .put(`/product/0`)
                        .send(updateProduct)
                        .end((err, response) => {
                            if(err){
                                return done(err)
                            } else {
                                expect(response.status).toBe(401)
                                expect(response.body.error).toContain('please login first')
                                return done()
                            }
                        })
                })

                test('should return message with status 400 because there is an empty field', done => {
                    const updateProduct = {
                        name: '',
                        image_url: '',
                        price: '',
                        stock: ''
                    }
                    request(app)
                        .put(`/product/${prodId}`)
                        .set('access_token', token_admin)
                        .send(updateProduct)
                        .end((err, response) => {
                            if(err){
                                return done(err)
                            } else {
                                expect(response.status).toBe(400)
                                expect(response.body.error).toContain('please fill this field')
                                return done()
                            }
                        })
                })

                test('should return message with status 400 because input for image_url is not an url', done => {
                    const updateProduct = {
                        name: 'puma',
                        image_url: 'asdasd',
                        price: 750000,
                        stock: 15
                    }
                    request(app)
                        .put(`/product/${prodId}`)
                        .set('access_token', token_admin)
                        .send(updateProduct)
                        .end((err, response) => {
                            if(err){
                                return done(err)
                            } else {
                                expect(response.status).toBe(400)
                                expect(response.body.error).toContain('please use url format')
                                return done()
                            }
                        })
                })

                test('should return message with status 400 because input type is for price and stock is not a number', done => {
                    const updateProduct = {
                        name: 'puma',
                        image_url: 'https://dynamic.zacdn.com/ltavgF7U8adDwwne5o3Q7VItuhk=/fit-in/346x500/filters:quality(90):fill(ffffff)/http://static.id.zalora.net/p/precise-1547-3274061-1.jpg',
                        price: 'asda',
                        stock: 'asa'
                    }
                    request(app)
                        .put(`/product/${prodId}`)
                        .set('access_token', token_admin)
                        .send(updateProduct)
                        .end((err, response) => {
                            if(err){
                                return done(err)
                            } else {
                                expect(response.status).toBe(400)
                                expect(response.body.error).toContain('please input number format')
                                return done()
                            }
                        })
                })
            })
        })

    })

    describe('DELETE', () => {
        describe('success delete', () => {
            describe('DELETE /product', () => {
                test('should success message with status 200', done => {
                    request(app)
                        .delete(`/product/${prodId}`)
                        .set('access_token', token_admin)
                        .end((err, response) => {
                            if(err){
                                return done(err)
                            } else {
                                expect(response.status).toBe(200)
                                expect(response.body.success).toContain(`success delete product with id ${prodId}`)
                                return done()
                            }
                        })
                })
            })
        })

        describe('fail delete', () => {
            describe('DELETE /product', () => {
                test('should error message with status 404 because product not found', done => {
                    request(app)
                        .delete(`/product/0`)
                        .set('access_token', token_admin)
                        .end((err, response) => {
                            if(err){
                                return done(err)
                            } else {
                                expect(response.status).toBe(404)
                                expect(response.body.error).toContain('product not found')
                                return done()
                            }
                        })
                })

                test('should error message with status 401 because unauthorized', done => {
                    request(app)
                        .delete(`/product/6`)
                        .set('access_token', token_client)
                        .end((err, response) => {
                            if(err){
                                return done(err)
                            } else {
                                expect(response.status).toBe(401)
                                expect(response.body.error).toContain('unauthorized')
                                return done()
                            }
                        })
                })
            })
        })

    })
})