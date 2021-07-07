const request = require ('supertest')
const app = require ('../app.js')
const { sequelize } = require('../models')
const { queryInterface } = sequelize

afterAll((done) => {
    queryInterface.bulkDelete('Categories', null, {})
    .then(res => {
        console.log('DB cleanUP')
        done()
    })
    .catch(err => {
        done(err)
    })
})

describe('Category test', () =>{
    describe('Add category', () =>{
        test('Add Category test Success', (done) => {
            request(app)
                .post('/category')
                .send({
                    name : 'newCategory'
                })
                .end((err,res) =>{
                    if (err) {
                        return done(err)
                    } else {
                        expect(res.status).toBe(201)
                        expect(res.body).toHaveProperty('msg', 'Category Created')
                        return done()
                    }
                })
        })
        test("Add Category test Fail / user doesn't input category name ", (done) => {
            request(app)
                .post('/category')
                .send({
                    name : ''
                })
                .end((err,res) =>{
                    if (err) {
                        return done(err)
                    } else {
                        expect(res.status).toBe(400)
                        expect(res.body).toHaveProperty('msg', 'please input category name')
                        return done()
                    }
                })
        })
    })
    describe('Edit category', () =>{
        test("should return message Category updated with code 201", (done) =>{
            request(app)
                .patch('/category/1')
                .send({
                    name : 'edited'
                })
                .end((err,res) =>{
                    if (err) {
                        return done(err)
                    } else {
                        expect(res.status).toBe(201)
                        expect(res.body).toHaveProperty('msg', 'Category updated')
                        return done()
                    }
                })
        })
        test("Edit Category test Fail / user doesn't input category name ", (done) => {
            request(app)
                .post('/category')
                .send({
                    name : ''
                })
                .end((err,res) =>{
                    if (err) {
                        return done(err)
                    } else {
                        expect(res.status).toBe(400)
                        expect(res.body).toHaveProperty('msg', 'please input category name')
                        return done()
                    }
                })
        })
    })
    describe('Show category', () =>{
        test("should return code 200", (done) =>{
            request(app)
                .get('/category')
                .end((err,res) =>{
                    if (err) {
                        return done(err)
                    } else {
                        expect(res.status).toBe(200)
                        return done()
                    }
                })
        }) 
    })
    describe('Delete category', () =>{
        test("should return message Category Deleted with code 200", (done) =>{
            request(app)
                .delete('/category/1')
                .end((err,res) =>{
                    if (err) {
                        return done(err)
                    } else {
                        expect(res.status).toBe(200)
                        expect(res.body).toHaveProperty('msg', 'Category Deleted')
                        return done()
                    }
                })
        }) 
    })
})

/* 
    notes :
        after run this test you have to delete the database
        and recreate the database to run the test again,
        run this commands on your terminal : 

        -- NODE_ENV=test sequelize db:drop
        -- NODE_ENV=test sequelize db:create
        -- NODE_ENV=test sequelize db:migrate
        -- NODE_ENV=test sequelize db:seed:all
*/