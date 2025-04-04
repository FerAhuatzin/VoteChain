const express = require("express");
const router = express.Router();
const { voteHandler } = require("../controllers/votingController");

router.post("/vote", voteHandler);

module.exports = router;
