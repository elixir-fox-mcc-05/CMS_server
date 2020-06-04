const { User } = require('../models');
const { compare }  = require('../helpers/bcrypt.js');
const { generateToken } = require('../helpers/jwt.js');
const { ShoppingChart } = require('../models')
const { Product } = require('../models')

class UserController {
    static login(req, res, next) {
        let { email, password } = req.body;
        User
            .findOne({ where: { email }})
                .then(user => {
                    if(user) {
                        if(compare(password, user.password)) {
                            const token = generateToken({ id: user.id, email: user.email });
                            res.status(200).json({ Token: token })
                        } else {
                            next({
                                name: 'Bad Request',
                                errors: 'Email or password is wrong'
                            })
                        }
                    } else {
                        next({
                            name: 'Bad Request',
                            errors: 'Email or password is wrong'
                        })
                    }
                })
                .catch(err => {
                    res.status(500).json({ Error: err.message })
                })
    }

    static register (req, res, next) {
        const { email, password } = req.body
        const userValues = {
            email,
            password,
            role: 'member'
        }
        User
            .create(userValues)
                .then(user => {
                    res.status(201).json({ id: user.id, email: user.email})
                })
                .catch(err => {
                    next(err)
                })
    }

    static showTransactionHistory (req, res, next) {
        const UserId = req.currentUserId
        console.log(UserId)
        const shoppingCartOptions = {
            where: {
                UserId,
                isPaid: true
            },
            order: [['id', 'asc']],
            include: [ Product ],
            attributes: ['id', 'UserId', 'quantity', 'ProductId']
        }
        ShoppingChart
            .findAll(shoppingCartOptions)
                .then(transcations => {
                    res.status(200).json({ Transactions: transcations })
                })
                .catch(err => {
                    next(err)
                })
    }
}

module.exports = UserController;