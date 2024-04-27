require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const authRoutes = require("./routes/auth");
const noteRoutes = require("./routes/notesRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const { authenticateToken } = require("./middleware/authenticateToken");

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

app.use(express.json());
app.use(cors());

app.use("/", authRoutes);
app.use("/notes", authenticateToken, noteRoutes);
app.use("/category", authenticateToken, categoryRoutes);

app.listen(PORT, () => {
  console.log(`welcom to my ${PORT} `);
});
