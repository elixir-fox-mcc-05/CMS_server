const app = require("../app.js");
const request = require("supertest");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { generateToken } = require("../helpers/jwt");

const users = require("../data/users.json").map((user) => {
  user.createdAt = new Date();
  user.updatedAt = new Date();
  return user;
});

let tokenSuperAdmin;
let tokenAdmin;
let tokenMember;
let productId;
let userId;

beforeAll((done) => {
  queryInterface
    .bulkInsert("Users", users, { returning: true })
    .then((users) => {
      userId = users[0].id;
      tokenSuperAdmin = generateToken({
        id: users[0].id,
        email: users[0].email
      });
      tokenAdmin = generateToken({
        id: users[1].id,
        email: users[1].email
      });
      tokenMember = generateToken({
        id: users[2].id,
        email: users[2].email
      });

      const products = require("../data/products.json").map((product) => {
        product.createdAt = new Date();
        product.updatedAt = new Date();
        product.UserId = userId;
        return product;
      });

      return queryInterface
        .bulkInsert("Products", products, {
          returning: true
        })
        .then((result) => {
          productId = result[0].id;
          done();
        });
    })
    .catch((err) => {
      done(err);
    });
});

afterAll((done) => {
  queryInterface
    .bulkDelete("Products")
    .then(() => {
      console.log("Db Product clean up =====");
      return queryInterface.bulkDelete("Users");
    })
    .then(() => {
      console.log(`Db User Clean up =====`);
      done();
    })
    .catch((err) => {
      done(err);
    });
});

describe("Product Test", () => {
  describe("Add New Product", () => {
    describe("Success", () => {
      test("Should return new product data", (done) => {
        const newProduct = {
          name: "ipad",
          image_url: "google.com/image",
          price: 20000,
          stock: 12
        };
        request(app)
          .post("/product")
          .send(newProduct)
          .set("token", tokenSuperAdmin)
          .end((err, response) => {
            if (err) {
              return done(err);
            } else {
              let data = response.body.product;
              expect(response.status).toBe(201);
              expect(data).toHaveProperty("name", newProduct.name);
              expect(data).toHaveProperty("image_url", newProduct.image_url);
              expect(data).toHaveProperty("price", newProduct.price);
              expect(data).toHaveProperty("stock", newProduct.stock);
              return done();
            }
          });
      });
    });

    describe("Error", () => {
      test("Should return fail with status 400 and error message", (done) => {
        const error = {
          code: 400,
          msg: "Name cannot be empty",
          type: "Bad Request"
        };

        const newProduct = {
          name: "",
          image_url: "google.com/image",
          price: "string",
          stock: "string"
        };

        request(app)
          .post("/product")
          .send(newProduct)
          .set("token", tokenSuperAdmin)
          .end((err, response) => {
            if (err) {
              return done(err);
            } else {
              expect(response.status).toBe(400);
              expect(response.body).toHaveProperty("msg", error.msg);
              return done();
            }
          });
      });
    });
  });

  describe("Get All Product", () => {
    describe("Success", () => {
      test("Should return all products from database", (done) => {
        request(app)
          .get("/product")
          .set("token", tokenSuperAdmin)
          .end((err, response) => {
            if (err) {
              return done(err);
            } else {
              expect(response.status).toBe(200);
              expect(response.body).toHaveProperty("products");
              return done();
            }
          });
      });
    });
    describe("Error", () => {
      test("wrong url should return 404, ", (done) => {
        request(app)
          .get("/producta")
          .set("token", tokenSuperAdmin)
          .end((err, response) => {
            if (err) {
              return done(err);
            } else {
              expect(response.status).toBe(404);
              return done();
            }
          });
      });
    });
  });

  describe("Get One Product", () => {
    describe("Success", () => {
      test("Should return One products from database", (done) => {
        request(app)
          .get(`/product/${productId}`)
          .set("token", tokenSuperAdmin)
          .end((err, response) => {
            if (err) {
              return done(err);
            } else {
              expect(response.status).toBe(200);
              expect(response.body).toHaveProperty("product");
              return done();
            }
          });
      });
    });
    describe("Error", () => {
      test("wrong url should return 400", (done) => {
        request(app)
          .get("/product/675dsads")
          .set("token", tokenSuperAdmin)
          .end((err, response) => {
            if (err) {
              return done(err);
            } else {
              expect(response.status).toBe(400);
              return done();
            }
          });
      });
    });
  });

  describe("Update Product", () => {
    describe("Success", () => {
      test("should return the updated product", (done) => {
        const updateProduct = {
          name: "imac",
          image_url: "google.com/image",
          price: 25000,
          stock: 20
        };
        request(app)
          .put(`/product/${productId}`)
          .send(updateProduct)
          .set("token", tokenSuperAdmin)
          .end((err, response) => {
            if (err) {
              return done(err);
            } else {
              expect(response.status).toBe(201);
              expect(response.body).toHaveProperty(
                "msg",
                "Product succesfully updated"
              );
              return done();
            }
          });
      });
    });
    describe("Failure", () => {
      test("should return 400", (done) => {
        const updateProduct = {
          name: "imac",
          image_url: "google.com/image",
          price: 25000,
          stock: 10
        };
        const error = {
          code: 400,
          msg: "Only valid integer from 1 is accepted",
          type: "Bad Request"
        };
        request(app)
          .put(`/product/asda785`)
          .send(updateProduct)
          .set("token", tokenSuperAdmin)
          .end((err, response) => {
            if (err) {
              return done(err);
            } else {
              let data = response.body;
              expect(response.status).toBe(400);
              expect(data).toHaveProperty("msg", error.msg);
              return done();
            }
          });
      });
      test("should return 401 unauthorized invalid access token", (done) => {
        const newProduct = {
          name: "imac",
          image_url: "google.com/image",
          price: 25000,
          stock: 10
        };
        const error = {
          code: "401",
          msg: "You are not authorized to use this feature",
          type: "Unauthorized"
        };
        request(app)
          .put(`/product/${productId}`)
          .send(newProduct)
          .set("token", tokenMember)
          .end((err, response) => {
            if (err) {
              return done(err);
            } else {
              let data = response.body;
              expect(response.status).toBe(401);
              expect(data).toHaveProperty("msg", error.msg);
              return done();
            }
          });
      });
    });
  });

  describe("Delete Product", () => {
    describe("Success", () => {
      test("should return message succes delete product", (done) => {
        request(app)
          .delete(`/product/${productId}`)
          .set("token", tokenSuperAdmin)
          .end((err, response) => {
            if (err) {
              return done(err);
            } else {
              expect(response.status).toBe(200);
              expect(response.body).toHaveProperty(
                "msg",
                "Product succesfully deleted"
              );
              return done();
            }
          });
      });
    });
    describe("Failure", () => {
      test("should return 400", (done) => {
        const error = {
          code: 400,
          msg: "Only valid integer from 1 is accepted",
          type: "Bad Request"
        };
        request(app)
          .delete(`/product/asda785`)
          .set("token", tokenSuperAdmin)
          .end((err, response) => {
            if (err) {
              return done(err);
            } else {
              let data = response.body;
              expect(response.status).toBe(400);
              expect(data).toHaveProperty("msg", error.msg);
              return done();
            }
          });
      });
      test("should return 401 unauthorized invalid access token", (done) => {
        const error = {
          code: "401",
          msg: "You are not authorized to use this feature",
          type: "Unauthorized"
        };
        request(app)
          .put(`/product/${productId}`)
          .set("token", tokenMember)
          .end((err, response) => {
            if (err) {
              return done(err);
            } else {
              let data = response.body;
              expect(response.status).toBe(401);
              expect(data).toHaveProperty("msg", error.msg);
              return done();
            }
          });
      });
    });
  });
});
