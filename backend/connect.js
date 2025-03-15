var mongoose = require('mongoose');
mongoose.connect("mongodb+srv://adarshcp:adarshcp02@cluster0.vfui1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((err) => {
        console.log("Database connection error: ", err);
    });