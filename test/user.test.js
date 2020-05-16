const app = require('../app.js');
const request = require('supertest');


describe('Register a user', function() {
    describe('Success:', function() {
    test('Should return status code 201 with result of JSON with keys (id, email)', function(done) {
        request(app)
        .post('/register')
        .send({
            email: 'arnold@gmail.com',
            password: '12345'
        })
        .set({
            Accept: 'application/json',
            access_token: 'token'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .expect(function (result) {
            let data = result.body;
            expect(data).toHaveProperty('email', 'arnold@gmail.com');
            expect(data).not.toHaveProperty('password');
        })
        .end(function(err) {
            if (err) {
            return done(err)
            } else {
            done()
            }
        })
    
    });
    });
});