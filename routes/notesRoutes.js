const express = require("express");
const router = express.Router();
const notesControllers = require("../controllers/controllersNotes");

router.route("/").get(notesControllers.getallnotes);

module.exports = router;
