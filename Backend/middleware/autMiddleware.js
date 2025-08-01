const jwt = require("jsonwebtoken");
const User = require("../models/User.model.js");
const dotenv = require("dotenv")
dotenv.config();

// Middleware to protecr routes
const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log("Decoded token: ", decoded);

      const user = await User.findById(decoded.user.id).select("-password");

      if (!user) {
        return res.status(401).json({ message: "User not found ❌" });
      }

      req.user = user;
      next();
    } catch (err) {
      console.error("Token verification failed ❌", err.message);
      return res.status(401).json({ message: "Not authorized, token failed ❌" });
    }
  } else {
    return res.status(401).json({
      message: "Not authorized, no token provided",
    });
  }
};

// Middleware to check if the user is an admin
const admin = (req,res,next) =>{
  if (req.user && req.user.role === "admin") {
      next()
  }else{
    res.status(403).json({message:"Not authorized as an admin"})
  }
}


module.exports = { protect,admin};
