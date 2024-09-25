const express = require("express");
const { handleApplicationSubmit } = require("../controllers/applyController");

const router = express.Router();

router.post("/", handleApplicationSubmit);

module.exports = router;
