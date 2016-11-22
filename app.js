"user strict"

var express = require("express");
var config = require("config");
var app = express();
var router = require("./routers")

app.use(router);

app.listen(config.port, function () {
    return console.info(config.env + "( server listen on )" + config.port);
})
