const app = require('../app')
const request = require('supertest')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const { encrypt } = require('../helpers/bcrypt')


const userTest = {
    email: 'testing@mail.com',
    password: '123456789'
  };

afterAll((done) => {
    queryInterface.bulkDelete('Users')
    .then((result) => {
        console.log('Db clean up....')
        done()
    }).catch((err) => {
        done(err)
    });
})

beforeAll(done => {
    const newPass = encrypt(userTest.password)
    queryInterface
      .bulkInsert('Users', [
        {
          email: userTest.email,
          password: newPass,
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ])
      .then((result) => {
          console.log(result)
        console.log('User created: ' + userTest.email);
        done();
      })
      .catch(err => {
        done(err);
      });
  });

describe('User services', () => {
    describe('POST /users/register', () => {
        describe('success register', () => {
            test('should reuturn object with properties id, email, and status code is 201', done => {

                // input req body of POST /register
                const userInput = {
                    email: 'sample@mail.com',
                    password: '12345678' 
                }

                request(app)
                .post('/users/register')
                .send(userInput)
                .end((err, response) => {
                    if (err) {
                        return done(err)
                    } else {
                        console.log(response.body)
                        expect(response.status).toBe(201);
                        expect(response.body).toHaveProperty('id', expect.any(Number));
                        expect(response.body).toHaveProperty('email', userInput.email);
                        expect(response.body).toHaveProperty('role', 'admin');
                        expect(response.body).not.toHaveProperty('password');
                        return done()
                    }
                })
            });         
        });


        describe('error register', () => {
            test('should return error with status code 400 because missing email and password', (done) => {
                const errors = [
                    {
                        message: 'Email is required field'
                    }
                    ,
                    {
                        message: 'Password is required field'
                    }
                ]
                request(app)
                .post('/users/register')
                .end((err, response) => {
                    if (err) {
                        return done(err)
                    } else {
                        expect(response.status).toBe(400);
                        expect(response.body).toHaveProperty('errors', errors)
                        return done()
                    }
                });
            });

            test('should return error with status code 400 because email must be unique', (done) => {
                const userInput = {
                    email: 'sample@mail.com',
                    password: '12345678' 
                }
                const errors = [
                    {
                        message: 'email must be unique'
                    }
                ]
                request(app)
                .post('/users/register')
                .send(userInput)
                .end((err, response) => {
                    if (err) {
                        return done(err)
                    } else {
                        expect(response.status).toBe(400);
                        expect(response.body).toHaveProperty('errors', errors)
                        return done()
                    }
                });
            });

            test('should return error with status code 400 because password must be at least 8 characters', (done) => {
                const userInput = {
                    email: 'sampleQ@mail.com',
                    password: '123456' 
                }
                const errors = [
                    {
                        message: 'Password must be at least 8 characters'
                    }
                ]
                request(app)
                .post('/users/register')
                .send(userInput)
                .end((err, response) => {
                    if (err) {
                        return done(err)
                    } else {
                        expect(response.status).toBe(400);
                        expect(response.body).toHaveProperty('errors', errors)
                        return done()
                    }
                });
            });

        });
    });

    describe('POST /users/login', () => {
        describe('success login', () => {
            test('should return object with properties access token, id, email and status code 200', (done) => {
                request(app)
                .post('/users/login')
                .send(userTest)
                .end((err, response) => {
                    if (err) {
                        console.log(err)
                        return done(err)
                    } else {
                        console.log(response.body)
                        expect(response.status).toBe(200);
                        expect(response.body).toHaveProperty('token');
                        return done()
                    }
                })
            });     
        });


        describe('error login', () => {
            test('should return error with status code 401 because Invalid Password', (done) => {
                const user = {
                    email: userTest.email,
                    password: 'asldjnsajdnjna'
                }
                const errors = [
                    {
                        message: 'Invalid Email/Password'
                    }
                ]
                request(app)
                .post('/users/login')
                .send(user)
                .end((err, response) => {
                    if (err) {
                        console.log(err)
                        return done(err)
                    } else {
                        expect(response.status).toBe(400);
                        expect(response.body).toHaveProperty('errors', errors);
                        return done()
                    }
                })
            });

            test('should return error with status code 401 because Invalid Email', (done) => {
                const user = {
                    email: 'testi@mail.com',
                    password: userTest.password
                }
                const errors = [
                    {
                        message: 'Invalid Email/Password'
                    }
                ]
                request(app)
                .post('/users/login')
                .send(user)
                .end((err, response) => {
                    if (err) {
                        console.log(err)
                        return done(err)
                    } else {
                        expect(response.status).toBe(400);
                        expect(response.body).toHaveProperty('errors', errors);
                        return done()
                    }
                })
            });

        });
    });


});
