const app = require('../app.js');
const request = require('supertest');
const { queryInterface } = require('../models').sequelize;
const { hashPassword } = require('../helpers/bcrypt.js');
const userData = require('../rawData/rawUser.json');
const categoryData = require('../rawData/rawCategory.json');
const { generateToken } = require('../helpers/jwt.js');

describe('Category router', () => {
    let user = [];
    let categories = [];

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
                done()
            })
            .catch(err => {
                done(err);
            })
    })

    describe('Add new category', () => {
        describe('Show All Categories', () => {
            describe('Success', () => {
                test('Should return status 200 OK along with all categories that exist', done => {
                    let admin = user[0];
                    let access_token = generateToken({
                        id: admin.id,
                        name: admin.name,
                        email: admin.email
                    })
                    request(app)
                        .get('/categories?sort=id|asc')
                        .set('Accept', 'application/json')
                        .set('access_token', access_token)
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .expect(res => {
                            let { categories } = JSON.parse(res.text)
                            expect(categories).toEqual([{
                                    "id": 1,
                                    "name": "Football",
                                    "total_product": 0
                                },
                                {
                                    "id": 2,
                                    "name": "Basketball",
                                    "total_product": 0
                                },
                                {
                                    "id": 3,
                                    "name": "American Football",
                                    "total_product": 0
                                },
                                {
                                    "id": 4,
                                    "name": "Baseball",
                                    "total_product": 0
                                },
                                {
                                    "id": 5,
                                    "name": "Ice Hockey",
                                    "total_product": 0
                                },
                                {
                                    "id": 6,
                                    "name": "Cycling",
                                    "total_product": 0
                                },
                                {
                                    "id": 7,
                                    "name": "Water Sport",
                                    "total_product": 0
                                },
                                {
                                    "id": 8,
                                    "name": "Outdoor Sport",
                                    "total_product": 0
                                }
                            ])
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
                test('should return status code 401 unauthorized because user doesnt have permission to see all category', done => {
                    let admin = user[0];
                    let access_token = generateToken({
                        id: 3,
                        name: admin.name,
                        email: admin.email
                    })
                    request(app)
                        .get('/categories')
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
                        .get('/categories')
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

        describe('Success', () => {
            test('should return status code 201 created along with json with key(id, name)', done => {
                let admin = user[0];
                let access_token = generateToken({
                    id: admin.id,
                    name: admin.name,
                    email: admin.email
                })
                request(app)
                    .post('/categories')
                    .send({
                        name: 'Winter Sport'
                    })
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(201)
                    .expect(res => {
                        let { category } = res.body;
                        expect(category).toHaveProperty('name', 'Winter Sport')
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

        describe('Fail', () => {
            test('should return status 400 bad request because product name is empty', done => {
                let admin = user[0];
            let access_token = generateToken({
                id: admin.id,
                name: admin.name,
                email: admin.email
            })
            request(app)
                .post('/categories')
                .send({
                    name: ''
                })
                .set('Accept', 'application/json')
                .set('access_token', access_token)
                .expect('Content-Type', /json/)
                .expect(400)
                .expect(res => {
                    let category = res.body;
                    expect(category.error).toContain('category name can\'t be empty')
                })
                .end(err => {
                    if (err) {
                        done(err);
                    } else {
                        done();
                    }
                })
            })

            test('should return status 400 bad request because product name is violating unique constraint', done => {
                let admin = user[0];
            let access_token = generateToken({
                id: admin.id,
                name: admin.name,
                email: admin.email
            })
            request(app)
                .post('/categories')
                .send({
                    name: 'Water Sport'
                })
                .set('Accept', 'application/json')
                .set('access_token', access_token)
                .expect('Content-Type', /json/)
                .expect(400)
                .expect(res => {
                    let category = res.body;
                    expect(category.error).toContain('Category already created')
                })
                .end(err => {
                    if (err) {
                        done(err);
                    } else {
                        done();
                    }
                })
            })

            test('should return status code 401 unauthorized because user doesnt have permission to add category', done => {
                let admin = user[0];
                let access_token = generateToken({
                    id: 3,
                    name: admin.name,
                    email: admin.email
                })
                request(app)
                    .post('/categories')
                    .send({
                        name: 'Martial Art'
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
                    .post('/categories')
                    .send({
                        name: 'Martial Art'
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
        })
    })

    describe('update categories', () => {
        describe('Success', () => {
            test('should return status code 200 OK along with json with key(id, name)', done => {
                let admin = user[0];
                let access_token = generateToken({
                    id: admin.id,
                    name: admin.name,
                    email: admin.email
                })
                request(app)
                    .put('/categories/1')
                    .send({
                        name: 'Extreme Sport'
                    })
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .expect(res => {
                        let { category } = res.body;
                        expect(category[1][0]).toHaveProperty('name', 'Extreme Sport')
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

        describe('Fail', () => {
            test('should return status 400 bad request because product name is empty', done => {
                let admin = user[0];
            let access_token = generateToken({
                id: admin.id,
                name: admin.name,
                email: admin.email
            })
            request(app)
                .put('/categories/2')
                .send({
                    name: ''
                })
                .set('Accept', 'application/json')
                .set('access_token', access_token)
                .expect('Content-Type', /json/)
                .expect(400)
                .expect(res => {
                    let category = res.body;
                    expect(category.error).toContain('category name can\'t be empty')
                })
                .end(err => {
                    if (err) {
                        done(err);
                    } else {
                        done();
                    }
                })
            })

            test('should return status 400 bad request because product name is violating unique constraint', done => {
                let admin = user[0];
            let access_token = generateToken({
                id: admin.id,
                name: admin.name,
                email: admin.email
            })
            request(app)
                .put('/categories/1')
                .send({
                    name: 'American Football'
                })
                .set('Accept', 'application/json')
                .set('access_token', access_token)
                .expect('Content-Type', /json/)
                .expect(400)
                .expect(res => {
                    let category = res.body;
                    expect(category.error).toContain('Category already created')
                })
                .end(err => {
                    if (err) {
                        done(err);
                    } else {
                        done();
                    }
                })
            })

            test('should return status code 401 unauthorized because user doesnt have permission to add category', done => {
                let admin = user[0];
                let access_token = generateToken({
                    id: 3,
                    name: admin.name,
                    email: admin.email
                })
                request(app)
                    .put('/categories/4')
                    .send({
                        name: 'American Football'
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
                    .put('/categories/4')
                    .send({
                        name: 'American Football'
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

            test('should return status 401 unauthorized because user doesnt have permission to update category(user is not an admin)', done => {
                let admin = user[1];
                let access_token = generateToken({
                    id: admin.id,
                    name: admin.name,
                    email: admin.email
                })
                request(app)
                    .put('/products/1')
                    .send({
                        name: 'Soft Ball'
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

    describe('Delete category', () => {
        describe('Success', () => {
            test('should return status 200 ok success delete category', done => {
                let admin = user[0];
                let access_token = generateToken({
                    id: admin.id,
                    name: admin.name,
                    email: admin.email
                })
                request(app)
                    .delete('/categories/1')
                    .set('Accept', 'application/json')
                    .set('access_token', access_token)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .expect(res => {
                        let product = res.body;
                        expect(product).toHaveProperty('msg', 'success delete category with id 1')
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
            test('should return status code 401 unauthorized because user doesnt have permission to delete category', done => {
                let admin = user[0];
                let access_token = generateToken({
                    id: 3,
                    name: admin.name,
                    email: admin.email
                })
                request(app)
                    .delete('/categories/1')
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
                    .delete('/categories/3')
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

            test('should return status 401 unauthorized because user doesnt have permission to delete category(user is not an admin)', done => {
                let admin = user[1];
                let access_token = generateToken({
                    id: admin.id,
                    name: admin.name,
                    email: admin.email
                })
                request(app)
                    .delete('/categories/2')
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