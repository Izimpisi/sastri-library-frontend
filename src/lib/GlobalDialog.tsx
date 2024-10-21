"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

// Define the context type
interface DialogContextType {
    showDialog: (message: string) => void;
}

// Create a context for the dialog
const DialogContext = createContext<DialogContextType | undefined>(undefined);

// Custom hook to use the dialog context
export const useDialog = () => {
    const context = useContext(DialogContext);
    if (!context) {
        throw new Error("useDialog must be used within a DialogProvider");
    }
    return context;
};

// Define the props for the provider
interface DialogProviderProps {
    children: ReactNode;
}

// Create the DialogProvider component
export const DialogProvider: React.FC<DialogProviderProps> = ({ children }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    const showDialog = (msg: string) => {
        setMessage(msg);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <DialogContext.Provider value={{ showDialog }}>
            {children}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Warning</DialogTitle>
                <DialogContent>
                    <p>{message}</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </DialogContext.Provider>
    );
};
