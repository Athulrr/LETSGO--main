const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinaryConfig");

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "places",  // Folder name in Cloudinary
        allowed_formats: ["jpg", "jpeg", "png"], // Allowed formats for images
    },
});

const upload = multer({ storage });

module.exports = upload;
