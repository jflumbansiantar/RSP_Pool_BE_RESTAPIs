const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');

//cloud config
cloudinary.config({
    cloud_name: "dtej9g5ar",
    api_key: "797498688992352",
    api_secret: "Z1E895_U09440ABNkQ5FIZVdmLM"
});

//storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: "RSP_Pool",
    allowedFormats: ["jpg", "jpeg", "png", "svg"],
    filename: (req, files, cb) => {
        cb(null, Date.now() + "_" + files.originalname.split(".")[0]);
    },
});

const uploader = multer({
    storage: storage,
});

module.exports = {uploader};