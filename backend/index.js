const express = require("express");
const app = express();
const fs= require("fs");
const cors = require("cors");
const port = 5000;
const path = require('path');
app.set("view engine", "ejs");

//const publicpath = path.join(_driname, '/public');


//Availble routes
//app.use(express.json())
app.use(cors()) // Use this after the variable declaration
app.use(express.static(path.join(__dirname, 'assets')));
app.use("/static", express.static("assets"))

app.use('/api/user', require('./routes/routes'));


app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});
 

