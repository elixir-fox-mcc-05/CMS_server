"use strict";

const router = require('express').Router();
const ProductController = require("../controller/controllerproduct");
const Authentication = require('../middlewares/authentication');
const Authorization = require('../middlewares/authorization');

router.use(Authentication);
router.get('/', ProductController.findAll);
router.post('/', Authorization, ProductController.create);
router.get('/:id', ProductController.findOne);
router.put('/:id', Authorization, ProductController.editData);
router.delete('/:id', Authorization, ProductController.deleteData);

module.exports = router;