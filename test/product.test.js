const app = require(`../app`)
const request = require(`supertest`)
const { queryInterface } = require('../models/index.js').sequelize;
const sinon = require('sinon');
const jwt = require('jsonwebtoken');


let mockItem = {
    name : `Baju`,
    price : `5`,
    stock : `5`,
    CategoryId : `1`
}
let mockUser = {
    name : `test`,
    email : `testcat@mail.com`,
    password : `12345`,
    role : `seller`
}
let mockCategories = [{
    id : `1`,
    name : `Jengking`,
    createdAt : new Date(),
    updatedAt : new Date()
}]
let iduser  = ``;
let iditem  = ``;
let token;
describe(`Product router`, function() {
    beforeAll(function(done) {
        request(app).post('/users/register').send(mockUser).then( result=>{
            iduser = result.body.id
            request(app).post('/users/login').send(mockUser).end((err, response)=> {
                token = response.body.cmsaccesstoken; // save the token!
                queryInterface.bulkInsert('Categories', mockCategories, {
                    returning: true
                })
                    .then(result => {
                      done();
                    })
                    .catch(err => {
                      done(err);
                    })
            })
        })
    });
    /////////
    /////////
    // CMSAccess_token : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlRlc3QiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE1ODkyNjk2NzV9.tkOOCjj7k0sqjMbGvo0g3OpJl4MDrDmYcLuNBlBcK_I`,
    describe(` create a product`, function() {
        // --> //
        describe(`Fail : `, function() {
            test(`add new product, should not work with no jsonwebtoken supplied`, function (done){
                request(app)
                    .post(`/products/add`)
                    .send(mockItem)
                    .set(`Accept`,`application/json`)
                    .expect(401)
                    .expect(`Content-Type`, /json/)
                    .expect( function (result)  {
                        let data = result.body;
                        expect(data).toHaveProperty(`error`);
                        expect(data.error).toBe(`not logged in`);
                    })
                    .end(function(err){
                        if(err){
                            return done(err)
                        } else {
                            done()
                        }
                    })
            })
        })

        describe(`Success : `, function() {
            test(`add mock product`, function (done){
                request(app)
                    .post(`/products/add`)
                    .set('cmsaccesstoken', token)
                    .send(mockItem)
                    .set(`Accept`,`application/json`)
                    .expect(201)
                    .expect(`Content-Type`, /json/)
                    .expect( function (result)  {
                        let data = result.body;
                        iditem = result.body.id
                        expect(data).toHaveProperty(`UserId`);
                    })
                    .end(function(err){
                        if(err){
                            return done(err)
                        } else {
                            done()
                        }
                    })
            })
        })
    })

    describe(` Edit a product`, function() {
    // --> //
        describe(`Fail : `, function() {
            test(`edit mock product without jwebtoken, should return error`, function (done){
                request(app)
                    .put(`/products/edit`)
                    .send({
                        id :  iditem,
                        name : `Baja`,
                        price : `5`,
                        stock : `5`,
                        CategoryId : `1`
                    })
                    .set(`Accept`,`application/json`)
                    .expect(401)
                    .expect(`Content-Type`, /json/)
                    .expect( function (result)  {
                        let data = result.body;
                        // console.log(result)
                        expect(data.error).toBe(`not logged in`);
                    })
                    .end(function(err){
                        if(err){
                            return done(err)
                        } else {
                            done()
                        }
                    })
            })
        })

        describe(`Fail : `, function() {
            test(`edit mock product with invalid jwebtoken, should return error`, function (done){
                request(app)
                    .put(`/products/edit`)
                    .set('cmsaccesstoken', `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTc1LCJuYW1lIjoiUnVkb2xwaCIsInJvbGUiOiJwdWJsaWMiLCJpYXQiOjE1ODkyNzY0NzR9.gKscEeEaeHxnkqY9-tH-Ii3gD0NAEl1tzMzXh7rLtNM`)
                    .send({
                        id :  iditem,
                        name : `Baja`,
                        price : `5`,
                        stock : `5`,
                        CategoryId : `1`
                    })
                    .set(`Accept`,`application/json`)
                    .expect(400)
                    .expect(`Content-Type`, /json/)
                    .expect( function (result)  {
                        let data = result.body;
                        expect(data).toHaveProperty(`error`);
                    })
                    .end(function(err){
                        if(err){
                            return done(err)
                        } else {
                            done()
                        }
                    })
            })
        })

        describe(`Success : `, function() {
            test(`edit mock product, should return updated value`, function (done){
                request(app)
                    .put(`/products/edit`)
                    .set('cmsaccesstoken', token)
                    .send({
                        id :  iditem,
                        name : `Baja`,
                        price : `5`,
                        stock : `5`,
                        CategoryId : `1`
                    })
                    .set(`Accept`,`application/json`)
                    .expect(202)
                    .expect(`Content-Type`, /json/)
                    .expect( function (result)  {
                        let data = result.body;
                        // console.log(result)
                        expect(data.name).toBe(`Baja`);
                    })
                    .end(function(err){
                        if(err){
                            return done(err)
                        } else {
                            done()
                        }
                    })
            })
        })
    // <-- //
    })
    describe(` Delete a product`, function() {
    // --> //
        describe(`Fail : `, function() {
            test(`Delete mock product wihtout jwebtoken, should return error`, function (done){
                request(app)
                    .delete(`/products/delete`)
                    .send({
                        id :  iditem
                    })
                    .set(`Accept`,`application/json`)
                    .expect(401)
                    .expect(`Content-Type`, /json/)
                    .expect( function (result)  {
                        let data = result.body;
                        // console.log(result)
                        expect(data.error).toBe(`not logged in`);
                    })
                    .end(function(err){
                        if(err){
                            return done(err)
                        } else {
                            done()
                        }
                    })
            })
        })

        describe(`Fail : `, function() {
            test(`delete mock product with invalid jwebtoken, should return error`, function (done){
                request(app)
                    .delete(`/products/delete`)
                    .set('cmsaccesstoken', `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTc1LCJuYW1lIjoiUnVkb2xwaCIsInJvbGUiOiJwdWJsaWMiLCJpYXQiOjE1ODkyNzY0NzR9.gKscEeEaeHxnkqY9-tH-Ii3gD0NAEl1tzMzXh7rLtNM`)
                    .send({
                        id :  iditem
                    })
                    .set(`Accept`,`application/json`)
                    .expect(400)
                    .expect(`Content-Type`, /json/)
                    .expect( function (result)  {
                        let data = result.body;
                        expect(data).toHaveProperty(`error`);
                    })
                    .end(function(err){
                        if(err){
                            return done(err)
                        } else {
                            done()
                        }
                    })
            })
        })

        describe(`Success : `, function() {
            test(`delete mock product, should return 'item deleted'`, function (done){
                request(app)
                    .delete(`/products/delete`)
                    .set('cmsaccesstoken', token)
                    .send({
                        id :  iditem
                    })
                    .set(`Accept`,`application/json`)
                    .expect(200)
                    .expect(`Content-Type`, /json/)
                    .expect( function (result)  {
                        let data = result.body;
                        expect(data.message).toBe(`Item deleted`);
                    })
                    .end(function(err){
                        if(err){
                            return done(err)
                        } else {
                            done()
                        }
                    })
            })
        })
    // <-- //
    })
    /////////
    /////////
    afterAll(function(done) {
        queryInterface.bulkDelete('Users')
        queryInterface.bulkDelete('Categories')
        queryInterface.bulkDelete('Products')
        .then(_ => {
            done();
        })
        .catch(err => {
            done(err);
        });
    });
})