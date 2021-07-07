const request = require ('supertest')
const app = require ('../app.js')

describe ('User test', () => {
  describe ('User Login test', () => {
    test ('User Login test success ', (done) =>{
        request(app)
          .post('/user/login')
          .send({
            username: "admin",
            password: "admin"
          })
          .end((err,res)=> {
            if (err) {
              return done(err)
            } else {
              expect(res.status).toBe(200)
              expect(res.body).toHaveProperty('token', expect.any(String))
              return done()
            }
          })
    })
    test ('User Login test Failed ', (done) =>{
      request(app)
        .post('/user/login')
        .send({
          username: "admin",
          password: "adm"
        })
        .end((err,res)=> {
          if (err) {
            return done(err)
          } else {
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('msg', 'wrong username/password')
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