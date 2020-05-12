const app = require('../app')
const request = require('supertest')
const { User, Product } = require('../models')
const { queryInterface } = require('../models/index.js').sequelize
const { encryptPassword } = require('../helpers/bcrypt')

let productId;
let adminAccess_token= '';
let customerAccess_token = '';

afterAll((done)=> {
	Product.destroy({ truncate: true, cascade: true, restartIdentity: true})
	.then(()=> {
        return User.destroy({ truncate: true, cascade: true, restartIdentity: true})
    })
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
		},
		{
            email: "jeje@mail.com",
            password: encryptPassword('qweqwe'),
            role: 'customer',
            createdAt: new Date(),
            updatedAt: new Date()
		}
	])
	.then(()=> {
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
				adminAccess_token = res.body.access_token
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
						customerAccess_token = res.body.access_token
						return done()
					}
				})
			}
		})
    })
    .catch(err => {
        done(err)
    })
})

describe('Product Router', () => {
	describe('POST/products', () => {
		describe('Success add new product', () => {
			const message = 'New Product Successfully added'
			test('Should return status 201 and object of product result', (done) => {
				request(app)
				.post('/products')
				.set('access_token', adminAccess_token)
				.send({
					name: 'Red Bag',
					image_url: 'https://m.media-amazon.com/images/I/61AqF1+KZDL._SR500,500_.jpg',
					price: 350000,
					stock: 17,
					category: 'bag', 
				})
				.end((err, res) => {
					if(err){
						return done(err)
					}
					else {
						product = res.body.product
						expect(res.status).toBe(201)
						expect(res.body).toHaveProperty('msg', message)
						expect(product).toHaveProperty('id', expect.any(Number))
						expect(product).toHaveProperty('name', 'Red Bag')
						expect(product).toHaveProperty('image_url', 'https://m.media-amazon.com/images/I/61AqF1+KZDL._SR500,500_.jpg')
						expect(product).toHaveProperty('price', 350000)
						expect(product).toHaveProperty('stock', 17)
						expect(product).toHaveProperty('category', 'bag')
						return done()
					}
				})
			})
			test('Should return status 201 and object of product result with default image Url value', (done) => {
				request(app)
				.post('/products')
				.set('access_token', adminAccess_token)
				.send({
					name: 'High Heels',
					price: 400000,
					stock: 24,
					category: 'shoes', 
				})
				.end((err, res) => {
					if(err){
						return done(err)
					}
					else {
						product = res.body.product
						expect(res.status).toBe(201)
						expect(res.body).toHaveProperty('msg', message)
						expect(product).toHaveProperty('id', expect.any(Number))
						expect(product).toHaveProperty('name', 'High Heels')
						expect(product).toHaveProperty('image_url', 'https://stafsite.untad.ac.id/images/noimage.jpg')
						expect(product).toHaveProperty('price', 400000)
						expect(product).toHaveProperty('stock', 24)
						expect(product).toHaveProperty('category', 'shoes')
						return done()
					}
				})
			})
		})
		describe('Fail add new product', () => {
			test('Should return status 401 because customer not authorized', (done) => {
				const errors = [{ message: "User not authorized" }]
				request(app)
				.post('/products')
				.set('access_token', customerAccess_token)
				
				.send({
					name: 'Red Bag',
					image_url: 'https://m.media-amazon.com/images/I/61AqF1+KZDL._SR500,500_.jpg',
					price: 400000,
					stock: 24,
					category: 'bag', 
				})
				.end((err, res) => {
					if(err){
						return done(err)
					}
					else {
						expect(res.status).toBe(401)
						expect(res.body).toHaveProperty('errors', errors);
						return done()
					}
				})
			})
			test('Should return status 401 because access_token is null', (done) => {
				const errors = [{ message: "Please login first" }]
				request(app)
				.post('/products')
				.send({
					name: 'Red Bag',
					image_url: 'https://m.media-amazon.com/images/I/61AqF1+KZDL._SR500,500_.jpg',
					price: 400000,
					stock: 24,
					category: 'bag', 
				})
				.end((err, res) => {
					if(err){
						return done(err)
					}
					else {
						expect(res.status).toBe(401)
						expect(res.body).toHaveProperty('errors', errors);
						return done()
					}
				})
			})
			test('Should return status 400 because one of the keys is empty/ null', (done) => {
				const errors = [{ message: "Name is required" }]
				request(app)
				.post('/products')
				.set('access_token', adminAccess_token)
				.send({
					image_url: 'https://m.media-amazon.com/images/I/61AqF1+KZDL._SR500,500_.jpg',
					price: 400000,
					stock: 24,
					category: 'bag', 
				})
				.end((err, res) => {
					if(err){
						return done(err)
					}
					else {
						expect(res.status).toBe(400)
						expect(res.body).toHaveProperty('errors', errors);
						return done()
					}
				})
			})
			test('Should return status 400 because value of price or stock is less than 0', (done) => {
				const errors = [{ message: "Value should be greater than  0" }]
				request(app)
				.post('/products')
				.set('access_token', adminAccess_token)
				.send({
					name: 'Red Bag',
					image_url: 'https://m.media-amazon.com/images/I/61AqF1+KZDL._SR500,500_.jpg',
					price: 400000,
					stock: -2,
					category: 'bag', 
				})
				.end((err, res) => {
					if(err){
						return done(err)
					}
					else {
						expect(res.status).toBe(400)
						expect(res.body).toHaveProperty('errors', errors);
						return done()
					}
				})
			})
			test('Should return status 400 because category is not valid', (done) => {
				const errors = [{ message: "Category is not valid" }]
				request(app)
				.post('/products')
				.set('access_token', adminAccess_token)
				.send({
					name: 'Black Dead Note',
					image_url: 'https://cf.shopee.co.id/file/63f71e8a432baf58e910b58f6149277d',
					price: 10000,
					stock: 90,
					category: 'notebook', 
				})
				.end((err, res) => {
					if(err){
						return done(err)
					}
					else {
						expect(res.status).toBe(400)
						expect(res.body).toHaveProperty('errors', errors);
						return done()
					}
				})
			})
		})
	})
	describe('GET/products', () => {
		describe('Success get all products', () => {
			test('Should return status 200 and object of products', (done) => {
				request(app)
				.get('/products')
				.end((err, res) => {
					if(err){
						return done(err)
					}
					else {
						expect(res.status).toBe(200)
						return done()
					}
				})
			})
		})
	})
	describe('GET/products/:id', () => {
		describe('Success get one product', () => {
			test('Should return status 200 and object of product result', (done) => {
				const productId = 1
				request(app)
				.get(`/products/${productId}`)
				.end((err, res) => {
					if(err){
						return done(err)
					}
					else {
						expect(res.status).toBe(200)
						return done()
					}
				})
			})
		})
		describe('Error get one product', () => {
			test('Should return status 404 because product not found', (done) => {
				const errors = [{ message: "Product not found" }]
				let productId = 10000
				request(app)
				.get(`/products/${productId}`)
				.end((err, res) => {
					if(err){
						return done(err)
					}
					else {
						expect(res.status).toBe(404)
						expect(res.body).toHaveProperty('errors', errors);
						return done()
					}
				})
			})
		})
	})
	describe('PUT/products/:id', () => {
		describe('Success update one product', () => {
			test('Should return status 200 and object of edited product', (done) => {
				let productId = 1
				request(app)
				.put(`/products/${productId}`)
				.set('access_token', adminAccess_token)
				.send({
					name: 'Red Bag Edited',
					image_url: 'https://m.media-amazon.com/images/I/61AqF1+KZDL._SR500,500_.jpg',
					price: 400000,
					stock: 24,
					category: 'bag', 
				})
				.end((err, res) => {
					if(err){
						return done(err)
					}
					else {
						expect(res.status).toBe(200)
						expect(res.body).toHaveProperty('msg', 'Product Successfully Updated')
						return done()
					}
				})
			})
		})
		describe('Error update one product', () => {
			test('Should return status 401 because customer not authorized', (done) => {
				const errors = [{ message: "User not authorized" }]
				let productId = 1
				request(app)
				.put(`/products/${productId}`)
				.set('access_token', customerAccess_token)
				
				.send({
					name: 'Red Bag',
					image_url: 'https://m.media-amazon.com/images/I/61AqF1+KZDL._SR500,500_.jpg',
					price: 400000,
					stock: 24,
					category: 'bag', 
				})
				.end((err, res) => {
					if(err){
						return done(err)
					}
					else {
						expect(res.status).toBe(401)
						expect(res.body).toHaveProperty('errors', errors);
						return done()
					}
				})
			})
			test('Should return status 401 because access_token is null', (done) => {
				const errors = [{ message: "Please login first" }]
				let productId = 1
				request(app)
				.put(`/products/${productId}`)
				.send({
					name: 'Red Bag',
					image_url: 'https://m.media-amazon.com/images/I/61AqF1+KZDL._SR500,500_.jpg',
					price: 400000,
					stock: 24,
					category: 'bag', 
				})
				.end((err, res) => {
					if(err){
						return done(err)
					}
					else {
						expect(res.status).toBe(401)
						expect(res.body).toHaveProperty('errors', errors);
						return done()
					}
				})
			})
			test('Should return status 400 because value of price or stock is less than 0', (done) => {
				const errors = [{ message: "Value should be greater than  0" }]
				let productId = 1
				request(app)
				.put(`/products/${productId}`)
				.set('access_token', adminAccess_token)
				.send({
					name: 'Red Bag',
					image_url: 'https://m.media-amazon.com/images/I/61AqF1+KZDL._SR500,500_.jpg',
					price: 400000,
					stock: -2,
					category: 'bag', 
				})
				.end((err, res) => {
					if(err){
						return done(err)
					}
					else {
						expect(res.status).toBe(400)
						expect(res.body).toHaveProperty('errors', errors);
						return done()
					}
				})
			})
			
		})
	})

	describe('DELETE/products/:id', () => {
		describe('Success delete one product', () => {
			test('Should return status 200 and success deleted product message', (done) => {
				let productId = 1
				request(app)
				.delete(`/products/${productId}`)
				.set('access_token', adminAccess_token)
				.end((err, res) => {
					if(err){
						return done(err)
					}
					else {
						expect(res.status).toBe(200)
						expect(res.body).toHaveProperty('msg', 'Product successfully deleted');
						return done()
					}
				})
			})
		})
		describe('Error delete one product', () => {
			test('Should return status 401 because customer not authorized', (done) => {
				const errors = [{ message: "User not authorized" }]
				request(app)
				.delete(`/products/${productId}`)
				.set('access_token', customerAccess_token)
				.end((err, res) => {
					if(err){
						return done(err)
					}
					else {
						expect(res.status).toBe(401)
						expect(res.body).toHaveProperty('errors', errors);
						return done()
					}
				})
			})
			test('Should return status 401 because access_token is null', (done) => {
				const errors = [{ message: "Please login first" }]
				request(app)
				.delete(`/products/${productId}`)
				.end((err, res) => {
					if(err){
						return done(err)
					}
					else {
						expect(res.status).toBe(401)
						expect(res.body).toHaveProperty('errors', errors);
						return done()
					}
				})
			})
		})
	})
})