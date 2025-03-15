const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: "dfjweqhcu", // Replace with your Cloudinary cloud name
    api_key: "496995333773726", // Replace with your Cloudinary API key
    api_secret: "vRkEZfKH9NQXjMCfDfya0LBOL8k", // Replace with your Cloudinary API secret
});

module.exports = cloudinary;
