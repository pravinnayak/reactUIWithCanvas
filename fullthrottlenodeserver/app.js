var express = require('express');
var bodyParser = require('body-parser');
let fs = require("fs");


var cors = require('cors');

var app = express();
app.use(cors());

app.use(bodyParser.json());

app.get("/user/details", (req, res) => {
    let data = fs.readFileSync("responseJSON.json", "utf-8")
    // console.log(data)
    res.json({
        user: data
    });
})
app.listen(1234);
console.log("Server listening in port 1234");

module.exports = app;