const app = require('../app.js');
const request = require('supertest');

const { queryInterface } = require('../models/index.js').sequelize;


describe('User Router', () => {
    beforeAll((done) => {
        queryInterface.bulkDelete('Users')
            .then(_ => {
                done();
            })
            .catch(err => {
                done(err);
            });
    });
    describe('Signup a user', () => {
        describe('Success:', () => {
            test('Should return status code 201 with result of JSON with keys (id, email)', (done) => {
                const userInput = {
                    email: 'cokro0@gmail.com',
                    password: '1234567890'
                }
                request(app)
                .post('/users/signup')
                .send(userInput)
                .set({
                    Accept: 'application/json',
                    access_token: 'token'
                })
                .expect(201)
                .expect('Content-Type', /json/)
                .expect((result) => {
                    let data = result.body;
                    expect(data).toHaveProperty('email', userInput.email);
                    expect(data).not.toHaveProperty('password');
                })
                .end((err) => {
                    if (err) {
                    return done(err);
                    } else {
                    done();
                    };
                });
            });
        });
        describe('Failed:', () => {
            test('Should return status code 400 with result of JSON because password length should between 7 and 15', (done) => {
                const userInput = {
                    email: 'cokro0@gmail.com',
                    password: '123'
                }
                request(app)
                .post('/users/signup')
                .send(userInput)
                .set({
                    Accept: 'application/json'
                })
                .expect(400)
                .expect('Content-Type', /json/)
                .expect((result) => {
                    let data = result.body;
                    expect(data.errors[0]).toHaveProperty("message", "Password length should between 7 and 15");
                })
                .end((err) => {
                    if (err) {
                    return done(err);
                    } else {
                    done();
                    };
                });
            
            });
        });
    });
    describe('Signin User', () => {
        describe('Success:', () => {
            test('Should return token with status 200', (done) => {
                const userInput = {
                    email: 'cokro0@gmail.com',
                    password: '1234567890'
                }
                request(app)
                .post('/users/signin')
                .send(userInput)
                .expect(200)
                .expect('Content-Type', /json/)
                .expect((result) => {
                    let data = result.body;
                    // expect(data).toBe('');
                    expect(data).toHaveProperty('token', expect.any(String));
                })
                .end((err) => {
                    if (err) {
                    return done(err);
                    } else {
                    done();
                    };
                });
            })
        });
        describe('Failed:', () => {
            test('Should return status code 400 because Invalid email or password', (done) => {
                const userInput = {
                    email: 'cokro0@gmail.com',
                    password: '1234dkwo5781'
                }
                request(app)
                .post('/users/signin')
                .send(userInput)
                .expect(400)
                .expect('Content-Type', /json/)
                .expect((result) => {
                    let data = result.body;
                    // expect(data).toBe('');
                    expect(data.errors[0]).toHaveProperty("message", "Invalid email or password");
                })
                .end((err) => {
                    if (err) {
                    return done(err);
                    } else {
                    done();
                    };
                });
            })
        });
    });
    afterAll((done) => {
        queryInterface.bulkDelete('Users')
        .then(_ => {
            done();
        })
        .catch(err => {
            done(err);
        });
    });
});