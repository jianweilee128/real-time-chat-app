const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

// Auth routes
router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.get("/logout", authController.protect, authController.logout);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

router.post(
  "/updatePassword",
  authController.protect,
  authController.updatePassword
);

// User routes
router.get("/online", authController.protect, userController.getOnlineUsers);
router.patch(
  "/updateProfile",
  authController.protect,
  userController.updateUser
);

module.exports = router;
