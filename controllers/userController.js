const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { users } = require("../models");
const secret = "rahasia";

class Controller {
  static getUser(req, res) {
    users
      .findAll()
      .then((result) => {
        res.status(200).json({ users: result });
      })
      .catch((error) => {
        res.status(500).json({ error: "Internal Server Error" });
      });
  }

  static async getUserById(req, res) {
    const id = req.params.userId;
    try {
      const user = await users.findByPk(id); // Use the primary key directly
      console.log("User ID:", id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user data by ID:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async register(req, res) {
    const { fullname, email, password, confirmPassword } = req.body;

    try {
      console.log("Received registration request:", { fullname, email, password, confirmPassword });
      const existingUser = await users.findOne({ where: { email } });
      console.log("Existing user:", existingUser);

      if (existingUser) {
        return res.status(400).json({ message: "Email is already registered. Please use a different email address." });
      }
      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Password and confirm password do not match" });
      }
      const user = await users.create({
        fullname,
        email,
        password,
      });

      res.status(201).json({ message: "Akun berhasil dibuat, silahkan login", user });
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await users.findOne({
        where: {
          email,
        },
      });

      if (user) {
        const validation = bcrypt.compareSync(password, user.password);

        if (validation) {
          const token = jwt.sign(
            {
              id: user.id,
              email: user.email,
            },
            secret
          );
          const name = user.fullname;

          res.status(200).json({ message: "Berhasil login!", token, name });
        } else {
          next(new Error("SALAH EMAIL/PASSWORD"));
        }
      } else {
        next(new Error("SALAH EMAIL/PASSWORD"));
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
