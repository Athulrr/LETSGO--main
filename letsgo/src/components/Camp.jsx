import React, { useState } from 'react';
import { Button, Grid, TextField, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Camp = () => {
  
  var navigate = useNavigate()
  var [inputs, setInputs] = useState({ campaign: "",
    Description: "",
    link: "",
    Location: "",
    Group: "",
    Date: "",
    Duration: "",
    volunteers: "",    
    Requirements: "",
    Name: "",
    Phone: ""});
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const inputHandler =(e)=>{
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    console.log(inputs)
  }  
  const addhandler = () => {
    console.log("clicked");
        axios.post("http://localhost:4007/madd", inputs)
        .then((res) => {
          alert(res.data.message)
          navigate("/camp")
        })
        .catch((err) => {
          console.log(err)
        })
  }
 
  return (
    <Box
      sx={{
        fontFamily: 'Roboto, sans-serif',
        padding: '20px',
        maxWidth: '900px',
        margin: 'auto',
        backgroundColor: '#f9f9f9',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
      }}
    >
      <Typography
        variant="h4"
        textAlign="center"
        gutterBottom
        sx={{ fontWeight: 'bold', color: '#333', marginBottom: '30px' }}
      >
        Campaign Details
      </Typography>

      <section style={{ marginBottom: '40px' }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#1976d2', marginBottom: '20px' }}
        >
          General Information
        </Typography>
        <TextField label="Title of Campaign" variant="outlined" name="campaign" onChange={inputHandler} fullWidth margin="normal" />
        <TextField label="Description" variant="outlined" name="Description" onChange={inputHandler} multiline rows={4} fullWidth margin="normal" />
        <TextField label="Link" variant="outlined" name="link"  onChange={inputHandler} fullWidth margin="normal" />
        <TextField label="City/District/State" variant="outlined" name="Location" onChange={inputHandler} fullWidth margin="normal" />
        <TextField label="Name of Organization/Individual" variant="outlined" onChange={inputHandler} name="Group" fullWidth margin="normal" />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField label="Date" variant="outlined" name="Date" type='date'  onChange={inputHandler} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={6}>
          <TextField label="Time" variant="outlined" name="Time" onChange={inputHandler} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
          </Grid>
        </Grid>
        <TextField label="Duration" variant="outlined" name="Duration" onChange={inputHandler} fullWidth margin="normal" />
        <TextField label="Number of Volunteers Needed" variant="outlined" onChange={inputHandler} name="volunteers" fullWidth margin="normal" />
        <TextField label="Requirements" variant="outlined" name="Requirements" onChange={inputHandler} fullWidth margin="normal" />
      </section>

      <section style={{ marginBottom: '40px' }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#1976d2', marginBottom: '20px' }}
        >
          Contact Information
        </Typography>
        <TextField label="Name" variant="outlined" name="Name" onChange={inputHandler} fullWidth margin="normal" />
        <TextField label="Phone Number" variant="outlined" name="Phone" onChange={inputHandler} fullWidth margin="normal" />
        <TextField label="Email" variant="outlined" name="email" onChange={inputHandler} fullWidth margin="normal" />
      </section>

      <section style={{ marginBottom: '20px' }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#1976d2', marginBottom: '20px' }}
        >
          Upload Image
        </Typography>
        <Button
          variant="contained"
          component="label"
          sx={{ backgroundColor: '#1976d2', color: '#fff', marginBottom: '20px' }}
        >
          Choose Image
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />
        </Button>

        {imagePreview && (
          <Box textAlign="center" sx={{ marginTop: '20px' }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 'bold', color: '#555', marginBottom: '10px' }}
            >
              Image Preview:
            </Typography>
            <img
              src={imagePreview}
              alt="Preview"
              style={{
                maxWidth: '100%',
                maxHeight: '300px',
                borderRadius: '8px',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            />
          </Box>
        )}
      </section>

      <Grid container justifyContent="center" sx={{ marginTop: '10px', marginBottom: '40px' }}>
        <Button
          type="submit"
          variant="contained"
          size="large"
          onClick={addhandler}
          sx={{ padding: '10px 30px', backgroundColor: '#1976d2', color: '#fff' }}
        >
          Submit
        </Button>
      </Grid>
    </Box>
  );
};

export default Camp;