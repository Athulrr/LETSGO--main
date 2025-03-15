import React, { useState } from "react";
import {
  Typography,
  TextField,
  MenuItem,
  Button,
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ADD = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Place_Name: "",
    Place_Type: "",
    Place_Link: "",
    Place_Description: "",
    Adventure_Level: "",
    Family_Friendly: "",
    Risk_Level: "",
    Best_Time: "",
    Facilities: "",
    Activities: "",
    Price_Range: "",
    Image: null,
  });

  const [uploading, setUploading] = useState(false);

  const placeTypes = [
    { value: "beach", label: "Beach" },
    { value: "mountain", label: "Mountain" },
    { value: "park", label: "Park" },
    { value: "lake", label: "Lake" },
    { value: "waterfall", label: "Waterfall" },
    { value: "viewpoint", label: "Viewpoint" },
    { value: "camping", label: "Camping Site" },
    { value: "historical", label: "Historical Site" },
    { value: "museum", label: "Museum" },
    { value: "restaurant", label: "Restaurant" },
    { value: "cafe", label: "Café" },
    { value: "hotel", label: "Hotel" },
  ];

  const timeSlots = [
    { value: "morning", label: "Morning (6 AM - 12 PM)" },
    { value: "afternoon", label: "Afternoon (12 PM - 4 PM)" },
    { value: "evening", label: "Evening (4 PM - 8 PM)" },
    { value: "night", label: "Night (8 PM - 6 AM)" },
    { value: "allDay", label: "All Day" },
  ];

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      alert("No file selected!");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default"); // Correct upload preset
    formData.append("cloud_name", "dfjweqhcu"); // Optional if endpoint is correct
  
    try {
      setUploading(true);
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dfjweqhcu/image/upload", 
        formData
      );
  
      const imageUrl = response.data.secure_url;
      setFormData((prevState) => ({ ...prevState, Image: imageUrl }));
      setUploading(false);
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error.response?.data || error.message);
      alert("Error uploading image. Please try again.");
      setUploading(false);
    }
  };
  
  

  const addHandler = () => {
    // Ensure Image URL is included in formData
    axios
      .post(`${import.meta.env.THIS}/a`, formData) // Send data to the backend
      .then((res) => {
        alert(res.data.message); // Show success message from backend
        navigate("/Admin"); // Navigate to Admin page after success
      })
      .catch((err) => {
        console.error("Error adding place:", err);
        alert("There was an error adding the place.");
      });
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
      <Card sx={{ maxWidth: { xs: "100%", md: 900 }, margin: "0 auto", boxShadow: { xs: 0, md: 2 } }}>
        <CardHeader
          title={
            <Typography variant={isMobile ? "h5" : "h4"} align="center" gutterBottom sx={{ fontWeight: "bold" }}>
              Add a New Place
            </Typography>
          }
        />
        <CardContent>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{ display: "flex", flexDirection: "column", gap: { xs: 2, md: 3 } }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Place Name"
                  name="Place_Name"
                  fullWidth
                  value={formData.Place_Name}
                  onChange={(e) => setFormData({ ...formData, Place_Name: e.target.value })}
                  size={isMobile ? "small" : "medium"}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  label="Place Type"
                  name="Place_Type"
                  fullWidth
                  value={formData.Place_Type}
                  onChange={(e) => setFormData({ ...formData, Place_Type: e.target.value })}
                  size={isMobile ? "small" : "medium"}
                >
                  {placeTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  name="Place_Description"
                  fullWidth
                  multiline
                  rows={4}
                  value={formData.Place_Description}
                  onChange={(e) => setFormData({ ...formData, Place_Description: e.target.value })}
                  size={isMobile ? "small" : "medium"}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  label="Best Time to Visit"
                  name="Best_Time"
                  fullWidth
                  value={formData.Best_Time}
                  onChange={(e) => setFormData({ ...formData, Best_Time: e.target.value })}
                  size={isMobile ? "small" : "medium"}
                >
                  {timeSlots.map((time) => (
                    <MenuItem key={time.value} value={time.value}>
                      {time.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Entry Fee"
                  name="Price_Range"
                  fullWidth
                  value={formData.Price_Range}
                  onChange={(e) => setFormData({ ...formData, Price_Range: e.target.value })}
                  placeholder="e.g., $$ or 20-50 USD"
                  size={isMobile ? "small" : "medium"}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                  <Button
                    variant="contained"
                    component="label"
                    startIcon={<AddPhotoAlternateIcon />}
                    disabled={uploading}
                  >
                    {uploading ? "Uploading..." : "Upload Image"}
                    <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
                  </Button>
                  {formData.Image && (
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                      <img
                        src={formData.Image}
                        alt="Preview"
                        style={{
                          maxHeight: 200,
                          maxWidth: "100%",
                          objectFit: "contain",
                          borderRadius: "8px",
                        }}
                      />
                    </Box>
                  )}
                </Box>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              onClick={addHandler}
              sx={{
                mt: 3,
                py: { xs: 1.5, md: 2 },
                alignSelf: "center",
              }}
            >
              Submit Place
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ADD;
