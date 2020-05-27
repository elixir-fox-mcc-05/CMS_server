let {Product, User, Cart} = require('../models/index')
class ProductController {

  static detailProduct (req, res, next) {
      Product.findOne({ where: {id : req.params.id}})
      .then((result) => {
        res.status(200).json(result)
      }).catch((err) => {
        next(err)
      });
  }

  static showAllProduct (req, res, next) {
    // console.log(req.query.tags)
    if (!req.query.tags) {
      Product.findAll({order:[['id']]})
        .then((result) => {
          res.status(200).json(result)
        }).catch((err) => {
          next(err)
        });
    } else {
      Product.findAll({order:[['id']],
        where: {
          tags: req.query.tags
        }
      })
        .then((result) => {
          res.status(200).json(result)
        }).catch((err) => {
          next(err)
        });
    }
    
  }

  static addProduct (req, res, next) {
    let data = {
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      image_url: req.body.image,
      tags: req.body.tags
    }
    Product.create(data)
    .then((result) => {
      let payload = {
        name: result.name,
        price: result.price,
        stock: result.stock,
        image_url: result.image_url,
        tags: result.tags
      }
      res.status(201).json(payload)
    })
    .catch((err) => {
      next(err)
    });
  }

  static addCart (req, res, next) {
    let data = {UserId: req.currentUserId, ProductId: req.body.id}
    Cart.create(data)
    .then((result) => {
      console.log(result);
      res.status(200).json(result)
    }).catch((err) => {
      console.log(err);
    });
  }

  static myCart (req, res, next) {
    Cart.findAll({
    include: [Product, User],
        where: {
          UserId: req.currentUserId,
          payed: false
        }
      })
    .then((result) => {
      console.log(result)
      res.status(200).json(result)
    }).catch((err) => {
      console.log(err);
    });
  }

  static restock (req, res, next) {
    let newStock = req.body.stock += 1
    if (req.body.step == 'down') {
      newStock -= 2
    }
    Product.update(
      {stock: newStock},
      {returning: true, where: {id: req.params.id}}
    )
      .then((result) => {
        res.status(200).json(result)
      }).catch((err) => {
        console.log(err);
      })
  }

  static delete (req, res, next) {
    Product.destroy({
      where: {
          id: req.params.id
      }
    })
  }

  static delCart (req, res, next) {
    console.log(req.body.idCart);
    console.log('masukkkkkkkkkkkkkkkkkkkkkkkkkk -------------------- ini delete');
    Cart.destroy({
      where: {
        idCart: req.body.idCart
      }
    })
      .then((result) => {
        console.log(result);
        res.status(200).json(result)
      }).catch((err) => {
        console.log(err);
      })
  }
  
  static demand (req, res, next) {
    let newStock = req.body.demand += 1
    if (req.body.step == 'down') {
      newStock -= 2
    }
    Product.findOne({ where: {id : req.body.ProductId}})
    .then((item) => {
    return Cart.update(
      {
        demand: newStock,
        subTotal: newStock * item.price
      },
      {returning: true, where: {idCart: req.body.idCart}}
    )
      .then((result) => {
        res.status(200).json(result)
      }).catch((err) => {
        console.log(err);
      })
    });
  }

  static check (req, res, next) {
    Cart.update(
      {
        select: req.body.select,
      },
      {returning: true, where: {idCart: req.body.idCart}}
    ).then((result) => {
      res.status(200).json(result)
    }).catch((err) => {
      console.log(err);
    })
  }

  static buy (req, res, next) {
    Cart.findAll({
      include: [Product],
      where: {
        UserId: req.currentUserId,
        select: true,
        payed: false,
      }
    })
      .then((result) => {
        if (result)
        for (let i in result) {
          if(result[i].dataValues.Product.dataValues.stock >= result[i].dataValues.demand) {
            let newStock = result[i].dataValues.Product.dataValues.stock - result[i].dataValues.demand
            Product.update(
              {
                stock: newStock
              },
              {returning: true, where: {id: result[i].dataValues.Product.id}}
            ).then((prod) => {
              Cart.update(
                {
                  payed: true
                },
                {returning: true, where: {idCart: result[i].dataValues.idCart}}
              )
              res.status(200).json(result)
            }).catch((err) => {
              console.log(err);
            });
          } else {
            next({
              name: 'SequelizeValidationError',
              errors: [{msg: `${result[i].dataValues.Product.dataValues.name} is out of stock`}]
            })
          }
        }
      }).catch((err) => {
        console.log(err);
      })
  }

  static history (req, res, next) {
    Cart.findAll({
      order:[['createdAt']],
      include: [Product, User],
      where: {
        UserId: req.currentUserId,
        payed: true
      }
    })
    .then((result) => {
      res.status(200).json(result)
    }).catch((err) => {
      console.log(err);
    });
  }
}
module.exports = ProductController
