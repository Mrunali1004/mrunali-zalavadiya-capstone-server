const express = require("express");
const router = express.Router();
const notesControllers = require("../controllers/controllersNotes");

router
.route("/")
.get(notesControllers.getallnotes)
.post(notesControllers.postNotes);

router
  .route("/:id")
  .get(notesControllers.getSingleNote)
  .put(notesControllers.EditNotes)
  .delete(notesControllers.deleteNotes);
  
  router
  .route("/category/:id")
  .get(notesControllers.getNotesByCategoryId)


module.exports = router;

