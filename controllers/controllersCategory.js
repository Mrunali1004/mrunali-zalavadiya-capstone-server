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

exports.getSingleCategory = async (req, res) => {
  try {
    const userId = req.user.id;
    const singlecategory = await knex("category")
      .where("category.userId", userId)
      .andWhere("category.id", req.params.id)
      .select("category.userId", "category.id", "category.categoryName");

    if (singlecategory.length === 0) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json(singlecategory[0]);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const deleteCategory = knex("category").where({ id: req.params.id }).del();
    console.log(deleteCategory);
    res
      .status(200)
      .json({ message: `Category ${req.params.id} Deleted Successfully` });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.editCategory = async (req, res) => {
  const {  categoryName } = req.body;
  
  const {
    user: { id },
  } = req;

  if (!req.params.id || !categoryName) {
    return res.status(400).json("Please provide categoryId and categoryName");
  }

  try {
    const category = await knex("category")
      .where({ id: req.params.id, userId: id })
      .first();

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    await knex("category").where({ id: req.params.id }).update({
      categoryName,
    });

    const updatedCategory = await knex("category")
      .where({ id: req.params.id })
      .first();

    res.status(200).json({
      category: updatedCategory,
      message: "Category updated successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create category" });
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
