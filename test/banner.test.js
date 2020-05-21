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
            password: 'asdasd'
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

describe('TEST SUCCESS /banner', () => {
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
})