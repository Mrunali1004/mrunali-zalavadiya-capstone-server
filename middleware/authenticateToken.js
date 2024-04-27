const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const knex = require("knex")(require("../knexfile"));

exports.authenticateToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(401)
      .send("Please provide the token in authorization header");
  }

  const parsedToken = req.headers.authorization.replace("Bearer ","");

  try {
    const decodedPayload = jwt.verify(parsedToken, JWT_SECRET);

    const {id, email} = await knex("users")
      .where({ id: decodedPayload.user_id })
      .first();
    req.user = {id, email}
    next()
  } catch (err) {
    console.log(err);
    res.status(401).send("Token you have provided is invalid");
  }
};

