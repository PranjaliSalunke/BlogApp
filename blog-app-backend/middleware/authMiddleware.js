const jwt = require("jsonwebtoken");

const checkAdmin = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  console.log("Token received: ", token);
  if (!token)
    return res.status(401).json({ message: "Authorization required" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized access" });
    }
    req.user = decoded; // attach user info to request object
    next(); // Proceed to next middleware
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = { checkAdmin };
