"use strict"

const express = require("express");
const router = express.Router();
const ControllerProduct = require("../controllers/controllerproduct.js");
const authentication = require("../middlewares/authentication.js");
const authorization = require("../middlewares/authorization.js");

router.use(authentication);
router.get('/', ControllerProduct.showProduct);
router.post('/', ControllerProduct.addProduct);
router.get('/:id', ControllerProduct.findProduct);
router.delete('/:id', authorization, ControllerProduct.deleteProduct);
router.put("/:id", authorization, ControllerProduct.updateProduct);

module.exports = router;