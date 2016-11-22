var express = require("express");
var bodyParser = require("body-parser");

var router = module.exports = express.Router();

router.use(bodyParser.json());

router.use("/api",require("./api"));