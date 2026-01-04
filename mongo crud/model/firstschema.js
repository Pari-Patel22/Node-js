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
    }
});
const firstschema = mongoose.model("Student",schema);

module.exports = firstschema;