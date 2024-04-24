const express = require("express");
const router = express.Router();
const controllerUsers = require("../controllers/controllersUsers");

router.route("/").get(controllerUsers.getAllUsers);

module.exports = router;
