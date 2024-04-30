const knex = require("knex")(require("../knexfile"));

exports.getallnotes = async (req, res) => {
  try {
    const userId = req.user.id;
    const getallnotes = await knex("notes")
      .join("category", "category.id", "=", "notes.categoryId")
      .select(
        "category.categoryName",
        "notes.title",
        "notes.content",
        "notes.categoryId",
        "notes.created_at",
      )
      .where("notes.userId", userId);

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

    res.status(201).json({
      notes: newNote,
      message: "Note created successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Unable to create new Note" });
  }
};
