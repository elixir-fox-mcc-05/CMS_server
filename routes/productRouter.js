const router = require("express").Router();
const ProductController = require("../controllers/productController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorizationProduct");

router.get("/product", ProductController.findAll);
router.get("/product/:id", ProductController.findOne);
router.use(authentication);
router.post("/product", authorization, ProductController.createProduct);
router.put('/product/:id', authorization, ProductController.updateProduct);
router.delete('/product/:id', authorization, ProductController.deleteProduct);

module.exports = router;
