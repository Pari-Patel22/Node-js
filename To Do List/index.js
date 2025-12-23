const express = require('express');
const port = 2204;


const app = express();




app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

let data = []

app.get("/", (req, res) => {
    res.render("index",{data});
})


app.post("/addData", (req, res) => {
   let obj = {
    id: Date.now(),
    ...req.body
   }
    data.push(obj);
    res.redirect("/");
})

app.get("/deleteData/:id", (req, res) => {
    let newData = data.filter((item)=>item.id != req.params.id);
    data = newData;
    res.redirect("/");
});

app.get("/editData", (req, res) => {
    let singledata = data.find((item)=> item.id == req.query.id);
    res.render("edit", {singledata});
});

app.post ("/updatedata", (req, res) => {
    let singledata = data.find((item)=> item.id == req.body.id);
    singledata.name = req.body.name;
    singledata.age = req.body.age;
    singledata.city = req.body.city;
    res.redirect("/");
}
);


app.listen(port , (err) => {
    err ? console.log(err) : console.log(`Server is running on port ${port}`);
});