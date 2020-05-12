'use strict'

const router = require(`express`).Router()

const UserController = require(`../controllers/usercontroller`)

router.get (`/getUsersSecretPasswordHandyDandySpicy`, UserController.getAll)
router.post(`/register`, UserController.userRegister)
router.post(`/login`, UserController.login)

module.exports = router
