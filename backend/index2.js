const express = require("express");
const cors = require("cors");
const upload = require("./multerConfig");  // Ensure this handles file uploads correctly (Cloudinary integration)
require("./connect"); // Ensure this connects to your database
const Addmodel = require("./models/add");  // Import the Add model

const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  }));
  

// POST route to upload an image and save the place data
app.post("/a", upload.single("Image"), async (req, res) => {
  try {
      console.log("File uploaded:", req.file);  // Check file upload in the logs
      const { file } = req;  // Image file from Cloudinary
      const { body } = req;  // Other form data (Place details)

      if (file) {
          body.Image = file.path; // Store Cloudinary URL of the uploaded image
      }

      const newPlace = new Addmodel(body);
      await newPlace.save(); // Save place data in database
      res.status(201).send({ message: "Place added successfully", data: newPlace });
  } catch (error) {
      console.error("Error adding place:", error); // Log error for better debugging
      res.status(500).send({ message: "There was an error adding the place. Please try again." });
  }
});


// Fetch all places (GET route)
// Fetch all places (GET route)
app.get("/v", async (req, res) => {
    try {
        const places = await Addmodel.find(); // Fetch all places from the database
        res.status(200).send({ data: places }); // Send data as an object
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send({ message: "Error fetching places data" });
    }
});


// Accept a place (PUT route)
app.put("/accept/:id", async (req, res) => {
    try {
        const updatedPlace = await Addmodel.findByIdAndUpdate(
            req.params.id,
            { status: "accepted" }, // Update status to 'accepted'
            { new: true } // Return the updated document
        );

        if (!updatedPlace) {
            return res.status(404).send({ message: "Place not found" });
        }

        res.status(200).send({ message: "Place accepted successfully", place: updatedPlace });
    } catch (error) {
        console.error("Error accepting place:", error);
        res.status(500).send({ message: "Error accepting the place" });
    }
});

// Delete a place (DELETE route)
app.delete("/delete/:id", async (req, res) => {
    try {
        const deletedPlace = await Addmodel.findByIdAndDelete(req.params.id); // Delete the place by ID

        if (!deletedPlace) {
            return res.status(404).send({ message: "Place not found" });
        }

        res.status(200).send({ message: "Place rejected successfully" });
    } catch (error) {
        console.error("Error deleting place:", error);
        res.status(500).send({ message: "Error deleting place" });
    }
});

// Start server on port 4008
app.listen(4008, () => {
    console.log("Server is running on port 4008");
});