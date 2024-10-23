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
    datePublished: Yup.number()
        .required('Date published is required.')
        .min(1900, 'Year must be 1900 or later.')
        .max(new Date().getFullYear(), `Year cannot be in the future.`)
});

const NewBookDialog = ({ open, onClose, onCreate, handleRefresh }) => {

    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = async (data) => {
        console.log(data)
        onCreate(data);
        reset();
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
                            <FormLabel>Date Published (Year)</FormLabel>
                            <Controller
                                name="datePublished"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        type="number"
                                        error={!!errors.datePublished}
                                        helperText={errors.datePublished ? errors.datePublished.message : ''}
                                    />
                                )}
                            />
                        </FormControl>
                    </List>
                    <Divider sx={{ my: 2 }} />
                    <Button type="submit" color="primary" variant="contained">
                        Create Book Record
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default NewBookDialog;
