const express = require("express");
const messageController = require("../controllers/messageController");

const router = express.Router();

router.get("/", messageController.getAllMessages);

module.exports = router;
