const express = require('express');
const port = 2208;


const app = express();

// app.get("/", (req, res) => {
//     res.write("<h1>Hello</h1>");
//     res.end();
// })

// app.get("/new", (req, res) => {
//     res.write("<h1>Hello from New Route</h1>");
//     res.end();
// })





app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const data = []

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
// app.get("/", (req, res) => {
//     res.render("Home");
// })

// app.get("/contact", (req, res) => {
//     res.render("Contact");
// })

// app.get("/about", (req, res) => {
//     res.render("About");
// })



app.listen(port , (err) => {
    err ? console.log(err) : console.log(`Server is running on port ${port}`);
});