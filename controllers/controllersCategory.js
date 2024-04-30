const knex = require("knex")(require("../knexfile"));

exports.getallcategory = async (req, res) => {
  try {
    const userId = req.user.id;
    const getallcategory = await knex("category")
      .where("category.userId", userId)
      .select("category.userId", "category.id", "category.categoryName");

    res.status(200).json(getallcategory);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

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
