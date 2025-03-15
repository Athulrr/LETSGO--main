import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  Box,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DescriptionIcon from '@mui/icons-material/Description';
import LinkIcon from '@mui/icons-material/Link';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupsIcon from '@mui/icons-material/Groups';
import PhoneIcon from '@mui/icons-material/Phone';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CampView = () => {
  const [user, setUser] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:4007/view')
      .then((res) => {
        console.log(res);
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleOpen = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedId(null);
  };

  return (
    <div>
      {/* Floating Button */}
      <Fab
        color="success"
        aria-label="add"
        onClick={() => navigate('/campadd')}
        title="Add Campaign"
        sx={{
          position: 'fixed',
          bottom: '95px',
          right: '20px',
          zIndex: 1000,
          backgroundColor: '#4caf50',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#388e3c',
          },
        }}
      >
        HOST
      </Fab>

      {/* Main Content */}
      <Typography
        variant="h3"
        textAlign="center"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          marginBottom: '20px',
          color: '#4caf50',
        }}
      >
        Wanna Join A Campaign?
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: '95%',
          margin: '20px auto',
          boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.15)',
          borderRadius: '8px',
          maxHeight: '400px',
          overflowY: 'auto',
        }}
      >
        <Table
          sx={{
            tableLayout: 'auto',
            '& td, & th': {
              fontSize: { xs: '12px', sm: '14px' },
              wordWrap: 'break-word',
              textAlign: 'center',
              padding: { xs: '4px', sm: '8px' },
            },
          }}
        >
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: '#4caf50',
                '& th': {
                  color: '#000',
                  fontWeight: 'bold',
                  fontSize: { xs: '14px', sm: '16px' },
                },
              }}
            >
              <TableCell>Campaign Name</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.map((val, i) => (
              <TableRow key={i}>
                <TableCell>{val.campaign}</TableCell>
                <TableCell>{val.Location}</TableCell>
                <TableCell>
                  <Button
                    variant="text"
                    onClick={() => handleOpen(i)}
                    sx={{
                      color: '#4caf50',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Know More
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Popup Modal */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{
            backgroundColor: '#4caf50',
            color: '#fff',
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          Campaign Details
        </DialogTitle>
        <DialogContent
          sx={{
            padding: '20px',
            backgroundColor: '#f7f7f7',
          }}
        >
          {user
            .filter((_, i) => i === selectedId)
            .map((val, i) => (
              <Box key={i}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '10px', color: '#4caf50' }}>
                  {val.campaign || 'No Name available'}
                </Typography>
                <Divider sx={{ marginY: '10px' }} />
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <LocationOnIcon sx={{ marginRight: '10px', color: '#4caf50' }} />
                  <strong>City:</strong> {val.Location}
                </Typography>
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <DescriptionIcon sx={{ marginRight: '10px', color: '#4caf50' }} />
                  <strong>Description:</strong> {val.Description || 'No description available.'}
                </Typography>
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <LinkIcon sx={{ marginRight: '10px', color: '#4caf50' }} />
                  <strong>Location Link:</strong>{' '}
                  <a href={val.link} target="_blank" rel="noopener noreferrer">
                    {val.link}
                  </a>
                </Typography>
                <Divider sx={{ marginY: '10px' }} />
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <EventIcon sx={{ marginRight: '10px', color: '#4caf50' }} />
                  <strong>Date:</strong> {val.Date || 'No Date available.'}
                </Typography>
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <AccessTimeIcon sx={{ marginRight: '10px', color: '#4caf50' }} />
                  <strong>Time:</strong> {val.Time || 'No Time available.'}
                </Typography>
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <GroupsIcon sx={{ marginRight: '10px', color: '#4caf50' }} />
                  <strong>Volunteers:</strong> {val.volunteers || 'No Volunteers available.'}
                </Typography>
                <Divider sx={{ marginY: '10px' }} />
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <PhoneIcon sx={{ marginRight: '10px', color: '#4caf50' }} />
                  <strong>Phone:</strong> {val.Phone || 'No Phone available.'}
                </Typography>
              </Box>
            ))}
        </DialogContent>
        <DialogActions
          sx={{
            backgroundColor: '#f7f7f7',
            padding: '15px',
          }}
        >
          <Button onClick={handleClose} variant="contained" sx={{ backgroundColor: '#4caf50', color: '#fff' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CampView;