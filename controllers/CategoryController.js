const { Category, Product } = require('../models');

class CategoryController {
  static findAll(req, res, next) {
    Category.findAll({
      include: {
        model: Product
      }
    })
      .then(data => {
        res.status(200).json({
          Categories: data
        });
      })
      .catch(err => {
        return next(err);
      })
  }
  static createCategory(req, res, next) {
    let { name } = req.body;
    Category.create({
      name
    })
      .then(result => {
        res.status(201).json({
          Category: result
        })
      })
      .catch(err => {
        return next(err);
      });
  }
  static updateCategory(req, res, next) {
    let { name } = req.body;
    let { id } = req.params;
    Category.update({
      name,
    }, {
      where: {
        id
      },
      returning: true
    })
      .then(data => {
        if (data[0] > 0) {
          res.status(200).json({
            Category: data[1][0]
          });
        } else {
          return next({
            code: 404,
            message: `Category Not Found`
          });
        }
      })
      .catch(err => {
        return next(err);
      })
  }
  static deleteCategory(req, res, next) {
    let { id } = req.params;
    let deleted;
    Category.findOne({
      where: {
        id
      }
    })
    .then(result => {
      deleted = result;
      return Category.destroy({
        where: {
          id
        }
      });
    })
    .then(data => {
      if (deleted) {
        res.status(200).json({
          Category: deleted
        });
      } else {
        return next({
          code: 404,
          message: `Category Not Found`
        });
      }
    })
    .catch(err => {
      return next(err);
    });
  }
}

module.exports = CategoryController;