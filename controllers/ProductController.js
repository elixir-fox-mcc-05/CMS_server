const { Product } = require('../models');
const AWS = require('aws-sdk');
const faker = require('faker');

class ProductController {
    static create(req, res, next) {
        let { name, price, stock, category, image_url } = req.body;
        const UserId = req.currentUserId;
        const values = {
            name,
            price,
            stock,
            category,
            image_url,
            UserId
        };
        Product
            .create(values)
                .then(product => {
                    res.status(201).json({ Product: product});
                })
                .catch(err => {
                    next(err)
                })
    }

    static read(req, res, next) {
        Product
            .findAll({ order: [['id', 'asc']] })
                .then(products => {
                    res.status(200).json({ Products: products });
                })
                .catch(err => {
                    res.status(500).json({ Error: err.message });
                })
    } 

    static update(req, res, next) {
        let { name, price, stock, image_url, category } = req.body;
        const ProductId = req.params.productid;
        const options = {
            returning: true,
            where: {
                id: ProductId
            }
        };
        const values = {
            name,
            price,
            stock,
            image_url,
            category
        };
        Product
            .update(values, options)
                .then(product => {
                    res.status(200).json({ Product: product[1][0] });
                })
                .catch(err => {
                    next(err);
                })
    }

    static delete(req, res, next) {
        const ProductId = req.params.productid;
        const options = {
            where: {
                id: ProductId
            }
        };
        Product
            .destroy(options)
                .then(product => {
                    res.status(200).json({ Message: 'Successfully delete' });
                })
                .catch(err => {
                    next(err);
                })
    }

    static uploadFile(req, res, next) {
        const s3 = new AWS.S3({
            accessKeyId: process.env.ACCESSKEY,
            secretAccessKey: process.env.SECRETACCESSKEY
        });

        const encoded = req.file.buffer;

        const randomName = faker.name.findName();

        const params = {
            Bucket: 'ecommerceimage',
            Key: `${randomName}.jpeg`,
            Body: encoded
        }

        s3.upload(params, (error, data) => {
            if (error) {
                res.status(500).send(error)
            } else {
                res.status(200).send(data)
            }
        })
    }
}

module.exports = ProductController;