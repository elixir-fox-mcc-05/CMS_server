const app = require("../app.js");
const request = require("supertest");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { generatePassword } = require("../helpers/bcrypt.js");

const users = require("../data/users.json").map((user) => {
  user.password = generatePassword(user.password);
  user.createdAt = new Date();
  user.updatedAt = new Date();
  return user;
});

afterAll((done) => {
  queryInterface
    .bulkDelete("Users")
    .then(() => {
      console.log("Db clean up <==========<");
      done();
    })
    .catch((err) => {
      done(err);
    });
});

describe("User Test", () => {
  beforeAll((done) => {
    queryInterface
      .bulkInsert("Users", users, {})
      .then(() => {
        console.log(`User Created: ${users}`);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  describe("Register", () => {
    describe("Success", () => {
      test("should return created user data and message with status code 201", (done) => {
        const userTest = {
          name: "dina",
          email: "dina@gmail.com",
          password: "zxcvb",
          role: "Admin",
          image_url: "google.com/image"
        };
        request(app)
          .post("/register")
          .send(userTest)
          .end((err, response) => {
            if (err) {
              return done(err);
            } else {
              let data = response.body.data;
              expect(response.status).toBe(201);
              expect(data).toHaveProperty("id", expect.any(Number));
              expect(data).toHaveProperty("name", userTest.name);
              expect(data).toHaveProperty("email", userTest.email);
              expect(data).not.toHaveProperty("password");
              expect(data).toHaveProperty("role", userTest.role);
              expect(data).toHaveProperty("image_url", userTest.image_url);
              return done();
            }
          });
      });
    });

    describe("Error", () => {
      test(`Missing required name, email, password, and image_url`, (done) => {
        const error = {
          code: 400,
          msg: "Image Url cannot be empty",
          type: "Bad Request"
        };
        request(app)
          .post("/register")
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

      test(`Name, Email, Image and Password is empty`, (done) => {
        const userTest = {
          name: "",
          email: "",
          password: "",
          role: "Admin",
          image_url: ""
        };
        const error = {
          code: 400,
          msg: "Name cannot be empty",
          type: "Bad Request"
        };
        request(app)
          .post("/register")
          .send(userTest)
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

      test(`Send email as boolean`, (done) => {
        const userTest = {
          name: "dina",
          email: true,
          password: 12313232,
          role: "Member",
          image_url: "google.com/image"
        };
        const error = {
          code: 400,
          msg: "Your email doesn't valid, please use an email",
          type: "Bad Request"
        };
        request(app)
          .post("/register")
          .send(userTest)
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

      test(`register with wrong role, role must be Super-admin, Admin or Member`, (done) => {
        const userTest = {
          name: "dina",
          email: "dina@mail.com",
          password: "asdja",
          role: "bukanRole",
          image_url: "google.com/image"
        };
        const error = { code: 400, type: "Bad Request" };
        request(app)
          .post("/register")
          .send(userTest)
          .end((err, response) => {
            if (err) {
              return done(err);
            } else {
              expect(response.status).toBe(400);
              expect(response.body).toHaveProperty("type", error.type);
              return done();
            }
          });
      });

      test(`Input is not email`, (done) => {
        const userTest = {
          name: "dina",
          email: "bukan email",
          password: "asd",
          role: "Admin",
          image_url: "google.com/image"
        };
        const error = {
          code: 400,
          msg: "Your email doesn't valid, please use an email",
          type: "Bad Request"
        };
        request(app)
          .post("/register")
          .send(userTest)
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

      test(`password < 5 character`, (done) => {
        const userTest = {
          name: "dina",
          email: "dina@gmail.com",
          password: "asd",
          role: "Admin",
          image_url: "google.com/image"
        };
        const error = {
          code: 400,
          msg: "Password must be from 8 - 50 characters",
          type: "Bad Request"
        };
        request(app)
          .post("/register")
          .send(userTest)
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

      test(`Email already in use`, (done) => {
        const error = {
          code: 400,
          msg: "Your email already exist",
          type: "Bad Request"
        };
        const userExist = {
          name: "naura",
          email: "naura@gmail.com",
          password: "naura",
          image_url: "google.com/image"
        };
        request(app)
          .post("/register")
          .send(userExist)
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

  describe("Login", () => {
    describe("Success", () => {
      test("Return user token", (done) => {
        const userTest = {
          email: "jihan@gmail.com",
          password: "zxcvb"
        };
        request(app)
          .post("/login")
          .send(userTest)
          .end((err, response) => {
            if (err) {
              return done(err);
            } else {
              expect(response.status).toBe(200);
              expect(response.body).toHaveProperty("token", expect.any(String));
              return done(null);
            }
          });
      });
    });

    describe("Error", () => {
      test(`if email not exist`, (done) => {
        const userTest = {
          email: "aaa@mail.com",
          password: "not exist"
        };
        const error = {
          code: 404,
          msg: "User Doesn't exist",
          type: "Bad Request"
        };
        request(app)
          .post("/login")
          .send(userTest)
          .end((err, response) => {
            if (err) {
              return done(err);
            } else {
              expect(response.status).toBe(404);
              expect(response.body).toHaveProperty("msg", error.msg);
              return done();
            }
          });
      });
    });
  });
});
