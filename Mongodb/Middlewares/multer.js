const multer = require("multer");

const storage = multer.diskStorage({
    destination : (req, file, cb)=>{
        cb(null,"./Uploads/")
    },
    filename : (req, file, cb)=>{
        cb(null,file.fieldname + "_" + Date.now())
    }
})

const uploads = multer ({storage:storage}).single("image")

module.exports = uploads;