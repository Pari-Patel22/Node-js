const express = require("express");
const port = 2226;

const app = express();
const db = require("./config/db");
const schema = require("./model/Firstschema");
const multer = require("./Middlewares/multer");
const path = require("path");
const fs = require("fs");

app.set("view engine","ejs");


app.use ("/Uploads", express.static(path.join(__dirname, "/Uploads")));
app.use(express.urlencoded({extended:true}));


app.get("/", async (req,res)=>{
    let data = await schema.find({});
    res.render("index",{data});
})

app.post("/adddata", multer, async (req,res)=>{
    req.body.image = req.file.path
    await schema.create(req.body).then(()=>{
    res.redirect("/")
        })
})

app.get("/deleteData", async (req,res)=>{
    let singledata= await schema.findById(req.query.id);
    fs.unlinkSync(singledata.image);
    await schema.findByIdAndDelete(req.query.id).then(()=>{
        res.redirect("/");
    })
}) ;

app.get ("/editData",async (req,res)=>{
    let singledata = await schema.findById(req.query.id);
    res.render("edit",{singledata});
});

app.post ("/updateData", multer, async (req,res)=>{
    let singledata= await schema.findById(req.body.id);
    let img = "";

    req.file ? img = req.file.path : img = singledata.image;
    req.file && fs.unlinkSync(singledata.image);

    req.body.image = img;

    await schema.findByIdAndUpdate(req.body.id, req.body ).then(()=>{
        res.redirect ("/");
    })
});

app.listen(port,(err)=>{
    err ? console.log(err) : console.log(`server is started on port ${port}`);
});