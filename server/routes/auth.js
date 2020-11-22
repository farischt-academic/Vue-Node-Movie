const express = require("express");
const router = express.Router();
// Middlewares
const { verifyConnection, verifyAuth } = require("../helpers/verifyAuth");
// Controllers
const {
  register,
  login,
  changePassword,
  logout,
  currentUser,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", verifyConnection, login);
router.put("/update-password", verifyAuth, changePassword);
router.get("/logout", verifyAuth, logout);
router.get("/currentUser", currentUser);

module.exports = router;
