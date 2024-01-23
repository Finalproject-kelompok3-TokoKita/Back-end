const { Router } = require("express");
const router = Router();

const { upload } = require("../middlewares");
const { UsersController } = require("../controllers");

router.get("/users", UsersController.getAll);
router.get("/users/:id(\\d+)", UsersController.getOne);
router.post("/users", upload.single("file"), UsersController.createOne);
router.put("/users/:id(\\d+)", upload.single("file"), UsersController.updateOne);
router.delete("/users/:id(\\d+)", UsersController.deleteOne);

module.exports = router;
