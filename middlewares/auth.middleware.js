const { JWTUtilities } = require("../utils");

module.exports = (req, res, next) => {
  try {
    const authorizationToken = req.headers["authorization"];
    const rawToken = authorizationToken?.split(" ")[1];

    if (!rawToken) {
      throw new Error("Error Token invalid");
    }

    const verifyToken = JWTUtilities.verifyToken(rawToken);

    req.user = {
      id: verifyToken.uid,
      email: verifyToken.email,
    };

    next();
  } catch (err) {
    next(err);
  }
};
