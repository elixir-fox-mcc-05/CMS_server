const app = require('../app');
const request = require('supertest');
const { sequelize } = require('../models/index');
const { queryInterface } = sequelize;
const { generatePassword } = require('../helpers/bcryptjs');

afterAll((done) => {
    queryInterface.bulkDelete(`Products`)
        .then(() => {
            console.log(`DB clean up table Products`)
            return queryInterface.bulkDelete(`Users`)
        })
        .then(() => {
            console.log(`DB clean up table Users`)
            done()
        })
        .catch(err => {
            done(err)
        })
})

////dummy product
const dummyProduct = [{
    id: 1,
    name: `dummy product 1`,
    description: `dummy prod 1`,
    image_url: `dummy img 1`,
    price: 100,
    stock: 1,
    createdAt: new Date(),
    updatedAt: new Date()
}, {
    id: 2,
    name: `dummy product 2`,
    description: `dummy prod 2`,
    image_url: `dummy img 2`,
    price: 200,
    stock: 2,
    createdAt: new Date(),
    updatedAt: new Date()
}]
///// dummy user for authentication
const adminUser = {
    email: `admin@gmail.com`,
    password: `admin`
}
let loginToken = null;
beforeAll((done) => {               
    const hashPassword = generatePassword(adminUser.password)
    queryInterface.bulkInsert(`Users`, [{
        email: adminUser.email,
        password: hashPassword,
        createdAt: new Date(),
        updatedAt: new Date()
    }])
        .then(() => {
            console.log(`User created: ${adminUser.email}`)
            return queryInterface.bulkInsert(`Products`, dummyProduct)
        })
        .then(() =>{
            console.log(`product list created`)
            request(app)
                .post('/users/login')
                .send(adminUser)
                .end((err, res) => {
                    if(err) {
                        return done(err)
                    }
                    else {
                        loginToken = res.body.token;
                        return done()
                    }
                })
        })
        .catch(err => (
            done(err)
        ))    
})

describe(`Product feature`, () => {
    //// Create
    describe(`POST /products/`, () => {
        describe(`'Success create product`, () => {
            test(`Should return object with name and default value description, image_url, price, stock and status 201 `, (done) => {
                const productInput = {
                    name: `product 1`,
                    description: ``,
                    image_url: ``,
                    price: '',
                    stock: ''
                }
                request(app)
                    .post('/products/')
                    .set({'token':loginToken})
                    .send(productInput)
                    .end((err, res) => {
                        if(err){
                            return done(err);
                        }
                        else {
                            expect(res.status).toBe(201);
                            expect(res.body.product).toHaveProperty('id', expect.any(Number));
                            expect(res.body.product).toHaveProperty(`name`, productInput.name);
                            expect(res.body.product).toHaveProperty(`description`, `No description`);
                            expect(res.body.product).toHaveProperty(`image_url`, `No image available`);
                            expect(res.body.product).toHaveProperty(`price`, 0);
                            expect(res.body.product).toHaveProperty(`stock`, 0);
                            return done()
                        }
                    })                    
            })
            test(`Should return object with name, description, image_url, price, stock and status 201 `, (done) => {
                const productInput = {
                    name: `product 2`,
                    description: `desc prod 2`,
                    image_url: `img prod 2`,
                    price: 2000,
                    stock: 2
                }
                request(app)
                    .post('/products/')
                    .set({'token':loginToken})
                    .send(productInput)
                    .end((err, res) => {
                        if(err){
                            return done(err);
                        }
                        else {
                            expect(res.status).toBe(201);
                            expect(res.body.product).toHaveProperty('id', expect.any(Number));
                            expect(res.body.product).toHaveProperty(`name`, productInput.name);
                            expect(res.body.product).toHaveProperty(`description`, productInput.description);
                            expect(res.body.product).toHaveProperty(`image_url`, productInput.image_url);
                            expect(res.body.product).toHaveProperty(`price`, productInput.price);
                            expect(res.body.product).toHaveProperty(`stock`, productInput.stock);
                            return done()
                        }
                    })                    
            })
        })
        describe(`'Error create product`, () => {
            test(`Should return error with status 401 because no token in headers`, (done) => {
               const errors = [
                    {
                        message: "Unauthorized. Please login first"
                    },
               ]
                request(app)
                    .post('/products/')
                    .send()
                    .end((err, res) => {
                        if(err){
                            return done(err);
                        }
                        else {
                            expect(res.status).toBe(401);
                            expect(res.body).toHaveProperty('errors', errors);                           
                            return done()
                        }
                    })                    
            })
            test(`Should return error with status 400 because name and/or description and/or image_url is null`, (done) => {
                const errors = [
                    {
                        "message": "Product.name cannot be null"
                    },
                    {
                        "message": "Product.description cannot be null"
                    },
                    {
                        "message": "Product.image_url cannot be null"
                    }
                ]
                request(app)
                    .post('/products/')
                    .set({'token':loginToken})
                    .send()
                    .end((err, res) => {
                        if(err){
                            return done(err);
                        }
                        else {
                            expect(res.status).toBe(400);
                            expect(res.body).toHaveProperty('errors', errors);                           
                            return done()
                        }
                    })                    
            })
            test(`Should return error with status 400 because missing name`, (done) => {
                const errors = [
                    {
                        "message": "Name must be filled"
                    },
                    {
                        "message": "Name must be 1-60 characters long "
                    }
                ]
                const productInput = {
                    name: ``,
                    description: ``,
                    image_url: ``,
                    price: '',
                    stock: ''
                }
                request(app)
                    .post('/products/')
                    .set({'token':loginToken})
                    .send(productInput)
                    .end((err, res) => {
                        if(err){
                            return done(err);
                        }
                        else {
                            expect(res.status).toBe(400);
                            expect(res.body).toHaveProperty('errors', errors);                           
                            return done()
                        }
                    })                    
            })
            test(`Should return error with status 400 because name more than 60 characters`, (done) => {
                const errors = [
                    {
                        "message": "Name must be 1-60 characters long "
                    }
                ]
                const productInput = {
                    name: `this name more than 60 characters this name more than 60 characters`,
                    description: `desc prod 2`,
                    image_url: `img prod 2`,
                    price: 2000,
                    stock: 2
                }
                request(app)
                    .post('/products/')
                    .set({'token':loginToken})
                    .send(productInput)
                    .end((err, res) => {
                        if(err){
                            return done(err);
                        }
                        else {
                            expect(res.status).toBe(400);
                            expect(res.body).toHaveProperty('errors', errors);                           
                            return done()
                        }
                    })                    
            })
            test(`Should return error with status 400 because same name`, (done) => {
                const errors = [
                    {
                        "message": "Product already exist"
                    }
                ]
                const productInput = {
                    name: dummyProduct[0].name,
                    description: '',
                    image_url: ``,
                    price: 100,
                    stock: 1,
                }
                request(app)
                    .post('/products/')
                    .set({'token':loginToken})
                    .send(productInput)
                    .end((err, res) => {
                        if(err){
                            return done(err);
                        }
                        else {
                            expect(res.status).toBe(400);
                            expect(res.body).toHaveProperty('errors', errors);                           
                            return done()
                        }
                    })                    
            })
            test(`Should return error with status 400 because price and/or stock is null`, (done) => {
                const errors = [
                    {
                        "message": "Input to Database error"
                    }
                ]
                const productInput = {
                    name: `error name`,
                    description: `desc error`,
                    image_url: `img error`,
                }
                request(app)
                    .post('/products/')
                    .set({'token':loginToken})
                    .send(productInput)
                    .end((err, res) => {
                        if(err){
                            return done(err);
                        }
                        else {
                            expect(res.status).toBe(400);
                            expect(res.body).toHaveProperty('errors', errors);                           
                            return done()
                        }
                    })                    
            })
            test(`Should return error with status 400 because price and/or stock in string`, (done) => {
                const errors = [
                    {
                        "message": "Input to Database error"
                    }
                ]
                const productInput = {
                    name: `error name`,
                    description: `desc error`,
                    image_url: `img error`,
                    price: 'random',
                    stock: 'text',
                }
                request(app)
                    .post('/products/')
                    .set({'token':loginToken})
                    .send(productInput)
                    .end((err, res) => {
                        if(err){
                            return done(err);
                        }
                        else {
                            expect(res.status).toBe(400);
                            expect(res.body).toHaveProperty('errors', errors);                           
                            return done()
                        }
                    })                    
            })
            test(`Should return error with status 400 because price less than 0`, (done) => {
                const errors = [
                    {
                        "message": "Price must be equal to or more than 0"
                    }
                ]
                const productInput = {
                    name: `error name`,
                    description: `desc error`,
                    image_url: `img error`,
                    price: -1,
                    stock: 0
                }
                request(app)
                    .post('/products/')
                    .set({'token':loginToken})
                    .send(productInput)
                    .end((err, res) => {
                        if(err){
                            return done(err);
                        }
                        else {
                            expect(res.status).toBe(400);
                            expect(res.body).toHaveProperty('errors', errors);                           
                            return done()
                        }
                    })                    
            })
            test(`Should return error with status 400 because stock less than 0`, (done) => {
                const errors = [
                    {
                        "message": "Stock must be equal to or more than 0"
                    }
                ]
                const productInput = {
                    name: `error name`,
                    description: `desc error`,
                    image_url: `img error`,
                    price: 0,
                    stock: -1
                }
                request(app)
                    .post('/products/')
                    .set({'token':loginToken})
                    .send(productInput)
                    .end((err, res) => {
                        if(err){
                            return done(err);
                        }
                        else {
                            expect(res.status).toBe(400);
                            expect(res.body).toHaveProperty('errors', errors);                           
                            return done()
                        }
                    })              
            })
            test(`Should return error with status 400 because price and stock less than 0`, (done) => {
                const errors = [
                    {
                        "message": "Price must be equal to or more than 0"
                    },
                    {
                        "message": "Stock must be equal to or more than 0"
                    }
                ]
                const productInput = {
                    name: `error name`,
                    description: `desc error`,
                    image_url: `img error`,
                    price: -1,
                    stock: -1
                }
                request(app)
                    .post('/products/')
                    .set({'token':loginToken})
                    .send(productInput)
                    .end((err, res) => {
                        if(err){
                            return done(err);
                        }
                        else {
                            expect(res.status).toBe(400);
                            expect(res.body).toHaveProperty('errors', errors);                           
                            return done()
                        }
                    })              
            })
        })
    })
   
    ////// Read all
    describe(`GET /products/`, () => {
        describe(`Success read all product`, () => {
            test(`Should return array of object with name, description, image_url, price, stock from all product and status 200`, (done) => {
                request(app)
                    .get('/products/')
                    .set({'token':loginToken})
                    .end((err, res) => {
                        if(err){
                            return done(err)
                        }
                        else {
                            expect(res.status).toBe(200);
                            expect(res.body.products[res.body.products.length-2].name).toContain(dummyProduct[0].name)
                            expect(res.body.products[res.body.products.length-1].name).toContain(dummyProduct[1].name)
                            return done()
                        }
                    })
            })
        })
        describe(`Error read all product`, () => {
            test(`Should return error with status 401 because no token in headers`, (done) => {
                const errors = [
                     {
                         message: "Unauthorized. Please login first"
                     },
                ]
                 request(app)
                     .get('/products/')
                     .end((err, res) => {
                         if(err){
                             return done(err);
                         }
                         else {
                             expect(res.status).toBe(401);
                             expect(res.body).toHaveProperty('errors', errors);                           
                             return done()
                         }
                     })                    
             })
        })
    })

    ///// Update by productId
    describe(`PUT /products/:productId`, () => {
        describe(`Success update product`, () => {
            test(`Should return object with update message and updated name and default value description, image_url, price, stock from updated product and status 200`, (done) => {
                const productId = dummyProduct[0].id;
                const productInput = {
                    name: `updated 1`,
                    description: '',
                    image_url: '',
                    price: '',
                    stock: '',
                }
                request(app)
                    .put(`/products/${productId}`)
                    .set({'token':loginToken})
                    .send(productInput)
                    .end((err, res) => {
                        if(err){
                            return done(err)
                        }
                        else {
                            expect(res.status).toBe(200);
                            expect(res.body.product).toHaveProperty('id', productId);
                            expect(res.body.product).toHaveProperty('name', productInput.name);
                            expect(res.body.product).toHaveProperty(`description`, `No description`);
                            expect(res.body.product).toHaveProperty(`image_url`, `No image available`);
                            expect(res.body.product).toHaveProperty(`price`, 0);
                            expect(res.body.product).toHaveProperty(`stock`, 0);
                            expect(res.body).toHaveProperty('message', `Product id ${productId} update`)
                            return done()
                        }
                    })
            })
            test(`Should return object with updated name, description, image_url, price, stock, update message from updated product and status 200`, (done) => {
                const productId = dummyProduct[0].id;
                const productInput = {
                    name: `updated 1`,
                    description: 'desc updt 1',
                    image_url: 'img updt 1',
                    price: 500,
                    stock: 5,
                }
                request(app)
                    .put(`/products/${productId}`)
                    .set({'token':loginToken})
                    .send(productInput)
                    .end((err, res) => {
                        if(err){
                            return done(err)
                        }
                        else {
                            expect(res.status).toBe(200);
                            expect(res.body.product).toHaveProperty('id', productId);
                            expect(res.body.product).toHaveProperty('name', productInput.name);
                            expect(res.body.product).toHaveProperty(`description`, productInput.description);
                            expect(res.body.product).toHaveProperty(`image_url`, productInput.image_url);
                            expect(res.body.product).toHaveProperty(`price`, productInput.price);
                            expect(res.body.product).toHaveProperty(`stock`, productInput.stock);
                            expect(res.body).toHaveProperty('message', `Product id ${productId} update`)
                            return done()
                        }
                    })
            })
            test(`Should return object with no update in name, description, image_url, price, stock, update message and status 200`, (done) => {
                const productId = dummyProduct[0].id;
                const productInput = {
                    name: dummyProduct[productId-1].name,
                    description: dummyProduct[productId-1].description,
                    image_url: dummyProduct[productId-1].image_url,
                    price: dummyProduct[productId-1].price,
                    stock: dummyProduct[productId-1].stock,
                }
                request(app)
                    .put(`/products/${productId}`)
                    .set({'token':loginToken})
                    .send(productInput)
                    .end((err, res) => {
                        if(err){
                            return done(err)
                        }
                        else {
                            expect(res.status).toBe(200);
                            expect(res.body.product).toHaveProperty('id', productId);
                            expect(res.body.product).toHaveProperty('name', dummyProduct[productId-1].name);
                            expect(res.body.product).toHaveProperty(`description`, dummyProduct[productId-1].description);
                            expect(res.body.product).toHaveProperty(`image_url`, dummyProduct[productId-1].image_url);
                            expect(res.body.product).toHaveProperty(`price`, dummyProduct[productId-1].price);
                            expect(res.body.product).toHaveProperty(`stock`, dummyProduct[productId-1].stock);
                            expect(res.body).toHaveProperty('message', `Product id ${productId} update`)
                            return done()
                        }
                    })
            })
        })
        describe(`'Error update product by productId`, () => {
            test(`Should return error with status 401 because no token in headers`, (done) => {
                const productId = dummyProduct[0].id;
                const errors = [
                    {
                        message: "Unauthorized. Please login first"
                    },
               ]
                request(app)
                    .put(`/products/${productId}`)
                    .send()
                    .end((err, res) => {
                        if(err){
                            return done(err);
                        }
                        else {
                            expect(res.status).toBe(401);
                            expect(res.body).toHaveProperty('errors', errors);                           
                            return done()
                        }
                    })                    
            })
            test(`Should return error with status 404 because product by productId not found`, (done) => {
                const productId = 9;
                const errors = [
                    {
                        "message": `Product with id ${productId} not found`
                    }
                ]
                const productInput = {
                    name: `updated`,
                    description: ``,
                    image_url: ``,
                    price: '',
                    stock: ''
                }
                request(app)
                    .put(`/products/${productId}`)
                    .set({'token':loginToken})
                    .send(productInput)
                    .end((err, res) => {
                        if(err){
                            return done(err);
                        }
                        else {
                            expect(res.status).toBe(404);
                            expect(res.body).toHaveProperty('errors', errors);                           
                            return done()
                        }
                    })                    
            })
            test(`Should return error with status 400 because missing name`, (done) => {
                const productId = dummyProduct[0].id;
                const errors = [
                    {
                        "message": "Name must be filled"
                    },
                    {
                        "message": "Name must be 1-60 characters long "
                    }
                ]
                const productInput = {
                    name: ``,
                    description: ``,
                    image_url: ``,
                    price: '',
                    stock: ''
                }
                request(app)
                    .put(`/products/${productId}`)
                    .set({'token':loginToken})
                    .send(productInput)
                    .end((err, res) => {
                        if(err){
                            return done(err);
                        }
                        else {
                            expect(res.status).toBe(400);
                            expect(res.body).toHaveProperty('errors', errors);                           
                            return done()
                        }
                    })                    
            })
            test(`Should return error with status 400 because name more than 60 characters`, (done) => {
                const productId = dummyProduct[0].id;
                const errors = [
                    {
                        "message": "Name must be 1-60 characters long "
                    }
                ]
                const productInput = {
                    name: `this name more than 60 characters this name more than 60 characters`,
                    description: ``,
                    image_url: ``,
                    price: '',
                    stock: ''
                }
                request(app)
                    .put(`/products/${productId}`)
                    .set({'token':loginToken})
                    .send(productInput)
                    .end((err, res) => {
                        if(err){
                            return done(err);
                        }
                        else {
                            expect(res.status).toBe(400);
                            expect(res.body).toHaveProperty('errors', errors);                           
                            return done()
                        }
                    })                    
            })
            test(`Should return error with status 400 because same name`, (done) => {
                const productId = dummyProduct[0].id;
                const errors = [
                    {
                        "message": "Product already exist"
                    }
                ]
                const productInput = {
                    name: dummyProduct[1].name,
                    description: '',
                    image_url: ``,
                    price: '',
                    stock: '',
                }
                request(app)
                    .put(`/products/${productId}`)
                    .set({'token':loginToken})
                    .send(productInput)
                    .end((err, res) => {
                        if(err){
                            return done(err);
                        }
                        else {
                            expect(res.status).toBe(400);
                            expect(res.body).toHaveProperty('errors', errors);                           
                            return done()
                        }
                    })                    
            })
            test(`Should return error with status 400 because price and/or stock is null`, (done) => {
                const productId = dummyProduct[0].id;
                const errors = [
                    {
                        "message": "Input to Database error"
                    }
                ]
                request(app)
                    .put(`/products/${productId}`)
                    .set({'token':loginToken})
                    .send()
                    .end((err, res) => {
                        if(err){
                            return done(err);
                        }
                        else {
                            expect(res.status).toBe(400);
                            expect(res.body).toHaveProperty('errors', errors);                           
                            return done()
                        }
                    })                    
            })
            test(`Should return error with status 400 because price and/or stock in string`, (done) => {
                const productId = dummyProduct[0].id;
                const errors = [
                    {
                        "message": "Input to Database error"
                    }
                ]
                const productInput = {
                    name: `error name`,
                    description: `desc error`,
                    image_url: `img error`,
                    price: 'random',
                    stock: 'text',
                }
                request(app)
                    .put(`/products/${productId}`)
                    .set({'token':loginToken})
                    .send(productInput)
                    .end((err, res) => {
                        if(err){
                            return done(err);
                        }
                        else {
                            expect(res.status).toBe(400);
                            expect(res.body).toHaveProperty('errors', errors);                           
                            return done()
                        }
                    })                    
            })
            test(`Should return error with status 400 because price less than 0`, (done) => {
                const productId = dummyProduct[0].id;
                const errors = [
                    {
                        "message": "Price must be equal to or more than 0"
                    }
                ]
                const productInput = {
                    price: -1,
                    stock: 0
                }
                request(app)
                    .put(`/products/${productId}`)
                    .set({'token':loginToken})
                    .send(productInput)
                    .end((err, res) => {
                        if(err){
                            return done(err);
                        }
                        else {
                            expect(res.status).toBe(400);
                            expect(res.body).toHaveProperty('errors', errors);                           
                            return done()
                        }
                    })                    
            })
            test(`Should return error with status 400 because stock less than 0`, (done) => {
                const productId = dummyProduct[0].id;
                const errors = [
                    {
                        "message": "Stock must be equal to or more than 0"
                    }
                ]
                const productInput = {
                    price: 0,
                    stock: -1
                }
                request(app)
                    .put(`/products/${productId}`)
                    .set({'token':loginToken})
                    .send(productInput)
                    .end((err, res) => {
                        if(err){
                            return done(err);
                        }
                        else {
                            expect(res.status).toBe(400);
                            expect(res.body).toHaveProperty('errors', errors);                           
                            return done()
                        }
                    })  
            })
            test(`Should return error with status 400 because price and stock less than 0`, (done) => {
                const productId = dummyProduct[0].id;
                const errors = [
                    {
                        "message": "Price must be equal to or more than 0"
                    },
                    {
                        "message": "Stock must be equal to or more than 0"
                    }
                ]
                const productInput = {
                    price: -1,
                    stock: -1
                }
                request(app)
                    .put(`/products/${productId}`)
                    .set({'token':loginToken})
                    .send(productInput)
                    .end((err, res) => {
                        if(err){
                            return done(err);
                        }
                        else {
                            expect(res.status).toBe(400);
                            expect(res.body).toHaveProperty('errors', errors);                           
                            return done()
                        }
                    })  
            })
        })
    })

    ////// Delete by productId
    describe(`DELETE /products/:productId`, () => {
        describe(`Success delete product`, () => {
            test(`Should return with delete message and status 200`, (done) => {
                const productId = dummyProduct[0].id;
                request(app)
                    .delete(`/products/${productId}`)
                    .set({'token':loginToken})
                    .end((err, res) => {
                        if(err){
                            return done(err)
                        }
                        else {
                            expect(res.status).toBe(200);
                            expect(res.body).toHaveProperty('message', `Product id ${productId} delete`)
                            return done()
                        }
                    })
            })
        })
        describe(`Error delete product by productId`, () => {
            test(`Should return error with status 401 because no token in headers`, (done) => {
                const productId = dummyProduct[0].id;
                const errors = [
                     {
                         message: "Unauthorized. Please login first"
                     },
                ]
                 request(app)
                    .delete(`/products/${productId}`)
                    .end((err, res) => {
                         if(err){
                             return done(err);
                         }
                         else {
                             expect(res.status).toBe(401);
                             expect(res.body).toHaveProperty('errors', errors);                           
                             return done()
                         }
                     }) 
             })
             test(`Should return error with status 404 because product by productId not found`, (done) => {
                const productId = 9;
                const errors = [
                    {
                        "message": `Product with id ${productId} not found`
                    }
                ]
                 request(app)
                    .delete(`/products/${productId}`)
                    .set({'token':loginToken})
                    .end((err, res) => {
                         if(err){
                             return done(err);
                         }
                         else {
                             expect(res.status).toBe(404);
                             expect(res.body).toHaveProperty('errors', errors);                           
                             return done()
                         }
                     }) 
             })
        })
    })

    ////// Read product by product Id
    describe(`GET /products/:productId`, () => {
        describe(`Success read product by productId`, () => {
            test(`Should return array of object with name, description, image_url, price, stock from spesific product by productId and status 200`, (done) => {
                const productId = dummyProduct[1].id;
                request(app)
                    .get(`/products/${productId}`)
                    .set({'token':loginToken})
                    .end((err, res) => {
                        if(err){
                            return done(err)
                        }
                        else {
                            expect(res.status).toBe(200);
                            expect(res.body.product).toHaveProperty('id', dummyProduct[1].id)
                            expect(res.body.product).toHaveProperty('name', dummyProduct[1].name)
                            expect(res.body.product).toHaveProperty('description', dummyProduct[1].description)
                            expect(res.body.product).toHaveProperty('image_url', dummyProduct[1].image_url)
                            expect(res.body.product).toHaveProperty('price', dummyProduct[1].price)
                            expect(res.body.product).toHaveProperty('stock', dummyProduct[1].stock)
                            return done()
                        }
                    })
            })
        })
        describe(`Error read product by productId`, () => {
            test(`Should return error with status 401 because no token in headers`, (done) => {
                const productId = dummyProduct[0].id;
                const errors = [
                     {
                         message: "Unauthorized. Please login first"
                     },
                ]
                request(app)
                    .get(`/products/${productId}`)
                    .end((err, res) => {
                        if(err){
                            return done(err);
                        }
                        else {
                            expect(res.status).toBe(401);
                            expect(res.body).toHaveProperty('errors', errors);                           
                            return done()
                        }
                    }) 
            })
            test(`Should return error with status 404 because product by productId not found`, (done) => {
                const productId = 9;
                const errors = [
                     {
                         message: `Product with id ${productId} not found`
                     },
                ]
                request(app)
                    .get(`/products/${productId}`)
                    .set({'token':loginToken})
                    .end((err, res) => {
                        if(err){
                            return done(err);
                        }
                        else {
                            expect(res.status).toBe(404);
                            expect(res.body).toHaveProperty('errors', errors);                           
                            return done()
                        }
                    }) 
            })
        })
    })


})
