const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;
const bcrypt = require('bcryptjs');
const{Product,User} = require('../models')
const dataUser = {
  email: 'iguntop@gmail.com',
  password: 'test'
};

afterAll(done => {
  queryInterface
   User.destroy({ truncate: true, restartIdentity: true })
    .then(() => {
      console.log('Db clean up ');
      done();
    })
    .catch(err => {
      console.log(err);
      done(err);
    });
});

beforeAll(done => {
  const salt = bcrypt.genSaltSync(10);
  const dataUserHashPassword = bcrypt.hashSync(dataUser.password, salt);
  queryInterface
    .bulkInsert('Users', [
      {
        email: dataUser.email,
        password: dataUserHashPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
    .then(() => {
      console.log('User created: ' + dataUser.email);
      done();
    })
    .catch(err => {
      done(err);
    });
});

describe('User', () => {
  describe('POST /register', () => {
    describe('success register user', () => {
      test('should send an object with user id and email', done => {
        const userInput = {
          email:'test@mail.com',
          password: 'test'
        };
        request(app)
          .post('/user/register')
          .send(userInput)
          .end((err, response) => {
            if (err) {
              console.log('There is some error: ', err);
              return done(err);
            } else {
              expect(response.status).toBe(201);
              expect(response.body).toHaveProperty('id', expect.any(Number));
              expect(response.body).toHaveProperty('email', userInput.email);
              expect(response.body).not.toHaveProperty('password');
              return done();
            }
          });
      });
    });
    describe('error register user', () => {
      test('should send error and status 400 because missing email and password', done => {
        const errors = [
          {
            message: 'Email required'
          },
          {
            message: 'Password required'
          }
        ];
        request(app)
          .post('/user/register')
          .end((err, response) => {
            if (err) {
              console.log('There is some error: ', err);
              return done(err);
            } else {
              expect(response.status).toBe(400);
              expect(response.body).toHaveProperty('errors', errors);
              return done();
            }
          });
      });
      test('should send error and status 400 because missing password', done => {
        const errors = [         
          {
            message: 'Password required'
          }
        ];
        request(app)
          .post('/user/register')
          .send({email:'test@mail.com'})
          .end((err, response) => {
            if (err) {
              console.log('There is some error: ', err);
              return done(err);
            } else {
              expect(response.status).toBe(400);
              expect(response.body).toHaveProperty('errors', errors);
              return done();
            }
          });
      });
      
      test('should send error and status 400 because missing email ', done => {
        const errors = [
          {
            message: 'Email required'
          }
        ];
        request(app)
          .post('/user/register')
          .send({password: 'test'})
          .end((err, response) => {
            if (err) {
              console.log('There is some error: ', err);
              return done(err);
            } else {
              expect(response.status).toBe(400);
              expect(response.body).toHaveProperty('errors', errors);
              return done();
            }
          });
      }); 
      
      test('should send error and status 400 because email already exists.', done => {
        const errors = [
          {
            message: 'email must be unique'
          }
        ];
        request(app)
          .post('/user/register')
          .send(dataUser)
          .end((err, response) => {
            if (err) {
              console.log('There is some error: ', err);
              return done(err);
            } else {
              console.log(response.body);
              expect(response.status).toBe(400);
              expect(response.body).toHaveProperty('errors', errors);
              return done();
            }
          });
      });
    });
  });
  describe('POST /user/login', () => {
    describe('success login', () => {
      test('should send access token and status 200', done => {
        request(app)
          .post('/user/login')
          .send(dataUser)
          .end((err, response) => {
            if (err) {
              console.log('There is some error: ', err);
              return done(err);
            } else {
              expect(response.status).toBe(200);
              expect(response.body).toHaveProperty('token');
              return done();
            }
          });
      });
    });


    describe('fail login', () => {
      describe('login with email not match',()=>{
        test('should send error and status 401', done => {
          request(app)
            .post('/user/login')
            .send({email:'test@mail.com',password:'1'})
            .end((err, response) => {
              if (err) {
                console.log('There is some error: ', err);
                return done(err);
              } else {
                expect(response.status).toBe(401);
                expect(response.body).toHaveProperty('msg', 'username/password not found');
                return done();
              }
            });
        });        
      } )

      describe('login with password not match',()=>{
        test('should send error and status 401', done => {
          request(app)
            .post('/user/login')
            .send({email:'1@.com',password: 'test'})
            .end((err, response) => {
              if (err) {
                console.log('There is some error: ', err);
                return done(err);
              } else {
                expect(response.status).toBe(401);
                expect(response.body).toHaveProperty('msg', 'username/password not found');
                return done();
              }
            });
        });
      })
      describe('login without email/email empty',()=>{
        test('should send error and status 401', done => {
          request(app)
            .post('/user/login')
            .send({email:'test@mail.com',password:''})
            .end((err, response) => {
              if (err) {
                console.log('There is some error: ', err);
                return done(err);
              } else {
                expect(response.status).toBe(401);
                expect(response.body).toHaveProperty('msg', 'username/password not found');
                return done();
              }
            });
        });        
      } )

      describe('login without email/email empty',()=>{
        test('should send error and status 401', done => {
          request(app)
            .post('/user/login')
            .send({email:'',password: 'test'})
            .end((err, response) => {
              if (err) {
                console.log('There is some error: ', err);
                return done(err);
              } else {
                expect(response.status).toBe(401);
                expect(response.body).toHaveProperty('msg', 'username/password not found');
                return done();
              }
            });
        });
      } )

    });
  });
});
