const express = require("express");
const roomController = require("../controllers/roomController");

const router = express.Router();

router.get("/:id", roomController.getAllRooms);

module.exports = router;
