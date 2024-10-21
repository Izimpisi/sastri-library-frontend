import React from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography,
    List, ListItem, ListItemText, ListItemAvatar, Avatar, IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchBarWithFilter from '../Loans/FilterSeachbar';
import axiosInstance from '../../../lib/axiosInstance';
import { useDialog } from '../../../lib/GlobalDialog';

export interface Book {
    bookId: number;
    title: string;
    datePublished: string;
    description: string;
    author: string;
    isbn: string;
}


const NewReservationDialog = ({ open, onClose, handleRefresh }) => {
    const [selectedBook, setSelectedBook] = React.useState<Book>(null);
    const [searchResults, setSearchResults] = React.useState([]);

    const { showDialog } = useDialog();

    const handleLoanAction = (message: string) => {
        const isLoaned = true; // Simulating condition

        if (isLoaned) {
            showDialog(message);
        }
    };

    const handleSearch = async (filter: string, searchValue: string) => {
        try {
            const response = await axiosInstance.get(`/books/search`, {
                params: {
                    filter,
                    query: searchValue,
                },
            });

            setSearchResults(response.data); // Store the search results in state
            console.log('Search results:', response.data);
        } catch (error) {
            console.error('Search failed:', error.response?.data || error.message);
        }
    };

    const handleAddBookToLoan = async (element: Book) => {
        setSelectedBook(element);
        setSearchResults([]);
    }


    const onSubmit = async () => {
        if (Object.keys(selectedBook).length > 0) {
            try {
                await axiosInstance.post("/reservation", { bookId: selectedBook.bookId })
                setSelectedBook(null);
                handleRefresh(true)
            } catch (e) {
                handleLoanAction(e.response.data)
                console.log(e)
            }
        }
        onClose();
    };

    return (
        <form noValidate>
            <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
                <DialogTitle>
                    Create New Reservation
                    <Typography variant="subtitle2" color="textSecondary" component="div">
                        Search for Book
                    </Typography>
                </DialogTitle>
                <SearchBarWithFilter handleSearchEvent={handleSearch} />
                <DialogContent className='px-5'>
                    <List sx={{ width: '100%', padding: 0, bgcolor: 'background.paper' }}>
                        {searchResults.map(el =>
                            <ListItem alignItems="flex-start" className='pl-0' key={el.bookId}>
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={el.title}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                sx={{ color: 'text.primary', display: 'inline' }}
                                            >
                                                {el.author}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                                <IconButton
                                    edge="end"
                                    aria-label="add"
                                    onClick={() => handleAddBookToLoan(el)}
                                >
                                    <AddIcon color='primary' />
                                </IconButton>
                            </ListItem>)}

                        {selectedBook && Object.keys(selectedBook).length > 0 ? (
                            <ListItem alignItems="flex-start" className='pl-0'>
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={selectedBook.title}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                sx={{ color: 'text.primary', display: 'inline' }}
                                            >
                                                {selectedBook.author}
                                            </Typography>
                                            - {selectedBook.description}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                        ) : null}

                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={onSubmit} color="primary">
                        Create Reservation
                    </Button>
                </DialogActions>
            </Dialog>
        </form>
    );
};

export default NewReservationDialog;
