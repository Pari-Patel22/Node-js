const express = require("express");
const port = 2622;

const app = express();
const db = require("./config/db");
const schema = require("./model/firstschema");


app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));


app.get("/", async (req,res)=>{
    let data = await schema.find({});
    res.render("index",{data});
})

app.post("/adddata", async (req,res)=>{
    await schema.create(req.body).then(()=>{
    res.redirect("/")
        })
})

app.get("/deleteData", async (req,res)=>{
    await schema.findByIdAndDelete(req.query.id).then(()=>{
        res.redirect("/");
    })
}) ;

app.get ("/editData",async (req,res)=>{
    let singledata = await schema.findById(req.query.id);
    res.render("edit",{singledata});
});

app.post ("/updateData", async (req,res)=>{
   

    await schema.findByIdAndUpdate(req.body.id, req.body ).then(()=>{
        res.redirect ("/");
    })
});

app.listen(port,(err)=>{
    err ? console.log(err) : console.log(`server is started on port ${port}`);
});