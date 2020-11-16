const bcrypt = require("bcrypt");
// Helpers
const { registerValidation } = require("../helpers/validation");
const { passwordValidation } = require("../helpers/validation");
const { loginValidation } = require("../helpers/validation");

const { client } = require("../dataBase/index");

//! REGISTER
module.exports.register = async (req, res) => {
  const { name, email, password, repeatedPassword } = req.body;
  // We first validate the user informations
  const { error } = registerValidation(req.body);
  if (error)
    return res.status(400).json({ errorMessage: error.details[0].message });

  // We check if passwords are the same
  const passwordCheck = passwordValidation(password, repeatedPassword);
  if (!passwordCheck)
    return res
      .status(400)
      .json({ errorMessage: "Passwords are not the same." });

  // We check in db if email exist
  const emailCheck = await client.query({
    text: "SELECT * FROM users WHERE email=$1",
    values: [email],
  });

  if (emailCheck.rows.length)
    return res.status(400).json({ errorMessage: "Email already exist." });

  // We can now hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // We can now save user in db
  try {
    await client.query({
      text: "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
      values: [name, email, hashedPassword],
    });
    // We can inform that user is saved
    res.json({ message: "Registrated succesfully" });
  } catch (err) {
    res.status(500).json({ errorMessage: err });
  }
};

//! LOGIN
module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  // We validate the body
  const { error } = loginValidation(req.body);
  if (error)
    return res.status(400).json({ errorMessage: error.details[0].message });

  // We check if user is in db or note
  const { rows } = await client.query({
    text: "SELECT * FROM users WHERE email=$1",
    values: [email],
  });
  if (!rows.length)
    return res.status(401).json({ errorMessage: "User not found." });

  const user = rows[0];

  // We can now check if passwords are the same
  if (!(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ errorMessage: "Incorrect password." });

  req.session.userId = user.id;
  res.json({ id: user.id, name: user.name });
};

//! UPDATE PASSWORD
module.exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword, repeatedPassword } = req.body;

  const passwordCheck = passwordValidation(newPassword, repeatedPassword);
  if (!passwordCheck)
    return res
      .status(400)
      .json({ errorMessage: "Passwords are not the same." });

  const { rows } = await client.query({
    text: "SELECT * FROM users WHERE id=$1",
    values: [req.session.userId],
  });

  if (!rows.lenght)
    return res.status(401).json({ errorMessage: "User not found" });

  const { password } = rows[0];
  // We check if passwords are the same
  const match = await bcrypt.compare(currentPassword, password);
  if (!match) return res.status(401).json({ errorMessage: "Invalid password" });

  //We can now hash the new password
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  // Finally we try to update the password in db
  try {
    await client.query({
      text: "UPDATE users SET password=$1 WHERE id=$2",
      values: [hashedNewPassword, req.session.userId],
    });
    res.json({ message: "Password updated" });
  } catch (err) {
    return res.status(500).json({ errorMessage: err });
  }
};

//! LOGOUT
module.exports.logout = (req, res) => {
  req.session.userId = null;
  req.session.destroy();
  res.json({ message: "Logged out" });
};

//! CURRENT USER
module.exports.currentUser = async (req, res) => {
  if (!req.session.userId)
    return res.status(401).json({ message: "User not connected" });

  try {
    const { rows } = await client.query({
      text: "SELECT name, id FROM users where id=$1",
      values: [req.session.userId],
    });
    res.json({ id: rows[0].id, name: rows[0].name });
  } catch (err) {
    return res.status(500).json({ errorMessage: err });
  }
};
