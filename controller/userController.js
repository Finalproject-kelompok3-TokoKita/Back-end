// controllers/userController.js

const { Sequelize } = require("sequelize");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sequelize = require("../config/dbConfig");

const register = async (req, res) => {
  // ... (fungsi register)

  try {
    // ... (implementasi register)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  // ... (fungsi login)

  try {
    // ... (implementasi login)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateToken = (user) => {
  // ... (fungsi generateToken)
};

const verifyToken = (req, res, next) => {
  // ... (fungsi verifyToken)
};

module.exports = { register, login, verifyToken };
