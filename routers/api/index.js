var express = require("express");


var router = module.exports = express.Router();


router.use("/user", require("./user"));