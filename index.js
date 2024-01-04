import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import db from "./config/database.js";
import FileUpload from "express-fileupload";
import cors from "cors";
import ProfilRoute from "./routes/ProfilRoute.js";
import UsersRoute from "./routes/UserRoute.js";

try {
  await db.authenticate();
  console.log("Database Connected");
} catch (error) {
  console.error(error);
}

dotenv.config();
const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use(ProfilRoute);
app.use(UsersRoute);

app.listen(5000, () => console.log("Server Sedang berjalan di http://localhost:5000"));
