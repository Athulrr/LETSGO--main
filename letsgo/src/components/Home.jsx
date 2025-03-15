import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Masonry from 'react-masonry-css';
import Typography from '@mui/material/Typography';

const Home = () => {
  const [home, setHome] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4008/v')
      .then((response) => {
        const acceptedPlaces = response.data.filter((place) => place.status === "accepted");
        setHome(acceptedPlaces);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Breakpoints for Masonry grid
  const breakpointColumnsObj = {
    default: 4, // 4 columns for large screens
    1200: 3, // 3 columns for medium screens
    900: 2, // 2 columns for tablets
    500: 2, // 2 columns for mobile devices
  };

  const styles = {
    container: { padding: '20px', minHeight: '100vh' },
    heading: { textAlign: 'center', marginBottom: '20px', fontSize: '2.5rem', fontWeight: 'bold' },
    card: { borderRadius: '15px', backgroundColor: '#fff', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', marginBottom: '15px' },
    image: { width: '100%', height: '200px', objectFit: 'cover', borderRadius: '15px 15px 0 0' },
    content: { padding: '15px', textAlign: 'center' },
    title: { fontSize: '1.2rem', color: '#1976d2', fontWeight: 'bold', marginBottom: '10px' },
    description: { fontSize: '0.9rem', color: '#555' },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Let&apos;s Go</h1>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid"
        columnClassName="masonry-grid-column"
      >
        {home.map((place) => (
          <div key={place._id} style={styles.card}>
            <img src={place.Image} alt={place.Place_Name} style={styles.image} />
            <div style={styles.content}>
              <Typography style={styles.title}>{place.Place_Name}</Typography>
              <p style={styles.description}>{place.Place_Description}</p>
            </div>
          </div>
        ))}
      </Masonry>
    </div>
  );
};

export default Home;
