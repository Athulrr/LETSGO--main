import React from 'react';
import { AppBar, Toolbar, IconButton, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import CampaignOutlined from '@mui/icons-material/CampaignOutlined';
import InfoOutlined from '@mui/icons-material/InfoOutlined';

const navItems = [
  { path: '/home', icon: <HomeRoundedIcon fontSize="medium" />, label: 'Home' },
  { path: '/add', icon: <AddCircleOutline fontSize="medium" />, label: 'Add' },
  { path: '/camp', icon: <CampaignOutlined fontSize="medium" />, label: 'Campaign' },
  { path: '/info', icon: <InfoOutlined fontSize="medium" />, label: 'Info' },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <AppBar
      position="fixed"
      sx={{
        top: 'auto',
        bottom: 0,
        background: 'white',
        boxShadow: 'none',
        padding: { xs: '6px 0', sm: '0px 0' },
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          height: { xs: '70px', sm: '80px' },
          position: 'relative',
        }}
      >
        {/* Active Indicator (Glides smoothly) */}
        {/* <motion.div
          layout
          style={{
            position: 'absolute',
            bottom: 10,
            width: 50,
            height: 50,
            borderRadius: '50%',
            backgroundColor: '#4caf50',
            boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
          }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        /> */}

        {navItems.map(({ path, icon }) => {
          const isActive = location.pathname === path;
          return (
            <Link key={path} to={path} style={{ textDecoration: 'none' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                {/* Moves the active indicator smoothly */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    style={{
                      position: 'absolute',
                      bottom: 10,
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      backgroundColor: '#4caf50',
                      boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 2,
                    }}
                  >
                    {icon}
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                >
                  <IconButton
                    disableRipple
                    sx={{
                      color: isActive ? 'transparent' : '#000',
                      padding: '0',
                    }}
                  >
                    {icon}
                  </IconButton>
                </motion.div>
              </Box>
            </Link>
          );
        })}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
