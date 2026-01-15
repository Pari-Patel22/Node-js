const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
    type : String,
    required :true
    },
    age: {
    type : Number,
    required :true
    },
    city: {
    type : String,
    required :true
    },
    
});
const Firstschema = mongoose.model("Student",schema);

module.exports = Firstschema;