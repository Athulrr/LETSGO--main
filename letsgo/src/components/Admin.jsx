import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper } from "@mui/material";
import axios from "axios";

const Admin = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.THIS-IS}v`)
      .then((response) => {
        setPlaces(response.data);
      })
      .catch((error) => console.error("Error fetching places:", error));
  }, []); // Initially fetch all places on load

  const fetchUpdatedPlaces = () => {
    // After a place is accepted or rejected, refresh the list
    axios
      .get(`${import.meta.env.THIS-IS}v`)
      .then((response) => {
        setPlaces(response.data); // Update places with the new list
      })
      .catch((error) => console.error("Error fetching places:", error));
  };

  const addHandler = (id) => {
    axios
      .put(`http://localhost:4008/accept/${id}`)
      .then((res) => {
        alert(res.data.message || "Place accepted successfully!");
        fetchUpdatedPlaces(); // Refresh the list after accepting a place
      })
      .catch((err) => console.error("Error accepting place:", err));
  };

  const handleReject = (id) => {
    axios
      .delete(`http://localhost:4008/delete/${id}`)
      .then(() => {
        alert("Place rejected successfully!");
        fetchUpdatedPlaces(); // Refresh the list after rejecting a place
      })
      .catch((error) => console.error("Error deleting place:", error));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Place Name</TableCell>
            <TableCell>Place Type</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Best Time</TableCell>
            <TableCell>Entry Fee</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {places.length > 0 ? (
            places.map((place) => (
              <TableRow key={place._id}>
                <TableCell>{place.Place_Name}</TableCell>
                <TableCell>{place.Place_Type}</TableCell>
                <TableCell>{place.Place_Description}</TableCell>
                <TableCell>{place.Best_Time}</TableCell>
                <TableCell>{place.Price_Range}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => addHandler(place._id)}>
                    Accept
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleReject(place._id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
                No Data Available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Admin;
