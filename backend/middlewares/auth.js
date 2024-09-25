const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/constants"); 

const verifyToken = (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(401).json({ message: "User not authenticated. Please log in." });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token is not valid." });
    }
    req.user = user; 
    next(); 
  });
};

module.exports = { verifyToken };
