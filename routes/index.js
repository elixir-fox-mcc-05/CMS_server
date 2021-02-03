const router = require("express").Router();
const userRouter = require("./userRouter");
const productRouter = require("./productRouter");
const cartRouter = require("./cartRouter");

router.get("/", (req, res) => {
  res.status(200).json({
    message: "CMS Server is running"
  });
});
router.use("/", userRouter);
router.use("/", productRouter);
router.use("/", cartRouter);

module.exports = router;
