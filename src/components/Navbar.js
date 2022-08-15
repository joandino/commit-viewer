import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function DenseAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: '#2E3B55' }}>
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            Commit Viewer
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}