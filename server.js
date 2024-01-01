const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/dbConfig");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to MySQL database");
  })
  .catch((err) => {
    console.error("Error connecting to MySQL database:", err.message);
  });

app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
