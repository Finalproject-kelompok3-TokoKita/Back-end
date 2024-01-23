const { Router } = require("express");
const router = Router();

const authMiddleware = require("../middlewares/auth.middleware");
const isUserOwnStore = require("../middlewares/authorization");
const { ProductsController } = require("../controllers");

router.get("/product", ProductsController.getAll);
router.get("/product/:id(\\d+)", ProductsController.getOne);
router.post("/product", authMiddleware, ProductsController.createOne);
router.put("/product/:id(\\d+)", ProductsController.updateOne);
router.delete("/product/:id(\\d+)", ProductsController.deleteOne);

module.exports = router;
