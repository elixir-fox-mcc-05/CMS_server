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

        describe('fail read', () => {
            describe('GET /product', () => {
                test('should return all product with status 401', done => {
                    request(app)
                        .get('/product')
                        // .set('access_token', token_admin)
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

    describe('UPDATE', () => {
        describe('success update', () => {
            describe('PUT /product', () => {
                test('should return all product with status 200', done => {
                    const updateProduct = {
                        
                    }
                })
            })
        })

    //     describe('fail update', () => {
    //         describe('PUT /product', () => {
    //             test('should return all product with status 200', done => {
                
    //             })
    //         })
    //     })

    })

    // describe('DELETE', () => {
    //     describe('success delete', () => {
    //         describe('DELETE /product', () => {
    //             test('should return all product with status 200', done => {
                
    //             })
    //         })
    //     })

    //     describe('fail delete', () => {
    //         describe('DELETE /product', () => {
    //             test('should return all product with status 200', done => {
                
    //             })
    //         })
    //     })

    // })
})