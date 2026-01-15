const schema = require("../model/firstSchema");

module.exports.addData = async (req, res) => {
    await schema.create(req.body).then((data) => {
        res.json({ msg: "Data added successfully", data: data })
    })
}

module.exports.getData = async (req, res) => {
    await schema.find().then((data) => {
        res.json({ data: data })
    })
}

module.exports.deleteData = async (req, res) => {
  const id = req.query.id;

  console.log("DELETE ID:", id); // 🔴 VERY IMPORTANT

  if (!id) {
    res.send("ID not received"); // TEMP DEBUG
    return;
  }

  await schema.findByIdAndDelete(id);

  res.send("Deleted successfully");
};



module.exports.updateData = async (req, res) => {
    await schema.findByIdAndUpdate(req.body.id, req.body, { new: true }).then((data) => {
        res.json({ msg: "Data Update successfully", data: data })
    })
}
