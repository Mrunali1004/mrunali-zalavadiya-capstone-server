const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/authControllers");

router.route("/auth/signup").post(authControllers.postsignup);

router.route("/auth/login").post(authControllers.postlogin);

module.exports = router;
