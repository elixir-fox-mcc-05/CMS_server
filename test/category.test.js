const app = require(`../app`)
const request = require(`supertest`)
const { queryInterface } = require('../models/index.js').sequelize;
const sinon = require('sinon');
const jwt = require('jsonwebtoken');


let mockCategory = {
    name : `Kelabang`
}
let mockUser = {
    name : `testadmin`,
    email : `testadmin@mail.com`,
    password : `12345`,
    role : `Admin`
}
let idUser  = ``;
let idCategory  = ``;
let token;
describe(`Product router`, function() {
    beforeAll(function(done) {
        request(app).post('/users/register').send(mockUser).then( result=>{
            iduser = result.body.id
            request(app).post('/users/login').send(mockUser).end((err, response)=> {
                token = response.body.cmsaccesstoken; // save the token!
                done();
            })
        })
    });
    /////////
    /////////
    // CMSAccess_token : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlRlc3QiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE1ODkyNjk2NzV9.tkOOCjj7k0sqjMbGvo0g3OpJl4MDrDmYcLuNBlBcK_I`,
    describe(` Create a category`, function() {
        // --> //
        describe(`Fail : `, function() {
            test(`add new category, should not work with no jsonwebtoken supplied`, function (done){
                request(app)
                    .post(`/categories/add`)
                    .send(mockCategory)
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
            test(`add mock category`, function (done){
                request(app)
                    .post(`/categories/add`)
                    .set('cmsaccesstoken', token)
                    .send(mockCategory)
                    .set(`Accept`,`application/json`)
                    .expect(201)
                    .expect(`Content-Type`, /json/)
                    .expect( function (result)  {
                        let data = result.body;
                        idCategory = result.body.id
                        expect(data).toHaveProperty(`id`);
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

    describe(` Edit a category`, function() {
    // --> //
        describe(`Fail : `, function() {
            test(`edit mock category wihtout jwebtoken, should return error`, function (done){
                request(app)
                    .put(`/categories/edit`)
                    .send({
                        id :  idCategory,
                        name : `Kalajengking`
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
            test(`edit mock category with invalid jwebtoken, should return error`, function (done){
                request(app)
                    .put(`/categories/edit`)
                    .set('cmsaccesstoken', `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTc1LCJuYW1lIjoiUnVkb2xwaCIsInJvbGUiOiJwdWJsaWMiLCJpYXQiOjE1ODkyNzY0NzR9.gKscEeEaeHxnkqY9-tH-Ii3gD0NAEl1tzMzXh7rLtNM`)
                    .send({
                        id :  idCategory,
                        name : `Kalajengking`
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
            test(`edit mock category, should return updated value`, function (done){
                request(app)
                    .put(`/categories/edit`)
                    .set('cmsaccesstoken', token)
                    .send({
                        id :  idCategory,
                        name : `Kalajengking`
                    })
                    .set(`Accept`,`application/json`)
                    .expect(202)
                    .expect(`Content-Type`, /json/)
                    .expect( function (result)  {
                        let data = result.body;
                        // console.log(result)
                        expect(data.name).toBe(`Kalajengking`);
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
        .then(_ => {
            done();
        })
        .catch(err => {
            done(err);
        });
    });
})