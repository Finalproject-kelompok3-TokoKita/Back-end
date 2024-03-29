const express = require("express");
const routers = require("./routes/index");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const PORT = process.env.APP_PORT || 3001;
// const fs = require("fs"); 

app.use("/static",express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
//app.use('/api', routers);
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
