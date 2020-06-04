"use strict";

const app = require('../app');
const request = require('supertest');
const {sequelize} = require('../models');
const {queryInterface} = sequelize;
const bycrypt = require('bcryptjs');

afterAll(done => {
    queryInterface.bulkDelete('Users', null, {})
        .then(()=> {
            console.log('db clean up ---');
            done();
        })
        .catch(err => {
            done(err);
        });
});

describe('User service', ()=> {
    describe('succes register', () => {
        describe('POST /user/register', () => {
            test('should return object with id and email and status 201', done => {
                const userInput = {
                    name : "test",
                    email : "test@gmail.com",
                    password : "testtest",
                    confirmPassword : "testtest"
                };
                request(app)
                    .post('/user/register')
                    .send(userInput)
                    .end((err, response) => {
                        if(err){
                            return done(err);
                        } else {
                            expect( response.status).toBe(201);
                            expect(response.body).toHaveProperty('id', expect.any(Number));
                            expect(response.body).toHaveProperty('email', userInput.email);
                            expect(response.body).not.toHaveProperty('password');
                            return done();
                        }
                    });
            });
        });
    });
    describe('error register', () => {
        describe('POST user/register', () => {
            test('should return error when password doesnt match with status 400', done => {
                const error = {type : "Bad Request",
                    code : 400,
                    msg : "Password and Confirm Password doesn't match"};
                const userInput = {
                    name : "test",
                    email : "test@gmail.com",
                    password : "testttest",
                    confirmPassword : "testtest"
                };
                request(app)
                    .post('/user/register')
                    .send(userInput)
                    .end((err, response) => {
                        if(err){
                            return done(err);
                        } else {
                            expect(response.status).toBe(400);
                            expect(response.body).toHaveProperty("msg", error.msg);
                            return done();
                        }
                    })
            })
            test('should return error if email exist with status 400', done => {
                const error = {type : "Bad Request",
                    code : 400,
                    msg : "Your email already exist"};
                const userInput = {
                    name : "test",
                    email : "test@gmail.com",
                    password : "testtest",
                    confirmPassword : "testtest"
                };
                request(app)
                    .post('/user/register')
                    .send(userInput)
                    .end((err, response) => {
                        if(err){
                            return done(err);
                        } else {
                            expect(response.status).toBe(400);
                            expect(response.body).toHaveProperty("msg", error.msg);
                            return done(null);
                        }
                    })
            })
            test('should return error if doesnt use valid email with status 400', (done) => {
                const error = {type : "Bad Request",
                    code : 400,
                    msg : "Your email doesn't valid, please use an email"};
                const userInput = {
                    name : "test",
                    email : "",
                    password : "testtest",
                    confirmPassword : "testtest"
                };
                request(app)
                    .post('/user/register')
                    .send(userInput)
                    .end((err, response) => {
                        if(err){
                            return done(err);
                        } else {
                            expect(response.status).toBe(400);
                            expect(response.body).toHaveProperty("msg", error.msg);
                            return done(null);
                        }
                    });
            });
            test('should return error when password less than 8 with status 400', (done) => {
                const error = {type : "Bad Request",
                    code : 400,
                    msg : "Password must be from 8 - 50 characters"};
                const userInput = {
                    name : "test",
                    email : "test2@mail.com",
                    password : "tes",
                    confirmPassword : "tes"
                };
                request(app)
                    .post('/user/register')
                    .send(userInput)
                    .end((err, response) => {
                        if(err){
                            return done(err);
                        } else {
                            expect(response.status).toBe(400);
                            expect(response.body).toHaveProperty("msg", error.msg);
                            return done(null);
                        }
                    });
            });
        });
    });
    describe("Succes Login", ()=> {
        describe("Post /user/login", ()=> {
            test("Should return token", done => {
                const userInput = {
                    email : "test@gmail.com",
                    password : "testtest"
                }
                request(app)
                    .post('/user/login')
                    .send(userInput)
                    .end((err, response) => {
                        if(err){
                            return done(err);
                        } else {
                            expect(response.status).toBe(202);
                            expect(response.body).toHaveProperty("acces_token", expect.any(String));
                            return done(null);
                        }
                    });
            });
        });
    });
    describe("Error Login", ()=> {
        describe("Post /user/login", () => {
            test("Should return error if password doesnt match with status 400", done => {
                const error = {type : "Bad Request",
                    code : 400,
                    msg : "Wrong Password"};
                const userInput = {
                    email : "test@gmail.com",
                    password : "test2test"
                }
                request(app)
                    .post('/user/login')
                    .send(userInput)
                    .end((err, response)=> {
                        if(err){
                            return done(err)
                        } else {
                            expect(response.status).toBe(400);
                            expect(response.body).toHaveProperty("msg", error.msg);
                            return done();
                        }
                    });
            });
            test("Should return error if user doesnt exist with status 400", done => {
                const error = {type : "Bad Request",
                    code : 400,
                    msg : "User Doesn't exist"};
                const userInput = {
                    email : "test123@gmail.com",
                    password : "test2test"
                }
                request(app)
                    .post('/user/login')
                    .send(userInput)
                    .end((err, response)=> {
                        if(err){
                            return done(err);
                        } else {
                            expect(response.status).toBe(400);
                            expect(response.body).toHaveProperty("msg", error.msg);
                            return done();
                        }
                    });
            });
        });
    })
});