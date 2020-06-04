//require middlewares 

const router = require(`express`).Router() 
const productRouter = require(`./productrouter`)
const userRouter = require(`./userrouter`)
const categoryRouter = require(`./categoryrouter`)
const productPictureRouter = require(`./productPictureRouter`)

router.get(`/`, ( req, res) => { res.status(200).json({ msg : `online`})})

router.use(`/products`, productRouter)
router.use(`/users`, userRouter)
router.use(`/categories`, categoryRouter)
router.use(`/pictures`, productPictureRouter)

module.exports = router