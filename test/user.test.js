const app = require('../app');
const request = require('supertest');

const { queryInterface } = require('../models').sequelize;

describe('User Sign In and Sign Up', () => {
  beforeAll(() => {
    queryInterface.bulkDelete('Users');
  });

  // ============================================
  // Test cases
  // ============================================
  const inputSignup = {
    name: 'Yudha',
    email: 'yudha@mail.com',
    password: '123',
  };

  const inputSignupEmpty = {
    name: '',
    email: '',
    password: '',
  };

  const inputSignin = {
    email: 'yudha@mail.com',
    password: '123',
  };

  const inputSigninEmpty = {
    email: '',
    password: '',
  };

  const inputSigninNull = {
    email: null,
    password: null,
  };

  const inputSigninWrongEmail = {
    email: '',
    password: '123',
  };

  const inputSigninWrongPassword = {
    email: 'yudhaA@mail.com',
    password: 'abc',
  };

  describe('=> Sign Up success', () => {
    describe('> Sign Up success!', () => {
      test('Should create a new user and return CreatedUser. (201).', (done) => {
        request(app)
          .post('/signup')
          .send(inputSignup)
          .expect((data) => {
            const status = data.status;
            const CreatedUser = data.body.CreatedUser;
            expect(status).toEqual(201);
            expect(CreatedUser).toHaveProperty('name', inputSignup.name);
            expect(CreatedUser).toHaveProperty('email', inputSignup.email);
            expect(CreatedUser).toHaveProperty('role', 'customer');
          })
          .end((err) => {
            if (err) {
              return done(err);
            } else {
              done();
            }
          });
      });
    });
  });

  describe('=> Sign Up failed', () => {
    describe('> Sign Up failed input empty', () => {
      test('Should return bad request. All error messages (400).', (done) => {
        request(app)
          .post('/signup')
          .send(inputSignupEmpty)
          .expect((data) => {
            const status = data.status;
            const error = data.body;
            const expected = [
              { message: 'Please insert name' },
              { message: 'Name at least 3 characters, max 15' },
              { message: 'Please insert correct email format' },
              { message: 'Please insert email' },
              { message: 'Please insert password' },
              { message: 'Password at least 3 characters, max 15' },
            ];
            expect(status).toEqual(400);
            expect(error).toHaveProperty('code', 400);
            expect(error).toHaveProperty('type', 'BAD REQUEST');
            expect(error).toHaveProperty('message', expected);
          })
          .end((err) => {
            if (err) {
              return done(err);
            } else {
              done();
            }
          });
      });
    });

    describe('> Sign Up failed input null', () => {
      test('Should return bad request. All error messages (400).', (done) => {
        request(app)
          .post('/signup')
          .send(inputSigninNull)
          .expect((data) => {
            const status = data.status;
            const error = data.body;
            const expected = [
              { message: 'Please insert name' },
              { message: 'Please insert email' },
              { message: 'Please insert password' },
            ];
            expect(status).toEqual(400);
            expect(error).toHaveProperty('code', 400);
            expect(error).toHaveProperty('type', 'BAD REQUEST');
            expect(error).toHaveProperty('message', expected);
          })
          .end((err) => {
            if (err) {
              return done(err);
            } else {
              done();
            }
          });
      });
    });

    describe('> Sign Up failed email already exist', () => {
      test('Should return bad request. Email already exists (400).', (done) => {
        request(app)
          .post('/signup')
          .send(inputSignup)
          .expect((data) => {
            const status = data.status;
            const error = data.body;
            expect(status).toEqual(400);
            expect(error).toHaveProperty('code', 400);
            expect(error).toHaveProperty('type', 'BAD REQUEST');
            expect(error).toHaveProperty('message', 'Email already in use');
          })
          .end((err) => {
            if (err) {
              return done(err);
            } else {
              done();
            }
          });
      });
    });
  });

  describe('=> Sign In success', () => {
    describe('> Sign In success!', () => {
      test('Should signed in and get an access token. (200).', (done) => {
        request(app)
          .post('/signin')
          .send(inputSignin)
          .expect((data) => {
            const status = data.status;
            const body = data.body;
            expect(status).toEqual(200);
            expect(body).toHaveProperty('access_token');
          })
          .end((err) => {
            if (err) {
              return done(err);
            } else {
              done();
            }
          });
      });
    });
  });

  describe('=> Sign In failed', () => {
    describe('> Sign In failed input empty', () => {
      test('Should return bad request. Invalid email/password error messages (400).', (done) => {
        request(app)
          .post('/signin')
          .send(inputSigninEmpty)
          .expect((data) => {
            const status = data.status;
            const error = data.body;
            expect(status).toEqual(400);
            expect(error).toHaveProperty('code', 400);
            expect(error).toHaveProperty('type', 'BAD REQUEST');
            expect(error).toHaveProperty(
              'message',
              'Opps!, invalid email / password'
            );
          })
          .end((err) => {
            if (err) {
              done(err);
            } else {
              done();
            }
          });
      });
    });

    describe('> Sign In failed input wrong email', () => {
      test('Should return bad request. Invalid email/password error messages (400).', (done) => {
        request(app)
          .post('/signin')
          .send(inputSigninWrongEmail)
          .expect((data) => {
            const status = data.status;
            const error = data.body;
            expect(status).toEqual(400);
            expect(error).toHaveProperty('code', 400);
            expect(error).toHaveProperty('type', 'BAD REQUEST');
            expect(error).toHaveProperty(
              'message',
              'Opps!, invalid email / password'
            );
          })
          .end((err) => {
            if (err) {
              done(err);
            } else {
              done();
            }
          });
      });
    });

    describe('> Sign In failed input wrong password', () => {
      test('Should return bad request. Invalid email/password error messages (400).', (done) => {
        request(app)
          .post('/signin')
          .send(inputSigninWrongPassword)
          .expect((data) => {
            const status = data.status;
            const error = data.body;
            expect(status).toEqual(400);
            expect(error).toHaveProperty('code', 400);
            expect(error).toHaveProperty('type', 'BAD REQUEST');
            expect(error).toHaveProperty(
              'message',
              'Opps!, invalid email / password'
            );
          })
          .end((err) => {
            if (err) {
              done(err);
            } else {
              done();
            }
          });
      });
    });
  });

  afterAll(() => {
    queryInterface.bulkDelete('Users');
  });
});
