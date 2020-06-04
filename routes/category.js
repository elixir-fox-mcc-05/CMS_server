"use strict";
const router = require("express").Router();
const ControllerCategory = require('../controller/controllercategory');
const Authentication = require('../middlewares/authentication');
const Authorization = require('../middlewares/authorization');

router.get('/', ControllerCategory.findAll);
router.use(Authentication);
router.get('/:id', ControllerCategory.findOne);
router.post('/', Authorization, ControllerCategory.create);
router.put('/:id', Authorization, ControllerCategory.editData);
router.delete('/:id', Authorization, ControllerCategory.deleteData);



module.exports = router;