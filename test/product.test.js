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
            request(app)
                .post('/users/login')
                .send(adminUser)
                .end((err, res) => {
                    if(err) {
                        return done(err)
                    }
                    else {
                        // console.log(res.body.token)
                        loginToken = res.body.token;
                        console.log('token bos '+loginToken)
                        return done()
                    }
                })
            done()
        })
        .catch(err => (
            done(err)
        ))
    //// authentication
    
})

describe(`Product feature`, () => {
    //// Create
    describe(`POST /products/`, () => {
        describe(`'Success create`, () => {
            test(`Should return object with name and default value description, image_url, price, stock and status 201 `, (done) => {
                const productInput = {
                    name: `test product 1`,
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
                            console.log(res.headers)
                            console.log(res.body)
                            expect(res.status).toBe(201);
                            expect(res.body).toHaveProperty(`id`, expect.any(Number));
                            expect(res.body).toHaveProperty(`name`, productInput.name);
                            expect(res.body).toHaveProperty(`description`, `No description`);
                            expect(res.body).toHaveProperty(`image_url`, `No image available`);
                            expect(res.body).toHaveProperty(`price`, 0);
                            expect(res.body).toHaveProperty(`stock`, 0);
                        }
                    })
            })
        })
    })
})