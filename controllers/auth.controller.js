const { Op } = require("sequelize");
const { users, refreshtoken } = require("../models");
const { PasswordUtilities, JWTUtilities } = require("../utils");
const { BadRequestError, DataNotFoundError } = require("../utils/errors");

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
      throw new BadRequestError("Email/Phone atau Password salah!");
    }

    const isValidPassword = await PasswordUtilities.compare(password, user.password);
    if (!isValidPassword) {
      throw new BadRequestError("Email/Phone atau Password salah!");
    }

    const token = JWTUtilities.generateToken(
      {
        uid: user.id,
        email: user.email,
      },
      {
        expiresIn: 60,
      }
    );

    const refreshToken = JWTUtilities.generateRefreshToken(
      {
        uid: user.id,
        email: user.email,
      },
      {
        expiresIn: 60 * 60 * 24,
      }
    );

    const refToken = await refreshtoken.findOne({
      where: {
        userId: user.id,
      },
    });

    if (!refToken) {
      await refreshtoken.create({
        userId: user.id,
        token: refreshToken,
      });
    } else {
      refToken.token = refreshToken;
      await refToken.save();
    }

    res.cookie("token", token);
    return res.status(200).json({
      token,
      refreshToken,
      message: "Log In success",
    });
  } catch (err) {
    next(err);
  }
};

const register = async (req, res, next) => {
  try {
    const { username, fullName, password } = req.body;

    if (!username || !fullName || !password) {
      throw new BadRequestError("Field tidak boleh kosong!");
    }

    const isPhone = username.match(/^\d+$/g);
    const existingUser = isPhone ? await users.findOne({ where: { phone: username } }) : await users.findOne({ where: { email: username } });

    if (existingUser) {
      throw new ConflictError("Nomor telepon atau email sudah terdaftar!");
    }

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
    const refreshToken = req.headers["x-refresh-token"];

    if (!refreshToken) {
      throw new BadRequestError("Forbidden");
    }

    const getRefreshToken = await refreshtoken.findOne({
      where: {
        token: refreshToken,
      },
    });

    console.log(getRefreshToken);
    if (!getRefreshToken) {
      throw new DataNotFoundError("Data Token tidak ditemukan");
    }

    const userRefreshToken = JWTUtilities.verifyRefreshToken(getRefreshToken.token);
    if (!userRefreshToken) {
      throw new BadRequestError("Forbidden");
    }

    const user = await users.findOne({
      id: getRefreshToken.userId,
    });

    if (!user) {
      throw new DataNotFoundError("User tidak ditemukan");
    }

    const token = JWTUtilities.generateToken(
      {
        uid: user.id,
        email: user.email,
      },
      {
        expiresIn: 60,
      }
    );

    return res.status(200).json({
      token,
    });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    const refreshToken = req.headers["x-refresh-token"];

    if (!refreshToken) {
      throw new BadRequestError("Token is not provided!");
    }

    const verifyToken = JWTUtilities.verifyRefreshToken(refreshToken);
    if (!verifyToken) {
      return res.status(200).json({
        message: "Successful",
      });
    }

    const user = await users.findOne({
      where: {
        id: verifyToken.uid,
      },
    });

    if (user) {
      await user.destroy();
    }

    return res.status(200).json({
      message: "Successful",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
  register,
  refreshToken,
  logout,
};
