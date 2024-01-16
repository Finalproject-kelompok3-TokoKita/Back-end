const { Router } = require("express");
const router = Router();

const routes = [
  require("./provinces.routes"),
  require("./cities.routes"),
  require("./user.routes"),
  require("./auth.routes"),
  require("./categories.routes"),
  require("./store.routes"),
  require("./products.routes"),
  require("./orders.routes"),
  require("./order_items.routes"),
];

routes.forEach((route) => router.use(route));

router.use((err, req, res, next) => {
  if (!err.code || !err.name) {
    err.code = 500;
    err.name = "Internal Server Error";
  }

  res.status(err.code).json({
    code: err.code,
    name: err.name,
    message: err.message,
    data: null,
  });
});

module.exports = router;
