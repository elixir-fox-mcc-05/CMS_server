const router = require("express").Router();
const userRouter = require("./userRouter");
const productRouter = require("./productRouter");

router.get("/", (req, res) => {
  res.status(200).json({
    message: "CMS Server is running"
  });
});
router.use("/", userRouter);
router.use("/", productRouter);

module.exports = router;
