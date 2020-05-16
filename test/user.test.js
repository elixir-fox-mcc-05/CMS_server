const app  = require('../app.js')
const request = require('supertest')

const { User, sequelize } = require('../models')
const { queryInterface } = sequelize

//Describe, expect, dan test are done here with JEST
describe('User Routes Test', () => {
    const newUserData = {
        email: "archie@gmail.com",
        password: "archie888"
    }

    const dummyUser = {
        email: "oreo@gmail.com",
        password: "oreo888"
    }

    beforeAll(done => {
        // Saat mulai, kita buatkan existing dummy user dulu sebagai simulasi. Kita bisa gunakan ini untuk simulasi validasi unique email
        // Clears the database and adds some testing data.
        // Jest will wait for this promise to resolve before running tests.
        User.create(dummyUser)
        .then(_ => {
          done()
        })
        .catch(err => {
          done(err)
        })
    });

    afterAll(done => {
        // Di sini kita akan menghapus semua data yang sudah kita masukkan
        queryInterface.bulkDelete('Users', {})
         .then(_ => {
            done()
         })
         .catch(err =>{
            done(err)
         })
    })


    describe('POST /register - create new user', () => {
        test('Code 201 Successful register - New user created. Returning id and email', (done) =>{
            // SUPERTEST STARTS HERE WITH REQUEST
            request(app)
                .post('/register')
                .send(newUserData)
                .end((err,response) => {
                    if(err){
                        return done(err) // Jika gagal, tunjukkan server error-nya di terminal
                    } else {
                        // console.log( '+ ', response.error , '+', response.status,' >>>> ',response.body )// Jika berhasil, maka kita cek dengan beberapa expectation
                        expect(response.status).toBe(201)
                        expect(response.body).toHaveProperty('id', expect.any(Number))
                        expect(response.body).toHaveProperty('email', newUserData.email)
                        expect(response.body).not.toHaveProperty('password')
                        return done()
                    }
                })
        })
    })

    describe('POST /register - create new user', () => {
        test('Code 400 register fail - email is empty/null', (done) =>{
            // SUPERTEST STARTS HERE WITH REQUEST
            const userEmailEmpty = {
                email: null,
                password: "password123"
            }
            
            request(app)
                .post('/register')
                .send(userEmailEmpty)
                .end((err,response) => {
                    if(err){
                        return done(err) // Jika gagal, tunjukkan server error-nya di terminal
                    } else {
                        // console.log("============", response.body)
                        // console.log( '+ ', response.error , '+', response.status,' >>>> ',response.body )// Jika berhasil, maka kita cek dengan beberapa expectation
                        expect(response.status).toBe(400)
                        expect(response.body.errors).toEqual(
                            expect.arrayContaining([
                                expect.objectContaining({message: "Please specify an email"})
                            ])
                        ) 
                        return done()
                    }
                })
        })
    })

    describe('POST /register - create new user', () => {
        test('Code 400 register fail - email is not unique', (done) =>{
            // SUPERTEST STARTS HERE WITH REQUEST
            const identicalEmail = {
                email: "oreo@gmail.com",
                password: "oreo888"
            }
            
            request(app)
                .post('/register')
                .send(identicalEmail)
                .end((err,response) => {
                    if(err){
                        return done(err) // Jika gagal, tunjukkan server error-nya di terminal
                    } else {
                        // console.log("============", response.body)
                        // console.log( '+ ', response.error , '+', response.status,' >>>> ',response.body )// Jika berhasil, maka kita cek dengan beberapa expectation
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('message', 'oreo@gmail.com already exists')
                        return done()
                    }
                })
        })
    })

    describe('POST /register - create new user', () => {
        test('Code 400 register fail - email is not using proper email format', (done) =>{
            // SUPERTEST STARTS HERE WITH REQUEST
            const improperEmailFormat = {
                email: "oreomailcom",
                password: "oreo888"
            }
            
            request(app)
                .post('/register')
                .send(improperEmailFormat)
                .end((err,response) => {
                    if(err){
                        return done(err) // Jika gagal, tunjukkan server error-nya di terminal
                    } else {
                        // console.log("============", response.body)
                        // console.log( '+ ', response.error , '+', response.status,' >>>> ',response.body )// Jika berhasil, maka kita cek dengan beberapa expectation
                        expect(response.status).toBe(400)
                        expect(response.body.errors).toEqual(
                            expect.arrayContaining([
                                expect.objectContaining({message: "Please use a proper @ email format"})
                            ])  
                        ) 
                        return done()
                    }
                })
        })
    })

    describe('POST /register - create new user', () => {
        test('Code 400 register fail - password is empty', (done) =>{
            // SUPERTEST STARTS HERE WITH REQUEST
            const emptyPassword = {
                email: "oreo@gmailcom",
                password: ""
            }
            
            request(app)
                .post('/register')
                .send(emptyPassword)
                .end((err,response) => {
                    if(err){
                        return done(err) // Jika gagal, tunjukkan server error-nya di terminal
                    } else {
                        // console.log("============", response.body)
                        // console.log( '+ ', response.error , '+', response.status,' >>>> ',response.body )// Jika berhasil, maka kita cek dengan beberapa expectation
                        expect(response.status).toBe(400)
                        expect(response.body.errors).toEqual(
                            expect.arrayContaining([
                                expect.objectContaining({message: "Please specify a proper password"})
                            ])  
                        ) 
                        return done()
                    }
                })
        })
    })

    describe('POST /register - create new user', () => {
        test('Code 400 register fail - password lacks minimum length', (done) =>{
            // SUPERTEST STARTS HERE WITH REQUEST
            const emptyPassword = {
                email: "oreo@gmailcom",
                password: "a"
            }
            
            request(app)
                .post('/register')
                .send(emptyPassword)
                .end((err,response) => {
                    if(err){
                        return done(err) // Jika gagal, tunjukkan server error-nya di terminal
                    } else {
                        // console.log("============", response.body)
                        // console.log( '+ ', response.error , '+', response.status,' >>>> ',response.body )// Jika berhasil, maka kita cek dengan beberapa expectation
                        expect(response.status).toBe(400)
                        expect(response.body.errors).toEqual(
                            expect.arrayContaining([
                                expect.objectContaining({message: "The password length should be between 4 and 12 characters."})
                            ])  
                        ) 
                        return done()
                    }
                })
        })
    })

    describe('POST /login - Login a user', () => {
        test('Code 200 login successful - returning an access_token', (done) =>{
            // SUPERTEST STARTS HERE WITH REQUEST
            const signInUser = {
                email: "archie@gmail.com",
                password: "archie888"
            }
            
            request(app)
                .post('/login')
                .send(signInUser)
                .end((err,response) => {
                    if(err){
                        return done(err) // Jika gagal, tunjukkan server error-nya di terminal
                    } else {
                        // console.log("============", response.body)
                        // console.log( '+ ', response.error , '+', response.status,' >>>> ',response.body )// Jika berhasil, maka kita cek dengan beberapa expectation
                        expect(response.status).toBe(200)
                        expect(response.body).toHaveProperty('access_token', expect.any(String)) 
                        return done()
                    }
                })
        })
    })

    describe('POST /login - Login a user', () => {
        test('Code 400 login fail - not returning an access_token', (done) =>{
            // SUPERTEST STARTS HERE WITH REQUEST
            const wrongPassword = {
                email: "archie@gmail.com",
                password: "aaaaaaa"
            }
            
            request(app)
                .post('/login')
                .send(wrongPassword)
                .end((err,response) => {
                    if(err){
                        return done(err) // Jika gagal, tunjukkan server error-nya di terminal
                    } else {
                        // console.log("============", response.body)
                        // console.log( '+ ', response.error , '+', response.status,' >>>> ',response.body )// Jika berhasil, maka kita cek dengan beberapa expectation
                        expect(response.status).toBe(400)
                        expect(response.body).not.toHaveProperty('access_token') 
                        expect(response.body).toHaveProperty('error', 'Invalid password/email') 
                        return done()
                    }
                })
        })
    })
    
})