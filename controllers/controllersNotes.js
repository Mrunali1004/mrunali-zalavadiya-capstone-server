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
  const { categoryId, title, content } = req.body;
  const {
    user: { id },
  } = req;

  if (!categoryId || !title || !content) {
    return res.status(400).json("Required all field");
  }

  try {
    const [notesId] = await knex("notes").insert({
      userId: id,
      categoryId,
      title,
      content,
    });

    const newNote = await knex("notes").where({ id: notesId }).first();

    res.status(201).json({ message: "Note created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Unable to create new Note" });
  }
};
