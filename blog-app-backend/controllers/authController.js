const jwt = require("jsonwebtoken");
const { readDB } = require("../utils/dbUtils");
const usersPath = "./data/users.json";
require("dotenv").config();

exports.login = (req, res) => {
  const { username, password } = req.body;
  const users = readDB(usersPath);
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  // Create JWT token after successful authentication
  const token = jwt.sign(
    { username: user.username, role: user.role }, // payload
    process.env.JWT_SECRET, // secret key (stored in .env file)
    { expiresIn: "1h" } // token expiry time (optional)
  );

  res.json({ message: "Login successful", token });
};
