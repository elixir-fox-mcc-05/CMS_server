const app = require('../app')
const request = require('supertest')
// var request = require('dupertest');
const { sequelize } = require('../models')
const { queryInterface } = sequelize


afterAll(done => {
    queryInterface.bulkDelete('Categories')
        .then(() => {
            console.log('cleaned db')
            done()
        })
        .catch(err => {
            done(err)
        })
})

beforeAll((done) => {

    // .then(() => {
    //     console.log('user created bolu!')
    //     done()
    // })
    // .catch(err => {
    //     done(err)
    // })

    queryInterface.bulkInsert('Categories', [{
        name: 'buah',
        createdAt: new Date(),
        updatedAt: new Date()
    }])
        .then(() => {
            console.log('beforeAll process complete')
            done()
        })
})

let id;
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJtYWlsQG1haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMDQkZC9Lb0tVUTU3Z2lpUzhjR1dVQ0hYTzFrRU1pVjRKdElKbVlLaUZ5ZHVwRWpIOHZUa2VWbWkiLCJpYXQiOjE1ODkzNjcxNjd9.He_neKlcZ-q7uv_6ikyqlVxlc8-06P5CwY0Vd7tVTw4'
describe('POST /register then POST /login', () => {
    test('should return object with id, name,and email. status 201', (done) => {
        const userInput = {
            first_name: 'yusak',
            email: 'mail@mail.com',
            password: 'asdasd',
            roles: 'admin'
        }
        request(app)
            .post('/register')
            .send(userInput)
            .end((err, response) => {
                if (err) {
                    return done(err)
                } else {
                    console.log(response.body)
                    return done()
                }
            })
    })
    test('should return object with token. status 200', (done) => {
        const userInput = {
            first_name: 'yusak',
            email: 'mail@mail.com',
            password: 'asdasd'
        }
        request(app)
            .post('/login')
            .send(userInput)
            .end((err, response) => {
                if (err) {
                    return done(err)
                } else {
                    token = response.body.token
                    console.log(response.body)
                    return done()
                }
            })

    })
})

describe('TEST SUCCESS /category', () => {
    describe('POST /category/add', () => {
        test('return object with id and name, status 201', (done) => {
            let newCategory = {
                name: 'test'
            }

            request(app)
                .post(`/category/add`)
                .set('token', token)
                // .query({'id':id})
                .send(newCategory)
                .end((err, response) => {
                    if (err) {
                        return done(err)
                    } else {
                        console.log(response.body)
                        id = response.body.id
                        expect(response.status).toBe(201)
                        expect(response.body).toHaveProperty('id', expect.any(Number))
                        expect(response.body).toHaveProperty('name', newCategory.name)
                        return done()
                    }
                })
        })
    })
    describe('GET /category', () => {
        test('return object with id and name, status 200', (done) => {

            request(app)
                .get(`/category`)
                .set('token', token)
                // .query({'id':id})
                // .send(newCategory)
                .end((err, response) => {
                    if (err) {
                        return done(err)
                    } else {
                        // console.log(response.body)
                        expect(response.status).toBe(200)
                        // expect(response.body).toHaveProperty('id',expect.any(Number))
                        // expect(response.body).toHaveProperty('name',newCategory.name)
                        return done()
                    }
                })
        })
    })
    describe('get /category/:id', () => {
        test('return object with id and name, status 200', (done) => {
            // let newCategory = {
            //     name : 'test'
            // }

            request(app)
                .get(`/category/${id}`)
                .set('token', token)
                .query({ 'id': id })
                // .send(newCategory)
                .end((err, response) => {
                    if (err) {
                        return done(err)
                    } else {
                        console.log(response.body)
                        expect(response.status).toBe(200)
                        expect(response.body).toHaveProperty('id', expect.any(Number))
                        expect(response.body).toHaveProperty('name', expect.any(String))
                        return done()
                    }
                })
        })
    })
    describe('PUT /category/edit/:id', () => {
        test('return object with id and name, status 200', (done) => {
            let newCategory = {
                name : 'test'
            }

            request(app)
                .put(`/category/edit/${id}`)
                .set('token', token)
                .query({ 'id': id })
                .send(newCategory)
                .end((err, response) => {
                    if (err) {
                        return done(err)
                    } else {
                        console.log(response.body)
                        expect(response.status).toBe(200)
                        expect(response.body).toHaveProperty('id', expect.any(Number))
                        expect(response.body).toHaveProperty('name', expect.any(String))
                        return done()
                    }
                })
        })
    })
    describe('DELETE /category/edit/:id', () => {
        test('return object error, status 200', (done) => {
            // let newCategory = {
            //     name : 'test'
            // }

            request(app)
                .delete(`/category/delete/${id}`)
                .set('token', token)
                .query({ 'id': id })
                // .send(newCategory)
                .end((err, response) => {
                    if (err) {
                        return done(err)
                    } else {
                        console.log(response.body)
                        expect(response.status).toBe(200)
                        expect(response.body).toHaveProperty('error', expect.any(String))
                        return done()
                    }
                })
        })
    })
})

describe('POST /category/add', () => {
    test('return object with id and name, status 201', (done) => {
        let newCategory = {
            name: 'test'
        }

        request(app)
            .post(`/category/add`)
            .set('token', token)
            // .query({'id':id})
            .send(newCategory)
            .end((err, response) => {
                if (err) {
                    return done(err)
                } else {
                    console.log(response.body)
                    id = response.body.id
                    console.log(id)
                    expect(response.status).toBe(201)
                    expect(response.body).toHaveProperty('id', expect.any(Number))
                    expect(response.body).toHaveProperty('name', newCategory.name)
                    return done()
                }
            })
    })
})

describe('TEST FAIL /category', () => {
    describe('POST /category/add', () => {
        test('return error with empty string, status 400', (done) => {
            let error =  "Name is required field"
            let newCategory = {
                name: ''
            }

            request(app)
                .post(`/category/add`)
                .set('token', token)
                // .query({'id':id})
                .send(newCategory)
                .end((err, response) => {
                    if (err) {
                        return done(err)
                    } else {
                        console.log(response.body)
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('error', error)
                        

                        return done()
                    }
                })
        })
        test('return error with null, status 400', (done) => {
            let error =  "Name is required field"
            let newCategory = {
                name: ''
            }

            request(app)
                .post(`/category/add`)
                .set('token', token)
                // .query({'id':id})
                // .send(newCategory)
                .end((err, response) => {
                    if (err) {
                        return done(err)
                    } else {
                        console.log(response.body)
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('error', error)
                        

                        return done()
                    }
                })
        })
    })
    describe('GET /category/:id', () => {
        test('return error with data not found, status 404', (done) => {
            let error ='not found'
            // let newCategory = {
            //     name : 'test'
            // }

            request(app)
                .get(`/category/1292`)
                .set('token', token)
                .query({ 'id': 1292 })
                // .send(newCategory)
                .end((err, response) => {
                    if (err) {
                        return done(err)
                    } else {
                        console.log(response.body)
                        expect(response.status).toBe(404)
                        expect(response.body).toHaveProperty('error', error)
                        return done()
                    }
                })
        })
    })

    describe('PUT /category/edit/:id', () => {
        test('return error with empty name, status 400', (done) => {
            let error =  "Name is required field"
            let newCategory = {
                name : ''
            }

            request(app)
                .put(`/category/edit/${id}`)
                .set('token', token)
                .query({ 'id': id })
                .send(newCategory)
                .end((err, response) => {
                    if (err) {
                        return done(err)
                    } else {
                        console.log(response.body)
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('error', error)
                        return done()
                    }
                })
        })

        test('return error with null, status 400', (done) => {
            let error =  "name is null"
            let newCategory = {
                name : null
            }

            request(app)
                .put(`/category/edit/${id}`)
                .set('token', token)
                .query({ 'id': id })
                // .send(newCategory)
                .end((err, response) => {
                    if (err) {
                        return done(err)
                    } else {
                        console.log(response.body)
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('error', error)
                        return done()
                    }
                })
        })

        test('return error with id not found, status 404', (done) => {
            let error =  "not found"
            let newCategory = {
                name : 'asd'
            }

            request(app)
                .put(`/category/edit/2347`)
                .set('token', token)
                .query({ 'id': 2347 })
                .send(newCategory)
                .end((err, response) => {
                    if (err) {
                        return done(err)
                    } else {
                        console.log(response.body)
                        expect(response.status).toBe(404)
                        expect(response.body).toHaveProperty('error', error)
                        return done()
                    }
                })
        })
    })

    describe('DELETE /category/:id', () => {
        test('return error with data not found, status 404', (done) => {
            let error ='not found'
            // let newCategory = {
            //     name : 'test'
            // }

            request(app)
                .delete(`/category/delete/1291`)
                .set('token', token)
                .query({ 'id': 1291 })
                // .send(newCategory)
                .end((err, response) => {
                    if (err) {
                        return done(err)
                    } else {
                        console.log(response.body)
                        expect(response.status).toBe(404)
                        expect(response.body).toHaveProperty('error', error)
                        return done()
                    }
                })
        })
    })
})