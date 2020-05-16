const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;
const {generateToken} = require ('../helpers/jwt')
const{Product,User} = require('../models')
const bcrypt = require('bcryptjs')


afterAll(done => {
  queryInterface
  Product.destroy({ truncate: true, cascade: true, restartIdentity: true})
    .then(() => {
      console.log('Db clean up');
      done();
    })
    .catch(err => {
      console.log(err);
      done(err);
    });
});

const dataUser = {
  email: 'top@gmail.com',
  password: 'test'
};

// afterAll(done => {
//   queryInterface
//     .bulkDelete('Users')
//     .then(() => {
//       console.log('Db clean up ');
//       done();
//     })
//     .catch(err => {
//       console.log(err);
//       done(err);
//     });
// });

beforeAll(done => {
  const salt = bcrypt.genSaltSync(10);
  const dataUserHashPassword = bcrypt.hashSync(dataUser.password, salt);
  queryInterface
    .bulkInsert('Users', [
      {
        email: dataUser.email,
        password: dataUserHashPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
    .then(() => {
      console.log('User created: ' + dataUser.email);
      done();
    })
    .catch(err => {
      done(err);
    });
});

let payload ={
  id:1,
  email: 'top@gmail.com'
}
token = generateToken(payload)
console.log('*******************',token);

const newProduct={
  name : "Minyak goreng lagi",
  image_url:"test",
  price: 15000,
  stock: 10 }
describe('Product', () => {
  describe('POST /', () => {
    describe('success add product', () => {
      test('should send an object with product detail', done => {
        request(app)
          .post('/product')
          .set({'token':token})
          .send(newProduct)
          .end((err, response) => {
            if (err) {
              console.log('There is some error: ', err);
              return done(err);
            } else {
              expect(response.status).toBe(201);
              expect(response.body).toHaveProperty('id', expect.any(Number));
              expect(response.body).toHaveProperty('name', newProduct.name);
              expect(response.body).toHaveProperty('price', newProduct.price);
              expect(response.body).toHaveProperty('stock', newProduct.stock); 
              return done();
            }
          });
      });
    });
    
    describe('error Add product', () => {
      test('should send error and status 400 because missing name,image_url,price and stock', done => {
        const errors = [
          {
            message: 'Name require'
          },
          {
            message: 'Images require'
          },
          {
            message: 'Price require'
          },
          {
            message: 'stock require'
          }

        ];
        request(app)
          .post('/product')
          .set({'token':token})
          .end((err, response) => {
            if (err) {
              console.log('There is some error: ', err);
              return done(err);
            } else {
              expect(response.status).toBe(400);
              
              expect(response.body).toHaveProperty('errors', errors);
              return done();
            }
          });
      });
    });

    const newProduct1={
      image_url:"test",
      price: 15000,
      stock: 10 }
    describe('error Add product with name empty', () => {
      test('should send error and status 400 because missing name', done => {
        const errors = [
          {
            message: 'Name require'
          }

        ];
        request(app)
          .post('/product')
          .set({'token':token})
          .send(newProduct1)
          .end((err, response) => {
            if (err) {
              console.log('There is some error: ', err);
              return done(err);
            } else {
              expect(response.status).toBe(400);              
              expect(response.body).toHaveProperty('errors', errors);
              return done();
            }
          });
      });
    });  

    const newProduct2={
      name : "test",
      price: 15000,
      stock: 10 }
    describe('error Add product with Images_url empty', () => {
      test('should send error and status 400 because missing Images_url', done => {
        const errors = [
          {
            message: 'Images require'
          }

        ];
        request(app)
          .post('/product')
          .set({'token':token})
          .send(newProduct2)
          .end((err, response) => {
            if (err) {
              console.log('There is some error: ', err);
              return done(err);
            } else {
              expect(response.status).toBe(400);              
              expect(response.body).toHaveProperty('errors', errors);
              return done();
            }
          });
      });
    });  
    const newProduct3={
      name : "test",
      image_url:"test",
      stock: 10 }
    describe('error Add product with name price', () => {
      test('should send error and status 400 because missing price', done => {
           request(app)
          .post('/product')
          .set({'token':token})
          .send(newProduct3)
          .end((err, response) => {
            if (err) {
              console.log('There is some error: ', err);
              return done(err);
            } else {
              expect(response.status).toBe(400);              
              expect(response.body).toHaveProperty("errors",[{"message": "Price require"}]);
              return done();
            }
          });
      });
    });

    const newProduct4={
      name : "Test",
      image_url:"test",
      price: 14000 }
    describe('error Add product with stock empty', () => {
      test('should send error and status 400 because missing stock', done => {
        
        request(app)
          .post('/product')
          .set({'token':token})
          .send(newProduct4)
          .end((err, response) => {
            if (err) {
              console.log('There is some error: ', err);
              return done(err);
            } else {
              expect(response.status).toBe(400);              
              expect(response.body).toHaveProperty("errors",[{"message": "stock require"}]);
              return done();
            }
          });
      });
    });
  });


  describe('PUT /Product', () => {
    describe('Update Product', () => {
      test('should send Message and status 200', done => {
        request(app)
          .put('/product/1')
          .set({'token':token})
          .send({name : "Minyak goreng lagi",
                image_url:"test",
                price: 15000,
                stock: 10})
          .end((err, response) => {
            if (err) {
              console.log('There is some error: ', err);
              return done(err);
            } else {              
              expect(response.status).toBe(201);
              expect(response.body).toHaveProperty('msg', "Update Success");
              
              return done();
            }
          });
      });
    });

    describe('Failed Update Product', () => {
      describe('error Update product with name empty',()=>{
        test('should send Message and status 400', done => {
          request(app)
            .put('/product/1')
            .set({'token':token})
            .send({name : "",
                  image_url:"test",
                  price: 15000,
                  stock: 10})
            .end((err, response) => {
              if (err) {
                console.log('There is some error: ', err);
                return done(err);
              } else {              
                expect(response.status).toBe(400);
                expect(response.body).toHaveProperty('errors',  [{"message": "Validation notEmpty on name failed"}]);
                
                return done();
              }
            });
        });
      })
    });

    describe('Failed Update Product', () => {
      describe('error Update product with price < 0',()=>{
        test('should send Message and status 400', done => {
          request(app)
            .put('/product/1')
            .set({'token':token})
            .send({name : "Minyak goreng lagi",
                  price: -1,  
                  stock: 10})
            .end((err, response) => {
              if (err) {
                console.log('There is some error: ', err);
                return done(err);
              } else {              
                expect(response.status).toBe(400);
                expect(response.body).toHaveProperty('errors');
                
                return done();
              }
            });
        });
      })
    });
    describe('Failed Update Product', () => {
      describe('error Update product with stock  < 0',()=>{
        test('should send Message and status 400', done => {
          request(app)
            .put('/product/1')
            .set({'token':token})
            .send({name : "Minyak goreng lagi",
                  price: 15000,  
                  stock: -1})
            .end((err, response) => {
              if (err) {
                console.log('There is some error: ', err);
                return done(err);
              } else {              
                expect(response.status).toBe(400);
                expect(response.body).toHaveProperty('errors');
                
                return done();
              }
            });
        });
      })
    });
  });
  describe('Find All /Product', () => {
    describe('Find All Product', () => {
      test('should send json and status 200', done => {
        request(app)
          .get('/product')
          .end((err, response) => {
            if (err) {
              console.log('There is some error: ', err);
              return done(err);
            } else {              
              expect(response.status).toBe(201);
              expect(response.body).toHaveProperty('data');
              return done();
            }
          });
      });
    });
  });
  describe('DELETE /Product', () => {
    describe('Delete Product', () => {
      test('should send Message and status 200', done => {
        request(app)
          .delete('/product/1')
          .set({'token':token})
          .end((err, response) => {
            if (err) {
              console.log('There is some error: ', err);
              return done(err);
            } else {              
              expect(response.status).toBe(201);
              expect(response.body).toHaveProperty('msg', "Delete Success");
              
              return done();
            }
          });
      });
    });
  });
  
});
