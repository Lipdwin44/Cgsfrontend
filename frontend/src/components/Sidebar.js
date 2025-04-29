import React from 'react';
import {
  Drawer, List, ListItem, ListItemIcon, ListItemText,
  Box, Typography, Divider, Avatar
} from '@mui/material';
import { Work, Business, Apartment, Gavel, Settings } from '@mui/icons-material';

const Sidebar = () => {
  const items = [
    { text: 'Role', icon: <Work /> },
    { text: 'Position', icon: <Business /> },
    { text: 'Department', icon: <Apartment /> },
    { text: 'Project Bidding', icon: <Gavel /> },
    { text: 'Portal Master', icon: <Settings /> },
  ];

  return (
    <Drawer variant="permanent" anchor="left" sx={{ width: 240, flexShrink: 0 }}>
      <Box
        sx={{
          width: 240,
          bgcolor: '#2c3e50',
          height: '100vh',
          color: 'white',
        }}
      >
        {/* Logo Section */}
        <Box display="flex" flexDirection="column" alignItems="center" p={2}>
          <Avatar src="/cgs.jpeg" sx={{ width: 60, height: 60 }} />
          <Typography variant="h6" sx={{ mt: 1 }}>
            Admin
          </Typography>
        </Box>

        <Divider sx={{ bgcolor: '#ffffff33' }} />

        {/* Menu Items */}
        <List>
          {items.map(({ text, icon }) => (
            <ListItem button key={text}>
              <ListItemIcon sx={{ color: 'white' }}>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;

