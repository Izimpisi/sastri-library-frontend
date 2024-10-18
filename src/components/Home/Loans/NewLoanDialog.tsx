import React from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, FormLabel, Typography,
    List, ListItem, ListItemText, ListItemAvatar, Divider, Avatar, IconButton
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Dayjs } from 'dayjs';
import AddIcon from '@mui/icons-material/Add';
import WrapDatePicker from './DatePicker';
import SearchBarWithFilter from './FilterSeachbar';
import axiosInstance from '../../../lib/axiosInstance';

export interface Book {
    bookId: number;
    title: string;
    datePublished: string;
    description: string;
    author: string;
    isbn: string;
}

const validationSchema = Yup.object().shape({
    loanDate: Yup.date().required('Loan date is required.').typeError('Invalid date format'),
    dueDate: Yup.date()
        .required('Due date is required.')
        .min(Yup.ref('loanDate'), 'Due date cannot be before loan date')
        .typeError('Invalid date format'),
    returnDate: Yup.date()
        .nullable()
        .min(Yup.ref('loanDate'), 'Return date cannot be before loan date')
        .typeError('Invalid date format'),
});

const NewLoanDialog = ({ open, onClose, onCreate, handleRefresh }) => {
    const [selectedBook, setSelectedBook] = React.useState<Book>(null);
    const [searchResults, setSearchResults] = React.useState([]);
    const [dateDue, setDateDue] = React.useState<Dayjs | null>(null);


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

    const { control, handleSubmit, register, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validationSchema)
    });


    const onSubmit = async () => {
        if (Object.keys(selectedBook).length > 0) {
            console.log({ dateDue, id: selectedBook.bookId })
            try {
                await axiosInstance.post("/loan", { bookId: selectedBook.bookId, dueDate: dateDue })
                setSelectedBook(null);
                handleRefresh(true)
            } catch (e) {
                console.log(e)
            }
        }
        reset(); // Reset the form after submission
        onClose(); // Close the dialog
    };

    return (
        <form noValidate>
            <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
                <DialogTitle>
                    Create New Loan
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
                    <FormControl fullWidth margin="normal">
                        <FormLabel>Due Date</FormLabel>
                        <Controller
                            name="dueDate"
                            control={control}
                            render={({ field }) => {
                                return <WrapDatePicker dateOfEventValue={dateDue} setDateOfEventValue={setDateDue} />
                            }} />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={onSubmit} color="primary">
                        Create Loan
                    </Button>
                </DialogActions>
            </Dialog>
        </form>
    );
};

export default NewLoanDialog;
