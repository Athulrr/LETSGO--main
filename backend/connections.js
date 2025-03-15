var mongoose = require('mongoose')
mongoose.connect("mongodb+srv://nahanourin:nourin03@cluster0.9t36o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
    console.log("Database connected")
    })
    .catch((err) => {
        console.log(err)
    }
)