const { Op } = require("sequelize");
const { users } = require("../models");
const { PasswordUtilities, JWTUtilities } = require("../utils");
const { BadRequestError } = require("../utils/errors");

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new BadRequestError("Email/Phone dan password tidak boleh kosong!");
    }

    const user = await users.findOne({
      where: {
        [Op.or]: [
          {
            email: username,
          },
          {
            phone: username,
          },
        ],
      },
    });

    if (!user) {
      throw new BadRequestError("Email/Phone atau Password salah! ");
    }

    const isValidPassword = await PasswordUtilities.compare(password, user.password);
    if (!isValidPassword) {
      throw new BadRequestError("Email/Phone atau Password salah! 2");
    }

    const token = JWTUtilities.generateToken(
      {
        uid: user.id,
        email: user.email,
      },
      {
        expiresIn: 10,
      }
    );

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
