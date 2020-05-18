const app = require('../app')
const request = require('supertest')
const { User, Product } = require('../models')
const { queryInterface } = require('../models/index.js').sequelize
const { encryptPassword } = require('../helpers/bcrypt')

afterAll((done)=> {
    User.destroy({ truncate: true, cascade: true, restartIdentity: true})
    .then(()=> {
        done()
    })
    .catch(err=> {
        done(err)
    })
})

beforeAll((done)=> {
    queryInterface.bulkInsert('Users', [
        {
            email: "admin1@mail.com",
            password: encryptPassword('admin1'),
            role: 'admin',
            createdAt: new Date(),
            updatedAt: new Date()
        },{
            email: "admin2@mail.com",
            password: encryptPassword('admin2'),
            role: 'admin',
            createdAt: new Date(),
            updatedAt: new Date()
        },{
            email: "admin3@mail.com",
            password: encryptPassword('admin3'),
            role: 'admin',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ])
    .then(()=> {
        done()
    })
    .catch(err => {
        done(err)
    })
})

describe('User Router', () => {
    describe('POST/users/register', ()=> {
        describe('customer success register', ()=> {
            test('should return status 201 and  object with id,email,role,token ', (done)=> {
                request(app)
                .post('/users/register')
                .send({
                    email: 'jeje@mail.com',
                    password: 'qweqwe'
                })
                .end((err, res) => {
                    if(err){
                        return done(err)
                    }
                    else{
                        expect(res.status).toBe(201);
                        expect(res.body).toHaveProperty('id', expect.any(Number));
                        expect(res.body).toHaveProperty('email', 'jeje@mail.com');
                        expect(res.body).toHaveProperty('role', 'customer');
                        expect(res.body).toHaveProperty('access_token', expect.any(String));
                        expect(res.body).not.toHaveProperty('password');
                        return done()
                    }
                })
            })
        })
        describe('error register', ()=> {
            test('should return error with status 400 because email already exists', (done) => {
                const errors = [{ message: "Email already exists" }]    
            
                request(app)
                .post('/users/register')
                .send({
                    email: 'jeje@mail.com',
                    password: 'qweqwe'
                })
                .end((err, res) => {
                    if(err){
                        return done(err)
                    }
                    else{
                        expect(res.status).toBe(400);
                        expect(res.body).toHaveProperty('errors', errors);
                        return done()
                    }
                })
            })
            test('should return error with status 400 because missing email', (done) => {
                const errors = [{ message: "Email is required" }]    
            
                request(app)
                .post('/users/register')
                .send({
                    password: 'qweqwe'
                })
                .end((err, res) => {
                    if(err){
                        return done(err)
                    }
                    else{
                        expect(res.status).toBe(400);
                        expect(res.body).toHaveProperty('errors', errors);
                        return done()
                    }
                })
            })
            test('should return error with status 400 because missing password', (done) => {
                const errors = [{ message: "Password is required" }]    
            
                request(app)
                .post('/users/register')
                .send({
                    email: 'jeje@mail.com'
                })
                .end((err, res) => {
                    if(err){
                        return done(err)
                    }
                    else{
                        expect(res.status).toBe(400);
                        expect(res.body).toHaveProperty('errors', errors);
                        return done()
                    }
                })
            })
            test('should return error with status 400 because passwords length less than 3 characters', (done) => {
                const errors = [{ message: "Password must be 3-10 Characters" }]    
            
                request(app)
                .post('/users/register')
                .send({
                    email: 'jeje@mail.com',
                    password: 'qw'
                })
                .end((err, res) => {
                    if(err){
                        return done(err)
                    }
                    else{
                        expect(res.status).toBe(400);
                        expect(res.body).toHaveProperty('errors', errors);
                        return done()
                    }
                })
            })
            test('should return error with status 400 because email is not valid', (done) => {
                const errors = [{ message: "Input valid email" }]    
            
                request(app)
                .post('/users/register')
                .send({
                    email: 'jejemail.com',
                    password: 'qweqwe'
                })
                .end((err, res) => {
                    if(err){
                        return done(err)
                    }
                    else{
                        expect(res.status).toBe(400);
                        expect(res.body).toHaveProperty('errors', errors);
                        return done()
                    }
                })
            })
        })
    })
    describe('POST/users/login', () => {
        describe('Success login admin', ()=> {
            test('should return status 200 and  object with id,email,role,token ', (done)=> {
                request(app)
                .post('/users/login')
                .send({
                    email: 'admin1@mail.com',
                    password: 'admin1'
                })
                .end((err, res) => {
                    if(err){
                        return done(err)
                    }
                    else{
                        expect(res.status).toBe(200);
                        expect(res.body).toHaveProperty('id', expect.any(Number));
                        expect(res.body).toHaveProperty('email', 'admin1@mail.com');
                        expect(res.body).toHaveProperty('role', 'admin');
                        expect(res.body).toHaveProperty('access_token', expect.any(String));
                        expect(res.body).not.toHaveProperty('password');
                        return done()
                    }
                })
            })
        })
        describe('Success login customer', ()=> {
            test('should return status 200 and  object with id,email,role,token ', (done)=> {
                request(app)
                .post('/users/login')
                .send({
                    email: 'jeje@mail.com',
                    password: 'qweqwe'
                })
                .end((err, res) => {
                    if(err){
                        return done(err)
                    }
                    else{
                        expect(res.status).toBe(200);
                        expect(res.body).toHaveProperty('id', expect.any(Number));
                        expect(res.body).toHaveProperty('email', 'jeje@mail.com');
                        expect(res.body).toHaveProperty('role', 'customer');
                        expect(res.body).toHaveProperty('access_token', expect.any(String));
                        expect(res.body).not.toHaveProperty('password');
                        return done()
                    }
                })
            })
        })
        describe('Error login', ()=> {
            test('should return status 400 because invalid email or password', (done)=> {
                const errors = [{ message: "Invalid email/password" }]
                request(app)
                .post('/users/login')
                .send({
                    email: 'admin1@mail.com',
                    password: 'admin'
                })
                .end((err, res) => {
                    if(err){
                        return done(err)
                    }
                    else{
                        expect(res.status).toBe(400);
                        expect(res.body).toHaveProperty('errors', errors);
                        return done()
                    }
                })
            })
            test('should return status 500 because email or password is null', (done)=> {
                const errors = [{ message: {} }]
                request(app)
                .post('/users/login')
                .send({
                    email: 'admin1@mail.com'
                })
                .end((err, res) => {
                    if(err){
                        return done(err)
                    }
                    else{
                        expect(res.status).toBe(500);
                        expect(res.body).toHaveProperty('errors', errors);
                        return done()
                    }
                })
            })
        })
    })
})