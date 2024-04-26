const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

exports.postsignup = async (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res.status(400).send("Please include all the required fields");
  }

  const encryptedPassword = bcrypt.hashSync(password, 8);

  try {
    const user = await knex("users").insert({
      email,
      password: encryptedPassword,
      username,
    });
    res.status(201).send("Registered successfully");
  } catch (err) {
    res.status(500).send("Sorry cant create the user now");
  }
};

exports.postlogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Please include all the required fields");
  }

  try {
    const user = await knex("users").where({ email }).first();

    if (!user) {
      return res.status(404).send("Email not found");
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).send("User credentials are wrong");
    }

    const authToken = jwt.sign(
      {
        user_id: user.id,
        user_email: user.email,
      },
      JWT_SECRET,
      { expiresIn: "30m" }
    );

    res.status(200).json({ token: authToken });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal Server Error");
  }
};
