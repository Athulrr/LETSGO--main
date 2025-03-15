import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      storedUser &&
      storedUser.username === credentials.username &&
      storedUser.password === credentials.password
    ) {
      alert("Login successful!");
      navigate("/dashboard"); // Replace with the actual route for the logged-in page
    } else {
      alert("Invalid username or password.");
    }
  };

  return (
    <Box p={4} sx={{ maxHeight: "90vh", overflow: "auto" }}>
      <Paper sx={{ p: { xs: 2, sm: 4 }, maxWidth: "600px", margin: "auto" }}>
        <form onSubmit={handleLogin}>
          <Stack gap={2}>
            <Typography variant="h4" sx={{ mb: 1, textAlign: "center" }}>
              Login
            </Typography>
            <TextField
              name="username"
              value={credentials.username}
              onChange={handleChange}
              label="Username"
              fullWidth
            />
            <TextField
              name="password"
              value={credentials.password}
              onChange={handleChange}
              label="Password"
              type="password"
              fullWidth
            />
            <Box textAlign="center" mt={2}>
              <Button type="submit" variant="contained" size="large">
                Login
              </Button>
            </Box>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;