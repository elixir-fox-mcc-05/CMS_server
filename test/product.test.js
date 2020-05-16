const request = require ('supertest')
const app = require ('../app.js')
const { sequelize } = require('../models')
const { queryInterface } = sequelize


afterAll((done) => {
    queryInterface.bulkDelete('Products', null, {})
    .then(res => {
        console.log('DB cleanUP')
        done()
    })
    .catch(err => {
        done(err)
    })
})

describe('Product test', () => {
    describe('Adding product', () => {
        test('should return Add product success with code 201', (done)=>{
            request(app)
                .post('/product')
                .send({
                    name: "addProduct4",
                    description: "Product description",
                    imgUrl: "mememe",
                    price: 20000,
                    stock: 30,
                    category_id: 1
                })
                .end((err,res)=>{
                    if (err){
                        return done(err)
                    } else {
                        expect(res.status).toBe(201)
                        expect(res.body).toHaveProperty('msg', 'successfully adding product')
                        return done()
                    }
                })
        })
        test('Add product fail / user input product name with existing product', (done)=>{
            request(app)
                .post('/product')
                .send({
                    name: "addProduct4",
                    description: "Product description",
                    imgUrl: "mememe",
                    price: 20000,
                    stock: 30,
                    category_id: 1
                })
                .end((err,res)=>{
                    if (err){
                        return done(err)
                    } else {
                        expect(res.status).toBe(500)
                        expect(res.body).toHaveProperty('msg', 'Product name already exists')
                        return done()
                    }
                })
        })
        test("Add product fail / User doesn't fill all the input ", (done)=>{
            request(app)
                .post('/product')
                .send({
                    name: "New Product",
                    description: "",
                    imgUrl: "",
                    price: 20000,
                    stock: 30,
                    category_id: 1
                })
                .end((err,res)=>{
                    if (err){
                        return done(err)
                    } else {
                        expect(res.status).toBe(400)
                        expect(res.body).toHaveProperty('msg', 'all field require')
                        return done()
                    }
                })
        })
        test("Add product fail / User input price or category with minus number  ", (done)=>{
            request(app)
                .post('/product')
                .send({
                    name: "New 3",
                    description: "vfdv",
                    imgUrl: "fvdvd",
                    price: -30,
                    stock: -10,
                    category_id: 1
                })
                .end((err,res)=>{
                    if (err){
                        return done(err)
                    } else {
                        expect(res.status).toBe(400)
                        expect(res.body).toHaveProperty('msg', 'price or stock cannot be minus number')
                        return done()
                    }
                })
        })
    })
    describe('Editing product', () => {
        test('Should return Edit product success with code 201', (done)=>{
            request(app)
                .patch('/product/1')
                .send({
                    name: "Edited",
                    description: "Product description",
                    imgUrl: "mememe",
                    price: 20000,
                    stock: 30,
                    category_id: 1
                })
                .end((err,res)=>{
                    if (err){
                        return done(err)
                    } else {
                        expect(res.status).toBe(201)
                        expect(res.body).toHaveProperty('msg', 'Product updated')
                        return done()
                    }
                })
        })
        test("Edit product fail / User doesn't fill all the input ", (done)=>{
            request(app)
                .patch('/product/1')
                .send({
                    name: "New4",
                    description: "",
                    imgUrl: "",
                    price: 20000,
                    stock: 30,
                    category_id: 1
                })
                .end((err,res)=>{
                    if (err){
                        return done(err)
                    } else {
                        expect(res.status).toBe(400)
                        expect(res.body).toHaveProperty('msg', 'all field require')
                        return done()
                    }
                })
        })
        test("Edit product fail / User input price or category with minus number  ", (done)=>{
            request(app)
                .patch('/product/1')
                .send({
                    name: "New4",
                    description: "vfdv",
                    imgUrl: "fvdvd",
                    price: -30,
                    stock: -10,
                    category_id: 1
                })
                .end((err,res)=>{
                    if (err){
                        return done(err)
                    } else {
                        expect(res.status).toBe(400)
                        expect(res.body).toHaveProperty('msg', 'price or stock cannot be minus number')
                        return done()
                    }
                })
        })
    })
    describe('Showing product', ()=>{
        test('Should return code 201', (done)=> {
            request(app)
                .get('/product')
                .end((err,res)=> {
                    if(err) {
                        return done(err)
                    } else {
                        expect(res.status).toBe(200)
                        return done()
                    }
                })
        })
    })
    describe('Deleting product', ()=>{
        test('Should return message Product Delete code 200', (done)=> {
            request(app)
                .delete('/product/1')
                .end((err,res)=> {
                    if(err) {
                        return done(err)
                    } else {
                        expect(res.status).toBe(200)
                        expect(res.body).toHaveProperty('msg', 'Product Delete')
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