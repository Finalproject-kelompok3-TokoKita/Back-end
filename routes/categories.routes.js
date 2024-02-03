const { Router } = require("express");
const router = Router();

const { CategoriesController } = require("../controllers");

router.get("/categories", CategoriesController.getAll);
router.get("/categories/:id(\\d+)", CategoriesController.getOne);
//router.post("/categories", CategoriesController.createOne);
//router.put("/categories/:id(\\d+)", CategoriesController.updateOne);
//router.delete("/categories/:id(\\d+)", CategoriesController.deleteOne);

module.exports = router;
