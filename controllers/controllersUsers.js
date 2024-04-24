const knex = require("knex")(require("../knexfile"));

exports.getAllUsers = async (_req, res) => {
  try {
    const getUsers = await knex("users");
    res.status(200).json(getUsers);
  } catch (err) {
    console.log(err);
  }
};
