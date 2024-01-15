const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { users } = require("../models");
const { PasswordUtilities, JWTUtilities } = require("../utils");
const { BadRequestError } = require("../utils/errors");

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Logging received credentials
    console.log("Received credentials:", username, password);

    if (!username || !password) {
      throw new BadRequestError("Email/Phone dan password tidak boleh kosong!");
    }

    const user = await users.findOne({
      where: {
        email: username,
      },
    });

    // Logging user from database
    console.log("User from database:", user);

    if (!user) {
      throw new BadRequestError("Email/Phone atau Password salah!");
    }

    // Logging sebelum dan sesudah fungsi compare
    console.log("Before compare: Received password (trimmed):", String(password).trim());
    console.log("Before compare: User password from database (trimmed):", String(user.password).trim());

    const isValidPassword = bcrypt.compareSync(password, user.password);

    // Logging setelah fungsi compare
    console.log("After compare: Is password valid?", isValidPassword);

    if (!isValidPassword) {
      throw new BadRequestError("Email/Phone atau Password salah! Periksa kembali kata sandi Anda.");
    }

    const token = jwt.sign(
      {
        uid: user.id,
        email: user.email,
      },
      {
        expiresIn: 10,
      }
    );

    if (!token) {
      throw new BadRequestError("Gagal membuat token JWT");
    }

    return res.status(200).json({
      token,
    });
  } catch (err) {
    next(err);
  }
};

const register = async (req, res, next) => {
  try {
    const { username, fullName, password } = req.body;

    if (!username || !fullName || !password) {
      throw new BadRequestError("field tidak boleh kosong!");
    }

    const isPhone = username.match(/^\d+$/g);
    const additionalObject = isPhone ? { phone: username } : { email: username };
    const hashedPassword = await PasswordUtilities.hash(password);
    await users.create({
      fullName: fullName,
      ...additionalObject,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Berhasil Registrasi",
    });
  } catch (err) {
    next(err);
  }
};

const refreshToken = async (req, res, next) => {
  try {
  } catch (err) {}
};

const logout = async (req, res, next) => {
  try {
  } catch (err) {}
};

module.exports = {
  login,
  register,
  refreshToken,
  logout,
};
