const { errorMonitor } = require("events");
const express = require("express");
const router = express.Router();
const path = require("path");

/* GET error page. */
router.get("**", function (req, res, next) {
  res.render("error", {
    errtitle: "404: Page Unknown"
  });
});

module.exports = router;
