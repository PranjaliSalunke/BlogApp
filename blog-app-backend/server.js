const express = require("express");
const bodyParser = require("body-parser");
const postsRoutes = require("./routes/posts");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/posts", postsRoutes);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
