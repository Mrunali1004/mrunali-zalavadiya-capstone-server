const knex = require("knex")(require("../knexfile"));

exports.getallnotes = async (req, res) => {
  try {
    const getallnotes = await knex("notes");
    res.status(200).json(getallnotes);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.postNotes = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new Note: ${error}`,
    });
  }
};
