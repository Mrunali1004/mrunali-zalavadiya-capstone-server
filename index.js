require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const authRoutes = require("./routes/auth");


app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/", authRoutes);

app.listen(PORT, () => {
  console.log(`welcom to my ${PORT} `);
});
