import React, { useEffect, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

const TemporaryAlert = ({ message, open, handleClose }) => {
    return (
        <Snackbar 
            open={open} 
            autoHideDuration={6000} // Duration before it disappears
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Positioning
        >
            <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};