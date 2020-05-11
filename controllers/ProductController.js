const { Product } = require('../models');

class ProductController {
    static create(req, res, next) {
        let { name, price, stock, description, image_url } = req.body;
        const UserId = req.currentUserId;
        const values = {
            name,
            price,
            stock,
            description,
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
}

module.exports = ProductController;