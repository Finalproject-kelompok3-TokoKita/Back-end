const express = require("express");
const routers = require("./routes/index");
const app = express();
const PORT = process.env.APP_PORT || 3001;

app.use(routers);

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello World!",
  });
});

app.listen(PORT, () => {
  console.clear();
  console.log(`Server is running on port http://localhost:${PORT}`);
});
