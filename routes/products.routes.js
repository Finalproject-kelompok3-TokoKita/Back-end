const { Router } = require("express");
const router = Router();

const { ProductsController } = require("../controllers");

router.get("/product", ProductsController.getAll);
router.get("/product/:id(\\d+)", ProductsController.getOne);
router.post("/product", ProductsController.createOne);
router.put("/product/:id(\\d+)", ProductsController.updateOne);
router.delete("/product/:id(\\d+)", ProductsController.deleteOne);

module.exports = router;
