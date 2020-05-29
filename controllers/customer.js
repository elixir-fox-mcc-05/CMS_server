const { Customer, PaymentAdrress, Order } = require ('../models') 
const { decodePassword } = require ('../helpers/bcrypt.js')
const { getToken } = require ('../helpers/jwt')

class CustomerCon {
    static login (req,res) {
        let { email, password } = req.body

        Customer.findOne ({
            where: {
                email
            }
        })
        .then (result =>{
            if (result) {
                let check = decodePassword(password,result.password)
                if (check) {
                    let { id, email } = result
                    let obj = {
                        id,
                        email
                    }
                    let token = getToken(obj)
                    res.status(200).json({
                        token
                    })
                } else {
                    res.status(400).json({
                        msg: 'wrong email/password'
                    })
                }
            } else {
                res.status(400).json({
                    msg: 'wrong email/password'
                })
            }
        })
        .catch (err =>{
            res.status(500).json({
                msg: 'internal server error',
                err
            })
        })
    }
    static register (req,res) {
        let { email, password, confirm_password } = req.body
        if (password !== confirm_password) {
            res.status(400).json({
                msg: "password doesn't match"
            })
        } else {
            Customer.create ({
                email,
                password
            })
            .then(result =>{
                res.status(201).json({
                    msg: 'successfuly register',
                    result
                })
            })
            .catch(err => {
                let msg = err.errors[0].message
                // console.log(err)
                res.status(400).json({
                    msg
                })
            })
        }

    }
    static addPaymentAddres (req,res) {
        let { user_id, first_name, last_name, username, email, address1, address2, city, 
            province, ZIP, payment_method, name_on_card, card_number, card_expiration, card_CVV } = req.body
        
        console.log(req.body)
        // console.log(req.header)
        if ( !first_name || !last_name || !username || !address1 || !city || !province ||
        !ZIP || !payment_method || !name_on_card || !card_number || !card_expiration || !card_CVV) 
        {
            res.status(400).json({
                msg: 'harap masukan semua data yang diperlukan'
            })
        } else {
            PaymentAdrress.findOne({
                where: {
                    user_id,
                }
            })
            .then(find =>{
                if (find) {
                    PaymentAdrress.update({
                        user_id, first_name, last_name, username, email, address1, address2, city, 
                        province, ZIP, payment_method, name_on_card, card_number, card_expiration, card_CVV
                    }, {
                        where: {
                            id: find.id
                        }
                    })
                    .then(result =>{
                        res.status(201).json({
                            msg: 'Payment method updated ',
                        })
                    })
                    .catch(err =>{
                        console.log(err)
                        res.status(400).json({
                            err
                        })
                    })
                } else {
                    PaymentAdrress.create({
                        user_id, first_name, last_name, username, email, address1, address2, city, 
                        province, ZIP, payment_method, name_on_card, card_number, card_expiration, card_CVV
                    })
                    .then(result =>{
                        res.status(201).json({
                            msg: 'success add payment address',
                            result
                        })
                    })
                    .catch(err =>{
                        console.log(err)
                        res.status(400).json({
                            err
                        })
                    })
                }
            })
            .catch(err =>{
                res.status(400).json({
                    err
                })
            })
        }

    }
    static getPaymentAddress (req,res) {
        let id = req.body.user_id
        PaymentAdrress.findOne({
            where: {
                user_id: id
            }
        })
        .then (result =>{
            res.status(200).json({
                result
            })
        })
        .catch (err =>{
            res.status(500).json({
                err
            })
        })
    }
    static addOrder (req,res) {
        let {user_id, items, quantity, price } = req.body
        // res.status(201).json(
        //     req.body
        // )
        Order.create({
            user_id,items, quantity, price
        })
        .then(result =>{
            res.status(201).json({
                result
            })
        })
        .catch(err =>{
            console.log(err)
            res.status(500).json({
                err
            })
        })
    }
    static getOrders (req,res) {
        Order.findAll({
            where: {
                user_id: req.body.user_id
            }
        })
        .then(result =>{
            res.status(200).json(
                result
            )
        })
        .catch(err =>{
            res.status(500).json({
                err
            })
        })
    }
}


module.exports = CustomerCon