var express = require("express");
var router = module.exports = express.Router();


router.get("/getInfo", function (req, res) {
    console.info(req.query.username);
    res.send({"username": "曹飞龙"})
})


router.post("/add", function (req, res) {
    console.info(req.body);
    res.send({"success": true});
})