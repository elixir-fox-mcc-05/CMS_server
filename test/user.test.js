const app = require(`../app`)
const request = require(`supertest`)
const { queryInterface } = require('../models/index.js').sequelize;
const sinon = require('sinon');
const jwt = require('jsonwebtoken');

describe(`user router`, function() {
    beforeAll(function(done) {
      queryInterface.bulkDelete('Users')
        .then(_ => {
          done();
        })
        .catch(err => {
          done(err);
        });
    });
    /////////
    describe(` register a user`, function() {
    // --> //
        describe(`Success : `, function() {
            test(`Register new user, should return name email`, function (done){
                request(app)
                    .post(`/users/register`)
                    .send({
                        name : `Rudolph`,
                        email : `test@mail.com`,
                        password : `123456`,
                        role : `Admin`
                    })
                    .set(`Accept`,`application/json`)
                    .expect(201)
                    .expect(`Content-Type`, /json/)
                    .expect( function (result)  {
                        let data = result.body;
                        expect(data.name).toBe(`Rudolph`);
                        expect(data.email).toBe(`test@mail.com`);
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
            test(`Register duplicate user, should return validation error`, function (done){
                request(app)
                    .post(`/users/register`)
                    .send({
                        name : `Rudolph`,
                        email : `test@mail.com`,
                        password : `123456`
                    })
                    .set(`Accept`,`application/json`)
                    .expect(500)
                    .expect(`Content-Type`, /json/)
                    .expect( function (result)  {
                        let data = result.body;
                        expect(data.error).toBe(`Email is used, use login instead`);
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
            test(`Register invalid pass, should return validation error`, function (done){
                request(app)
                    .post(`/users/register`)
                    .send({
                        name : `Rudolph`,
                        email : `test2@mail.com`,
                        password : `123`
                    })
                    .set(`Accept`,`application/json`)
                    .expect(500)
                    .expect(`Content-Type`, /json/)
                    .expect( function (result)  {
                        let data = result.body;
                        expect(data.error).toBe(`Validation error: Password should be between 4 to 12 characters`);
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
            test(`Register invalid email, should return validation error`, function (done){
                request(app)
                    .post(`/users/register`)
                    .send({
                        name : `Rudolph`,
                        email : `tasadil.com`,
                        password : `12345`
                    })
                    .set(`Accept`,`application/json`)
                    .expect(500)
                    .expect(`Content-Type`, /json/)
                    .expect( function (result)  {
                        let data = result.body;
                        expect(data.error).toBe(`Validation error: Re-check your email formatting`);
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
    describe(`Login a user`, function() {
        describe(`Success : `, function() {
            sinon.stub(jwt, 'sign').returns('Hash_JWT');
            sinon.stub(jwt, 'verify').returns({email: 'test@mail.com'}) // returns di hardcode

            test(`Login, should return CMSAcess_token`, function (done){
                request(app)
                    .post(`/users/login`)
                    .send({
                        email : `test@mail.com`,
                        password : `123456`
                    })
                    .set(`Accept`,`application/json`)
                    .expect(200)
                    .expect(`Content-Type`, /json/)
                    .expect( function (result)  {
                        let data = result.body;
                        expect(data).toHaveProperty(`cmsaccesstoken`,`Hash_JWT`);
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

        describe(`Failed : `, function() {

            test(`Login with invalid pass, should return error`, function (done){
                request(app)
                    .post(`/users/login`)
                    .send({
                        email : `test@mail.com`,
                        password : `12346`
                    })
                    .set(`Accept`,`application/json`)
                    .expect(400)
                    .expect(`Content-Type`, /json/)
                    .expect( function (result)  {
                        let data = result.body;
                        expect(data.error).toBe(`Invalid email & password combination`);
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

        describe(`Failed : `, function() {

            test(`Login unregistered email, should return error`, function (done){
                request(app)
                    .post(`/users/login`)
                    .send({
                        email : `atest@mail.com`,
                        password : `123456`
                    })
                    .set(`Accept`,`application/json`)
                    .expect(500)
                    .expect(`Content-Type`, /json/)
                    .expect( function (result)  {
                        let data = result.body;
                        expect(data.error).toBe(`Unregistered email supplied`);
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
    /////////
    afterAll(function(done) {
        queryInterface.bulkDelete('Users')
        .then(_ => {
            done();
        })
        .catch(err => {
            done(err);
        });
    });
})



