const knex = require("knex")(require("../knexfile"));

exports.postcategory = async (req, res) => {
  const { categoryName } = req.body;
  const {
    user: { id },
  } = req;

  if (!categoryName) {
    return res.status(400).json("Please provide a categoryName");
  }

  try {
    const [categoryId] = await knex("category").insert({
      categoryName,
      userId: id,
    });
    const newCategory = await knex("category")
      .where({ id: categoryId })
      .first();
    res.status(201).json({
      category: newCategory,
      message: "Category created successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create category" });
  }
};
