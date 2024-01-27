const { Router } = require("express");
const router = Router();

const authMiddleware = require("../middlewares/auth.middleware");
const { uploader } = require("../middlewares");
const { ProductsController } = require("../controllers");

router.get("/product", ProductsController.getAll);
router.get("/productDashboard", ProductsController.getOneDashboard);
router.get("/product/:id(\\d+)", ProductsController.getOne);
router.post("/product", uploader("products").single("file"), authMiddleware, uploader("products").single("file"), ProductsController.createOne);
router.put("/product/:id(\\d+)", uploader("products").single("file"), uploader("products").single("file"), ProductsController.updateOne);
router.delete("/product/:id(\\d+)", ProductsController.deleteOne);

module.exports = router;
