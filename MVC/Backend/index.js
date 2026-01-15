const express = require ("express");
const port = 2622;
  
const app = express();
const db = require("./config/db");
const path = require("path");
const cors = require("cors");


app.use("/Uploads", express.static(path.join(__dirname, "/Uploads")));
app.use (express.urlencoded ({ extended: true }));
app.use (cors());
app.use (express.json());

app.use ("/", require("./routes/route"))

app.listen (port, (err)=>{
    err ? console.log(err) : console.log("server started on port :", port );
})



