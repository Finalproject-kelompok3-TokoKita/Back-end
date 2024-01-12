const jwt = require("jsonwebtoken");
const secret = "rahasia";
const { Reservasi, User } = require("../models");

async function authentication(req, res, next) {
  try {
    const headers = req.headers;
    const bearer = headers.authorization;

    if (!bearer || !bearer.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token not provided' });
    }

    const token = bearer.slice(7);
    const decode = jwt.verify(token, secret);

    // Tambahkan penanganan kesalahan jika tidak ada ID pengguna
    if (!decode.id) {
      return res.status(401).json({ message: 'Invalid user ID in the token' });
    }

    const user = await User.findByPk(decode.id);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.isAdmin = user.isAdmin; // Set isAdmin sesuai dengan status admin pengguna

    const reservasis = await Reservasi.findAll();
    req.reservasis = reservasis; // Mendapatkan semua reservasi dari semua pengguna

    req.userId = decode.id;
    req.email = decode.email;
    next();
  } catch (error) {
    // Tambahkan penanganan kesalahan untuk token yang tidak valid
    return res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = authentication;
