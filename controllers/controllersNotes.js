const knex = require("knex")(require("../knexfile"));

// get all note
exports.getallnotes = async (req, res) => {
  try {
    const userId = req.user.id;
    const allNotes = await knex("notes")
      .join("category", "category.id", "=", "notes.categoryId")
      .join("users", "users.id", "=", "notes.userId")
      .select(
        "notes.id",
        "users.id as userId",
        "notes.categoryId",
        "category.categoryName",
        "notes.title",
        "notes.content",
        "notes.created_at",
        "notes.modified_at"
      )
      .where("notes.userId", userId);

    if (allNotes.length === 0) {
      return res.status(404).json({ message: "No notes found for the user" });
    }

    res.status(200).json(allNotes);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// get note by id
exports.getSingleNote = async (req, res) => {
  try {
    console.log(req.params.id)
    const singleNote = await knex("notes").where({ id: req.params.id }).first();

    if (!singleNote) {
      return res.status(404).json({ message: "No notes found for the user" });
    }

    console.log(singleNote)

    res.status(200).json(singleNote);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// get notes by category id for Search
exports.getNotesByCategoryId = async (req, res) => {
  try {
    const userId = req.user.id;
    const categoryId = req.params.id;
    const singleNote = await knex("notes")
      .join("category", "category.id", "=", "notes.categoryId")
      .join("users", "users.id", "=", "notes.userId")
      .select(
        "notes.id",
        "users.id as userId",
        "notes.categoryId",
        "category.categoryName",
        "notes.title",
        "notes.content",
        "notes.created_at",
        "notes.modified_at"
      )
      .where("notes.userId", userId)
      .where("notes.categoryId", categoryId);

    if (singleNote.length > 0) {
      res.status(200).json(singleNote);
    } else {
      res.status(404).json({ error: "Note not found" });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// add new note
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

// edit note
exports.EditNotes = async (req, res) => {
  const noteId = req.params.id
  const { categoryId, title, content } = req.body;
  const {
    user: { id },
  } = req;

  if (!categoryId || !title || !content) {
    return res.status(400).json("Missing required fields in the request body");
  }

  try {
    const updatedNote = await knex("notes").where({ id: noteId, userId: id }).update({
      categoryId,
      title,
      content,
    });

    const newone = await knex("notes").where({ id: noteId, userId: id }).first();

    if (!updatedNote) {
      return res.status(404).json({ error: "Notes ID not found" });
    }
    return res.status(200).json(newone);
  } catch (error) {
    console.error("Error updating notes:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// delete note
exports.deleteNotes = async (req, res) => {
  try {
    const note = await knex("notes").where({ id: req.params.id }).del();

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res
      .status(200)
      .json({ message: `Note (Id: ${req.params.id} Deleted Successfully` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
