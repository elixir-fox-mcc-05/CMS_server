const app = require('../app.js');
const request = require('supertest');

const jwt = require('jsonwebtoken');
const { encrypt } = require('../helpers/bcrypt.js');

const { queryInterface } = require('../models/index.js').sequelize;

describe('User Router', function() {
    let fakePeople = require('../users.json');
    fakePeople.forEach(el => {
        el.password = encrypt(el.password);
        el['createdAt'] = new Date();
        el['updatedAt'] = new Date();
    });

    beforeAll(function(done) {
        queryInterface.bulkInsert('Users', fakePeople, {
            returning: true
        })
            .then(newUsers => {
                done();
            })
            .catch(err => {
                done(err);
            })
    });

    describe('Login user from website', function() {
        describe('Success', function() {
            test('Should return 200 status code with token ', function(done) {
                request(app)
                .post('/users/login')
                .send({
                    email: 'irene@gmail.com',
                    password: '123123'
                })
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    let data = res.body;
                    expect(data).toHaveProperty('Token');
                })
                .end(function(err) {
                    if (err) {
                        return done(err)
                    } else {
                        return done()
                    }
                })
            })
        });

        describe('Failed', function() {
            test('Should return 400 status code with result', function(done) {
                request(app)
                .post('/users/login')
                .send({
                    email: 'John@gmail.com',
                    password: '123'
                })
                .expect(400)
                .expect('Content-Type', /json/)
                .expect(function(result) {
                    let data = result.body;
                    expect(data.message).toContain('Email or password is wrong')
                })
                .end(function(err) {
                    if (err) {
                        return done(err)
                    } else {
                        return done()
                    }
                })
            });
        });
    });

    afterAll(function(done) {
        queryInterface.bulkDelete('Users')
            .then(_ => {
                done();
            })
            .catch(err => {
                done(err);
            })
    });
});