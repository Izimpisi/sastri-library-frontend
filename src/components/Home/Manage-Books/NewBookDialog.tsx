import React from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, FormLabel, Typography,
    List, ListItem, ListItemText, ListItemAvatar, Divider, Avatar, IconButton
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AddIcon from '@mui/icons-material/Add';
import axiosInstance from '../../../lib/axiosInstance';

// Define the validation schema using Yup
const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required.'),
    author: Yup.string().required('Author is required.'),
    description: Yup.string().required('Description is required.'),
    isbn: Yup.string()
        .required('ISBN is required.')
        .length(13, 'ISBN must be 13 characters long.')
        .matches(/^\d{13}$/, 'ISBN must be only numeric digits.'),
    date_Published: Yup.string()
        .required('Date published is required.')
        .matches(/^\d{4}$/, 'Year must be a 4-digit number.')
        .test('is-valid-year', 'Year must be 1900 or later and cannot be in the future.',
            value => {
                const year = parseInt(value, 10);
                return year >= 1900 && year <= new Date().getFullYear();
            }
        ),
});

const NewBookDialog = ({ open, onClose, onCreate }) => {

    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = async (data) => {
        onCreate(data);
        // reset();
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogContent>

                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <List>
                        <FormControl fullWidth margin="normal">
                            <FormLabel>Title</FormLabel>
                            <Controller
                                name="title"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        error={!!errors.title}
                                        helperText={errors.title ? errors.title.message : ''}
                                    />
                                )}
                            />
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <FormLabel>Author</FormLabel>
                            <Controller
                                name="author"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        error={!!errors.author}
                                        helperText={errors.author ? errors.author.message : ''}
                                    />
                                )}
                            />
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <FormLabel>Description</FormLabel>
                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        error={!!errors.description}
                                        helperText={errors.description ? errors.description.message : ''}
                                    />
                                )}
                            />
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <FormLabel>ISBN</FormLabel>
                            <Controller
                                name="isbn"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        error={!!errors.isbn}
                                        helperText={errors.isbn ? errors.isbn.message : ''}
                                    />
                                )}
                            />
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <FormLabel>Date Published</FormLabel>
                            <Controller
                                name="date_Published"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        type="number"
                                        error={!!errors.date_Published}
                                        helperText={errors.date_Published ? errors.date_Published.message : ''}
                                    />
                                )}
                            />
                        </FormControl>
                    </List>
                    <Divider sx={{ my: 2 }} />
                    <Button type="submit" color="primary" variant="contained">
                        Create Book Record
                    </Button>
                    <Button className='ml-2' color="primary" onClick={onClose} variant="contained">
                        Cancel
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default NewBookDialog;
