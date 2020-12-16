const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');

//cloud config
cloudinary.config({
    cloud_name: "dpcbnn9ji",
    api_key: "115437583433565",
    api_secret: "QBdCck8NKNruBb1anWxng2YlKl8"
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