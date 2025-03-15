//to import 
var express = require("express")
var cors = require("cors")
require("./connections")
var Gomodel=require("./models/letsgo")

// to initialise
var app = express()

// middlewear
app.use(express.json())
app.use(cors());
// to create api
app.get('/trial', (req, res) => {
    res.send("Its our app")
})
// to run create a port for running 

app.post('/add', (req, res) => {
    res.send("Its our app")
})
app.post('/madd', async(req, res) => {
    try {
        await Gomodel(req.body).save()
        res.send({message:"data added"})
    } catch (error) {
        console.log(error)
    }
})
app.get('/view', async (req, res) => {
  
    try {
        var goo = await Gomodel.find()
      res.send(goo)
    } catch (error) {
        console.log(error)
    }
    

})
app.delete('/delete/:id', async (req, res) => {
    try {
         await Gomodel.findByIdAndDelete(req.params.id)
        res.send({message:"Deleted succesfully"})
    } catch (error) {
        console.log(error)
    }


})
app.put('/update/:id', async (req, res) => {
  try {
      await Gomodel.findByIdAndUpdate(req.params.id, req.body)
      res.send({message:"Updated succesfully"})
  } catch (error) {
    console.log(error)
  }


})

     
app.listen(4007, () => {
    console.log("Port is running")
})