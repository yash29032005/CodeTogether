const jwt = require("jsonwebtoken");
const { User } = require("../Model/user.model");

const protectauth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ error: "Token has expired" });

    const decoded = jwt.verify(token, process.env.SECRETKEY);
    if (!decoded) return res.status(401).json({ error: "Invalid token" });

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectauth middleware", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = protectauth;
