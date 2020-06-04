"use strict";
const app = require('../app');
const request = require('supertest');
const {sequelize} = require('../models');
const {queryInterface} = sequelize;
const {generateToken} = require('../helpers/jwt');

let token;
let tokenAdmin;
function generateName(){
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( var i = 0; i < 15; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
jest.setTimeout(10000);

describe("error handling product and category feature", ()=> {
    beforeAll(done => {
        const dataUser = [
            {
                name : "test",
                email : "yodji000@gmail.com",
                password : "$2a$15$qfZE3BWVPG7j54fdoqueY.rdd3O9AmGsmsja/Y6hhKghPUtK9PEyG",
                RoleId : 2,
                createdAt : new Date(),
                updatedAt : new Date()
            },
            {
                name : "test",
                email : "yodji000009@gmail.com",
                password : "$2a$15$qfZE3BWVPG7j54fdoqueY.rdd3O9AmGsmsja/Y6hhKghPUtK9PEyG",
                RoleId : 1,
                createdAt : new Date(),
                updatedAt : new Date()
            }
        ];
        queryInterface.bulkInsert("Users", dataUser, {returning : true})
            .then(result => {
                token = generateToken({
                    id : result[1].id,
                    email : result[1].email
                });
                tokenAdmin = generateToken({
                    id : result[0].id,
                    email : result[0].email
                });
                done();
            })
            .catch(err => {
                done(err);
            });
    });
    test("Authentication check should return error with code 400", done => {
        request(app)
            .get('/category')
            .end((err, response) => {
                if(err){
                    console.log(err);
                    return done(err);
                } else {
                    expect(response.status).toBe(400);
                    expect(response.body).toHaveProperty("msg", "Please Login First");
                    return done();
                }
            });
    });
    test("Authorization check should return error with code 401", done => {
        request(app)
            .delete('/category/4')
            .set('token', token)
            .end((err, response) => {
                if(err){
                    console.log(err);
                    return done(err);
                } else {
                    expect(response.status).toBe(401);
                    expect(response.body).toHaveProperty("msg", "You are not authorized to use this feature");
                    return done();
                }
            });
    });
    test("Validation name Product if empty, status code 400", done => {
        const Input = {
            name : '',
            image_url : generateName(),
            price : 10000,
            stock : 10000,
            CategoryId : 2
        };
        request(app)
            .post('/product')
            .set('token', tokenAdmin)
            .send(Input)
            .end((err, response) => {
                if(err){
                    return done(err);
                } else {
                    expect(response.status).toBe(400);
                    expect(response.body).toHaveProperty("msg", "Name cannot be empty");
                    return done();
                }
            });
    });
    test("Validation name Category if empty, status code 400", done => {
        const Input = {
            name : '',
        };
        request(app)
            .post('/category')
            .set('token', tokenAdmin)
            .send(Input)
            .end((err, response) => {
                if(err){
                    return done(err)
                } else {
                    expect(response.status).toBe(400);
                    expect(response.body).toHaveProperty("msg", "Name cannot be empty");
                    return done();
                }
            });
    });
    test("Validation image url Product if empty, status code 400", done => {
        const Input = {
            name : generateName(),
            image_url : '',
            price : 10000,
            stock : 10000,
            CategoryId : 2
        };
        request(app)
            .post('/product')
            .set('token', tokenAdmin)
            .send(Input)
            .end((err, response) => {
                if(err){
                    return done(err);
                } else {
                    expect(response.status).toBe(400);
                    expect(response.body).toHaveProperty("msg", "Image Url cannot be empty");
                    return done();
                }
            });
    });
    test("Validation price Product if less than 1 or empty, status code 400", done => {
        const Input = {
            name : generateName(),
            image_url : generateName(),
            price : "tret",
            stock : 10000,
            CategoryId : 2
        };
        request(app)
            .post('/product')
            .set('token', tokenAdmin)
            .send(Input)
            .end((err, response) => {
                if(err){
                    return done(err);
                } else {
                    expect(response.status).toBe(400);
                    expect(response.body).toHaveProperty("msg", "Only valid integer from 1 is accepted");
                    return done();
                }
            });
    });
    test("Validation price Product if less than 1 or empty, status code 400", done => {
        const Input = {
            name : generateName(),
            image_url : generateName(),
            price : 1000,
            stock : 0,
            CategoryId : 2
        };
        request(app)
            .post('/product')
            .set('token', tokenAdmin)
            .send(Input)
            .end((err, response) => {
                if(err){
                    return done(err);
                } else {
                    expect(response.status).toBe(400);
                    expect(response.body).toHaveProperty("msg", "Only valid integer from 1 is accepted");
                    return done();
                }
            });
    });
    test("Validation price and stock Product if not number, status code 400", done => {
        const Input = {
            name : generateName(),
            image_url : generateName(),
            price : "erewr",
            stock : "ewqewq",
            CategoryId : 2
        };
        request(app)
            .post('/product')
            .set('token', tokenAdmin)
            .send(Input)
            .end((err, response) => {
                if(err){
                    return done(err);
                } else {
                    expect(response.status).toBe(400);
                    expect(response.body).toHaveProperty("msg", "Only valid integer from 1 is accepted");
                    return done();
                }
            });
    });
});