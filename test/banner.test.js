const app = require('../app')
const request = require('supertest')
const { sequelize } = require('../models')
const { queryInterface } = sequelize


afterAll(done => {
    queryInterface.bulkDelete('Banners')
        .then(() => {
            console.log('cleaned db')
            done()
        })
        .catch(err => {
            done(err)
        })
})

// beforeAll((done) => {

    // .then(() => {
    //     console.log('user created bolu!')
    //     done()
    // })
    // .catch(err => {
    //     done(err)
    // })

    // queryInterface.bulkInsert('Categories', [{
    //     name: 'buah',
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    // }])
    //     .then(() => {
    //         console.log('beforeAll process complete')
    //         done()
    //     })
// })

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
                    // console.log(response.body)
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
                    // console.log(response.body)
                    return done()
                }
            })

    })
})

describe('TEST SUCCESS /banner', () => {
    describe('POST /banner/ADD', () => {
        test('should return as  object with status 201', (done) => {

            let newBanner={
                name: 'test',
                image_url: 'https://docs.bmc.com/docs/digitalworkplaceadvanced/1908/files/871981152/871981153/1/1559852715697/1.png'
            }


            request(app)
                    .post(`/banner/add/test`)
                    .set('token', token)
                    // .query({'id':id})
                    .send(newBanner)
                    .end((err, response) => {
                        if (err) {
                            return done(err)
                        } else {
                            // console.log(response.body)
                            expect(response.status).toBe(201)
                            expect(response.body).toHaveProperty('id',expect.any(Number))
                            expect(response.body).toHaveProperty('name',newBanner.name)
                            expect(response.body).toHaveProperty('image_url',newBanner.image_url)
                            id = response.body.id
                            return done()
                        }
                    })
        })
    })
    describe('GET /banner/list', () => {
        test('should return as array of object with status 200', (done) => {

            request(app)
                    .get(`/banner/list`)
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
    describe('GET /banner/:id', () => {
        test('should return as array of object with status 200', (done) => {

            request(app)
                    .get(`/banner/${id}`)
                    .set('token', token)
                    .query({'id':id})
                    // .send(newCategory)
                    .end((err, response) => {
                        if (err) {
                            return done(err)
                        } else {
                            // console.log(response.body)
                            expect(response.status).toBe(200)
                            expect(response.body).toHaveProperty('id',expect.any(Number))
                            expect(response.body).toHaveProperty('name',expect.any(String))
                            expect(response.body).toHaveProperty('image_url',expect.any(String))
                            return done()
                        }
                    })
        })
    })
    describe('PUT /banner/:id', () => {
        test('should return as object with status 200', (done) => {

            let newBanner = {
                name: 'test12',
                image_url: 'https://docs.bmc.com/docs/digitalworkplaceadvanced/1908/files/871981152/871981153/1/1559852715697/1.png'
            }


            request(app)
                    .put(`/banner/${id}`)
                    .set('token', token)
                    .query({'id':id})
                    .send(newBanner)
                    .end((err, response) => {
                        if (err) {
                            return done(err)
                        } else {
                            // console.log(response.body)
                            expect(response.status).toBe(200)
                            expect(response.body).toHaveProperty('id',expect.any(Number))
                            expect(response.body).toHaveProperty('name',newBanner.name)
                            expect(response.body).toHaveProperty('image_url',newBanner.image_url)
                            return done()
                        }
                    })
        })
    })
    describe('DELETE /banner/delete/:id', () => {
        test('should return as object with status 200', (done) => {

            request(app)
                    .delete(`/banner/delete/${id}`)
                    .set('token', token)
                    .query({'id':id})
                    // .send(newCategory)
                    .end((err, response) => {
                        if (err) {
                            return done(err)
                        } else {
                            // console.log(response.body)
                            expect(response.status).toBe(200)
                            expect(response.body).toHaveProperty('id',expect.any(Number))
                            expect(response.body).toHaveProperty('name',expect.any(String))
                            expect(response.body).toHaveProperty('image_url',expect.any(String))
                            return done()
                        }
                    })
        })
    })
})



describe('POST /banner/ADD', () => {
    test('should return as  object with status 201', (done) => {

        let newBanner={
            name: 'test',
            image_url: 'https://docs.bmc.com/docs/digitalworkplaceadvanced/1908/files/871981152/871981153/1/1559852715697/1.png'
        }


        request(app)
                .post(`/banner/add/test`)
                .set('token', token)
                // .query({'id':id})
                .send(newBanner)
                .end((err, response) => {
                    if (err) {
                        return done(err)
                    } else {
                        // console.log(response.body)
                        expect(response.status).toBe(201)
                        expect(response.body).toHaveProperty('id',expect.any(Number))
                        expect(response.body).toHaveProperty('name',newBanner.name)
                        expect(response.body).toHaveProperty('image_url',newBanner.image_url)
                        id = response.body.id
                        return done()
                    }
                })
    })
})




describe('TEST FAILURE /banner', () => {
    describe('POST /banner/add', () => {
        test('test return error with empty string name , status 400', (done) => {
            let newBanner={
                name: '',
                image_url: 'https://docs.bmc.com/docs/digitalworkplaceadvanced/1908/files/871981152/871981153/1/1559852715697/1.png'
            }


            request(app)
                    .post(`/banner/add/test`)
                    .set('token', token)
                    // .query({'id':id})
                    .send(newBanner)
                    .end((err, response) => {
                        if (err) {
                            return done(err)
                        } else {
                            // console.log(response.body)
                            expect(response.status).toBe(400)
                            expect(response.body.error).toContain('Name is required field')
                            // expect(response.body.error).toContain("image_url is required field")
                            return done()
                        }
                    })
        })
        test('test return error with empty string image_url , status 400', (done) => {
            let newBanner={
                name: 'title',
                image_url: ''
            }


            let error = 'asdasdasd'

            request(app)
                    .post(`/banner/add/test`)
                    .set('token', token)
                    // .query({'id':id})
                    .send(newBanner)
                    .end((err, response) => {
                        if (err) {
                            return done(err)
                        } else {
                            // console.log(response.body)
                            expect(response.status).toBe(400)
                            expect(response.body.error).toContain("image_url is required field")
                            return done()
                        }
                    })
        })
        test('test return error with null, status 400', (done) => {
            // let newBanner={
            //     name: '',
            //     image_url: 'https://docs.bmc.com/docs/digitalworkplaceadvanced/1908/files/871981152/871981153/1/1559852715697/1.png'
            // }
            let error = 'asdasdasd'

            request(app)
                    .post(`/banner/add/test`)
                    .set('token', token)
                    // .query({'id':id})
                    // .send(newBanner)
                    .end((err, response) => {
                        if (err) {
                            return done(err)
                        } else {
                            // console.log(response.body)
                            expect(response.status).toBe(400)
                            expect(response.body.error).toContain('Name is required field')
                            expect(response.body.error).toContain("image_url is required field")
                            return done()
                        }
                    })
        })
        test('test return error with empty, status 400', (done) => {
            let newBanner={
                name: '',
                image_url: ''
            }
            let error = 'asdasdasd'

            request(app)
                    .post(`/banner/add/test`)
                    .set('token', token)
                    .send(newBanner)
                    .end((err, response) => {
                        if (err) {
                            return done(err)
                        } else {
                            // console.log(response.body)
                            expect(response.status).toBe(400)
                            expect(response.body.error).toContain('Name is required field')
                            expect(response.body.error).toContain("image_url is required field")
                            // expect(new Set(shoppingList)).toContain('beer');
                            return done()
                        }
                    })
        })
        test('test return error with not url format on image_url, status 400', (done) => {
            let newBanner={
                name: 'asdasdasd',
                image_url: 'blablabla'
            }
            let error = 'image url must in URL format'

            request(app)
                    .post(`/banner/add/test`)
                    .set('token', token)
                    .send(newBanner)
                    .end((err, response) => {
                        if (err) {
                            return done(err)
                        } else {
                            // console.log(response.body)
                            expect(response.status).toBe(400)
                            expect(response.body).toHaveProperty('error', error)
                            return done()
                        }
                    })
        })
    })
    describe('GET banner/:id', () => {
        test('test return error with data not found, status 400', (done) => {
            let error = 'not found'

            request(app)
                    .get(`/banner/2555`)
                    .set('token', token)
                    .end((err, response) => {
                        if (err) {
                            return done(err)
                        } else {
                            // console.log(response.body)
                            expect(response.status).toBe(404)
                            expect(response.body).toHaveProperty('error', error)
                            return done()
                        }
                    })
        })

    })
    describe("PUT banner/:id", () => {
        test('test return error with empty string name , status 400', (done) => {
            let newBanner={
                name: '',
                image_url: 'https://docs.bmc.com/docs/digitalworkplaceadvanced/1908/files/871981152/871981153/1/1559852715697/1.png'
            }


            request(app)
                    .put(`/banner/${id}`)
                    .set('token', token)
                    .query({'id':id})
                    .send(newBanner)
                    .end((err, response) => {
                        if (err) {
                            return done(err)
                        } else {
                            // console.log(response.body)
                            expect(response.status).toBe(400)
                            expect(response.body.error).toContain('Name is required field')
                            // expect(response.body.error).toContain("image_url is required field")
                            return done()
                        }
                    })
        })
        test('test return error with empty string image_url , status 400', (done) => {
            let newBanner={
                name: 'title',
                image_url: ''
            }


            let error = 'not found'

            request(app)
                    .put(`/banner/${id}`)
                    .set('token', token)
                    .query({'id':id})
                    .send(newBanner)
                    .end((err, response) => {
                        if (err) {
                            return done(err)
                        } else {
                            // console.log(response.body)
                            expect(response.status).toBe(400)
                            expect(response.body.error).toContain("image_url is required field")
                            return done()
                        }
                    })
        })
        test('test return error with null, status 400', (done) => {
            let newBanner={
                name: null,
                image_url: null
            }
            let error = 'asdasdasd'

            request(app)
                    .put(`/banner/${id}`)
                    .set('token', token)
                    .query({'id':id})
                    .send(newBanner)
                    .end((err, response) => {
                        if (err) {
                            return done(err)
                        } else {
                            // console.log(response.body)
                            expect(response.status).toBe(400)
                            expect(response.body.error).toContain('Name is required field')
                            expect(response.body.error).toContain("image_url is required field")
                            return done()
                        }
                    })
        })
        test('test return error with empty, status 400', (done) => {
            let newBanner={
                name: '',
                image_url: ''
            }
            let error = 'asdasdasd'

            request(app)
                    .put(`/banner/${id}`)
                    .set('token', token)
                    .query({'id':id})
                    .send(newBanner)
                    .end((err, response) => {
                        if (err) {
                            return done(err)
                        } else {
                            // console.log(response.body)
                            expect(response.status).toBe(400)
                            expect(response.body.error).toContain('Name is required field')
                            expect(response.body.error).toContain("image_url is required field")
                            // expect(new Set(shoppingList)).toContain('beer');
                            return done()
                        }
                    })
        })
        test('test return error with not url format on image_url, status 400', (done) => {
            let newBanner={
                name: 'asdasdasd',
                image_url: 'blablabla'
            }
            let error = 'image url must in URL format'

            request(app)
                    .put(`/banner/${id}`)   
                    .set('token', token)
                    .query({'id':id})
                    .send(newBanner)
                    .end((err, response) => {
                        if (err) {
                            return done(err)
                        } else {
                            // console.log(response.body)
                            expect(response.status).toBe(400)
                            expect(response.body).toHaveProperty('error', error)
                            return done()
                        }
                    })
        })
        test('test return error with not found, status 400', (done) => {
            let newBanner={
                name: 'asdasdasd',
                image_url: 'blablabla'
            }
            let error = 'not found'

            request(app)
                    .put(`/banner/2555`)   
                    .set('token', token)
                    .query({'id':2555})
                    .send(newBanner)
                    .end((err, response) => {
                        if (err) {
                            return done(err)
                        } else {
                            // console.log(response.body)
                            expect(response.status).toBe(404)
                            expect(response.body).toHaveProperty('error', error)
                            return done()
                        }
                    })
        })
    })
    describe('DELETE banner/delete/:id', () => {
        test('test return error with data not found, status 400', (done) => {
            let error = 'not found'

            request(app)
                    .delete(`/banner/delete/2555`)
                    .set('token', token)
                    .query({'id':2555})
                    .end((err, response) => {
                        if (err) {
                            return done(err)
                        } else {
                            // console.log(response.body)
                            expect(response.status).toBe(404)
                            expect(response.body).toHaveProperty('error', error)
                            return done()
                        }
                    })
        })

    })
})