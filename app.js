const express = require('express');
const helmet = require("helmet");
const path = require('path');
//var cors = require('cors');

const app = express();

//app.disable('x-powered-by');

app.use(express.static(__dirname + '/public'));
//app.use(helmet());
    //.use(cors());
    //.use(cookieParser());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname) +  "/public/index.html");
})


module.exports = app;