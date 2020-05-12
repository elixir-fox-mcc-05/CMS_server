'use strict'

const router = require(`express`).Router() 
const CategoryController = require(`../controllers/categorycontroller`)
const { authenticate, restricted } = require(`../middlewares/userauth`)

router.get(`/`, CategoryController.getAll)
router.post(`/add`, authenticate, restricted, CategoryController.addCategory)
router.put(`/edit`, authenticate, restricted, CategoryController.editCategory)
router.delete(`/delete`, authenticate, restricted, CategoryController.removeCategory)

module.exports = router