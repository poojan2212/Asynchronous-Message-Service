/*
Name : Poojanbhai N Patel
Student ID : 1001827807
*/
// https://github.com/avrj/slack-clone/blob/master/src/server/routes/index.js

const express = require("express");
const router = express.Router();
const path = require("path");

const api = require("./api");

router.use("/api", api);

module.exports = router;
