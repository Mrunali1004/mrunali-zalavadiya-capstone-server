require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(cors());

// Routes

app.listen(PORT, () => {
  console.log(`welcom to my ${PORT} `);
});
