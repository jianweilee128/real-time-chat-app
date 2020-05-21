const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

// Auth routes
router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.get("/logout", authController.logout);

// User routes
router.get("/me", authController.protect, userController.getCurrentUser);
router.route("/").get(userController.getAllUsers);

module.exports = router;
