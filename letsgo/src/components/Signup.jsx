import {
  Box,
  Button,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNo: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(formData));
    alert("Signup successful! Redirecting to Login...");
    navigate("/Login"); // Redirect to login page
  };

  return (
    <Box p={4} sx={{ maxHeight: "90vh", overflow: "auto" }}>
      <Paper sx={{ p: { xs: 2, sm: 4 }, maxWidth: "800px", margin: "auto" }}>
        <form onSubmit={handleSignup}>
          <Stack gap={2}>
            <Typography variant="h4" sx={{ mb: 1, textAlign: "center" }}>
              Signup
            </Typography>
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              User Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  label="Full Name"
                  type="text"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  label="Email"
                  type="email"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="contactNo"
                  value={formData.contactNo}
                  onChange={handleChange}
                  label="Contact No"
                  type="number"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  label="Username"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  label="Password"
                  type="password"
                  fullWidth
                />
              </Grid>
            </Grid>
            <Box textAlign="center" mt={2}>
              <Button type="submit" variant="contained" size="large">
                SignUp
              </Button>
            </Box>
            <Box textAlign="center">
              <Typography variant="body2" display="inline">
                Already a user?&nbsp;
              </Typography>
              <Link component={RouterLink} to="/Login" underline="hover">
                Login
              </Link>
            </Box>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default Signup;
