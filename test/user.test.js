const app = require('../app')
const request = require('supertest')


describe('User Router', () => {
    beforeAll(function() {
        jest.setTimeout(10000);
    });

    describe('register', () => {
        describe('Success : ', () => {
            test('should return JSON with id and email with status 201', done => {
                const userTest = {
                    email : 'test@mail.com',
                    password : 'testinTEST'
                }
                request(app)
                    .post('/users/register')
                    .send(userTest)
                    .end((err, response) => {
                        if(err) {
                            return done(err)
                        }else{
                            expect(response.status).toBe(201)
                            expect(response.body).toHaveProperty('id', expect.any(Number))
                            expect(response.body).toHaveProperty('email', userTest.email)
                            expect(response.body).not.toHaveProperty('password')
                            return done()
                        }
                })
            })
        })
    })
})