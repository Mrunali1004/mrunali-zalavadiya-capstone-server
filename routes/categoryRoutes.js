const express = require("express");
const router = express.Router();
const categorycontrollers = require("../controllers/controllersCategory");

router
.route("/")
.get(categorycontrollers.getallcategory)
.post(categorycontrollers.postcategory);

module.exports = router;
