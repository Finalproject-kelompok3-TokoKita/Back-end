const router = require("express").Router();

const userRouter = require("./Users/index");

router.use(userRouter);

module.exports = router;
