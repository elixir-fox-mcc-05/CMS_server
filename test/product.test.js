"use strict";
const app = require('../app');
const request = require('supertest');
const {sequelize} = require('../models');
const {queryInterface} = sequelize;
const {generateToken} = require('../helpers/jwt');

afterAll(done => {
    queryInterface.bulkDelete('Products', null, {})
        .then(()=> {
            console.log('db Products clean up ---');
            return queryInterface.bulkDelete('Categories', null, {})
        })
        .then(()=> {
          console.log('db Categories clean up')
          done();
        })
        .catch(err => {
            done(err);
        });
});

let token;
let idProduct;
let idCategory;
function generateName(){
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( var i = 0; i < 15; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

describe ("Testing Product and Category", ()=> {
    describe("Test succes Product and Category feature", () => {
      beforeAll(done => {
        const dataCategory = [
        {
          name: generateName(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: generateName(),
          createdAt: new Date(),
          updatedAt: new Date()
        }]
        const dataUser = [
        {
            name : "test",
            email : "yodji@gmail.com",
            password : "$2a$15$qfZE3BWVPG7j54fdoqueY.rdd3O9AmGsmsja/Y6hhKghPUtK9PEyG",
            RoleId : 2,
            createdAt : new Date(),
            updatedAt : new Date()
        },
        {
            name : "test",
            email : "yodji09@gmail.com",
            password : "$2a$15$qfZE3BWVPG7j54fdoqueY.rdd3O9AmGsmsja/Y6hhKghPUtK9PEyG",
            RoleId : 1,
            createdAt : new Date(),
            updatedAt : new Date()
        }];
        queryInterface.bulkInsert('Categories', dataCategory, {returning:true})
          .then(category => {
            idCategory = category[0].id
            const dataProduct = [
                {name : "Tracking Shoes Eagle",
                image_url : "https://ecs7.tokopedia.net/img/cache/700/product-1/2020/1/3/84810752/84810752_4e865fb5-b770-4257-a4fa-d0e434cbaf99_900_900",
                price : 2500000,
                stock : 100,
                CategoryId : idCategory,
                createdAt : new Date(),
                updatedAt : new Date()
                },
                {name : "Kitchen Knife Set",
                image_url : "https://images-na.ssl-images-amazon.com/images/I/71P0lGwQ%2BSL._AC_SY679_.jpg",
                price : 300000,
                stock : 42,
                CategoryId : idCategory,
                createdAt : new Date(),
                updatedAt : new Date()
            }
           ];
            return queryInterface.bulkInsert("Products", dataProduct, {returning : true})
          })
          .then(result => {
              idProduct = result[0].id;
              return queryInterface.bulkInsert("Users", dataUser, {returning : true});
          })
          .then(result => {
              token = generateToken({
                  id : result[0].id,
                  email : result[0].email
              });
              done();
          })
          .catch(err => {
              done(err);
          });
      })
        test("Should return array with detailed category", done => {
            request(app)
                .get('/category')
                .set('token', token)
                .end((err, response) => {
                    if(err){
                        return done(err);
                    } else {
                        expect(response.status).toBe(200);
                        expect(response.body).toHaveProperty("Category", expect.any(Array));
                        return done();
                    }
                });
        });
        test("Should return array with detailed product", done => {
            request(app)
                .get('/product')
                .set('token', token)
                .end((err, response) => {
                    if(err){
                        return done(err);
                    } else {
                        expect(response.status).toBe(200);
                        expect(response.body).toHaveProperty("Product", expect.any(Array));
                        return done();
                    }
                });
        });
        test("Should return object with id category", done => {
            request(app)
                .get('/category/41')
                .set('token', token)
                .end((err, response) => {
                    if(err){
                        return done(err);
                    } else {
                        expect(response.status).toBe(200);
                        expect(response.body).toHaveProperty("Category", expect.any(Object));
                        return done();
                    }
                });
        });
        test("Should return object with id product", done => {
            request(app)
                .get(`/product/${idProduct}`)
                .set('token', token)
                .end((err, response) => {
                    if(err){
                        return done(err);
                    } else {
                        expect(response.status).toBe(200);
                        expect(response.body).toHaveProperty("Product", expect.any(Object));
                        return done();
                    }
                });
        });
        test("Should return object after create category", done => {
            const AdminInput = {
                name : generateName(),
            };
            request(app)
                .post('/category')
                .set('token', token)
                .send(AdminInput)
                .end((err, response) => {
                    if(err){
                        return done(err);
                    } else {
                        idCategory = response.body.Category.id;
                        expect(response.status).toBe(201);
                        expect(response.body).toHaveProperty("Category", expect.any(Object));
                        return done();
                    }
                });
        });
        test("Should return object after create product", done => {
            const AdminInput = {
                name : generateName(),
                image_url : generateName(),
                price : 1000000,
                stock : 24,
                CategoryId : idCategory
            };
            request(app)
                .post('/product')
                .set('token', token)
                .send(AdminInput)
                .end((err, response) => {
                    if(err){
                        return done(err);
                    } else {
                        expect(response.status).toBe(201);
                        expect(response.body).toHaveProperty("Product", expect.any(Object));
                        return done();
                    }
                });
        });
        test("Should return object after Edit category", done => {
            const AdminInput = {
                name : generateName(),
            };
            request(app)
                .put(`/category/${idCategory}`)
                .set('token', token)
                .send(AdminInput)
                .end((err, response) => {
                    if(err){
                        return done(err);
                    } else {
                        expect(response.status).toBe(202);
                        expect(response.body).toHaveProperty("Category", expect.any(Object));
                        return done();
                    }
                });
        });
        test("Should return object after edit product", done => {
            const AdminInput = {
                name : generateName(),
                image_url : generateName(),
                price : 1000000,
                stock : 24,
                CategoryId : idCategory
            };
            request(app)
                .put(`/product/${idProduct}`)
                .set('token', token)
                .send(AdminInput)
                .end((err, response) => {
                    if(err){
                        return done(err);
                    } else {
                        expect(response.status).toBe(202);
                        expect(response.body).toHaveProperty("Product", expect.any(Object));
                        return done();
                    }
                });
        });
        test("Should return object after delete category", done => {
            request(app)
                .delete(`/category/${idCategory}`)
                .set('token', token)
                .end((err, response) => {
                    if(err){
                        return done(err);
                    } else {
                        expect(response.status).toBe(202);
                        expect(response.body).toHaveProperty("message", expect.any(String));
                        return done();
                    }
                });
        });
        test("Should return object after delete product", done => {
            request(app)
                .delete(`/product/${idProduct}`)
                .set('token', token)
                .end((err, response) => {
                    if(err){
                        return done(err);
                    } else {
                        expect(response.status).toBe(202);
                        expect(response.body).toHaveProperty("message", expect.any(String));
                        return done();
                    }
                });
        });
    });
});