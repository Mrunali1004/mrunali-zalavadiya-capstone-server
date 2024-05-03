const express = require("express");
const router = express.Router();
const categorycontrollers = require("../controllers/controllersCategory");

router
.route("/")
.get(categorycontrollers.getallcategory)
.post(categorycontrollers.postcategory);

router
  .route("/:id")
  .get(categorycontrollers.getSingleCategory)
  .put(categorycontrollers.editCategory)
  .delete(categorycontrollers.deleteCategory);

module.exports = router;
