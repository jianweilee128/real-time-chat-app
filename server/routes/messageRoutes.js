const express = require("express");
const messageController = require("../controllers/messageController");

const router = express.Router();

router.post("/", messageController.getAllMessages);

module.exports = router;
