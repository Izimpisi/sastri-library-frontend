"use client"

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import axiosInstance from '../../../lib/axiosInstance';
import Link from 'next/link';
import { DataGrid } from '@mui/x-data-grid';
import { Button, TextField, Box, Typography, Container, Paper, Card, CardMedia, CardContent, Breadcrumbs } from '@mui/material';
import SearchBarWithFilter from '../Loans/FilterSeachbar';
import AddIcon from '@mui/icons-material/Add'
import NewBookDialog from './NewBookDialog';


const LibraryBooks = () => {


    return (
        <Container sx={{ display: 'flex', flexDirection: "column", width: "100%", minHeight: "100vh", alignItems: 'flex-start', justifyContent: "flex-start" }} component="div">
            <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: "5px" }}>
                <Link color="inherit" href="/home">
                    Home
                </Link>
                <Link
                    color="inherit"
                    href="/home/books"
                >
                    Manage Books
                </Link>
            </Breadcrumbs>
            <DataTable />


        </Container>
    );
};

const columns = [
    { field: 'isbn', headerName: 'ISBN Number', width: 110 },
    { field: 'title', headerName: 'Title', width: 130 },
    { field: 'description', headerName: 'Description', width: 200 },
    {
        field: 'author',
        headerName: 'Author',
        width: 100
    },
    {
        field: 'datePublished',
        headerName: 'Published Year',
        width: 120
    },
    {
        field: 'copyCount',
        headerName: 'Copies',
        width: 80
    }
];


const paginationModel = { page: 0, pageSize: 5 };

interface BookRow {
    bookId: number;
    isbn: string;
    title: string;
    description: string;
    author: string;
    date_Published: number;
    copyCount: number;
};

export function DataTable() {

    const [searchResults, setSearchResults] = React.useState<BookRow[]>([]);
    const [refresh, triggerRefresh] = React.useState<boolean>(true);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);
    const [dialogOpen, setDialogOpen] = React.useState(false);

    const handleOpen = () => setDialogOpen(true);
    const handleClose = () => setDialogOpen(false);

    const handleAddBook = async (data: any) => {
        try {
            const newBook = await axiosInstance.post("/books/add", data);
            setSearchResults(newBook);
            handleRefresh(true);
        } catch (e) {
            console.log(e)
        }
    }

    const handleRefresh = (val: boolean) => {
        triggerRefresh(val)
    }

    React.useEffect(() => {
        if (refresh) {
            const fetchBooks = async () => {
                try {
                    const response = await axiosInstance.get<BookRow[]>('/books');
                    setSearchResults(response.data);
                } catch (err: any) {
                    setError(err.message || 'Failed to fetch loans');
                } finally {
                    setLoading(false);
                }
            };

            fetchBooks();
        }

        handleRefresh(false)
    }, [refresh]);

    const handleSearch = async (filter: string, searchValue: string) => {
        try {
            const response = await axiosInstance.get(`/books/search/list`, {
                params: {
                    filter,
                    query: searchValue,
                },
            });

            setSearchResults(response.data); // Store the search results in state
        } catch (error) {
            console.error('Search failed:', error.response?.data || error.message);
        }
    };


    return (
        <><Paper sx={{ height: 400, width: '100%' }}>
            <SearchBarWithFilter handleSearchEvent={handleSearch} />
            <DataGrid
                rows={searchResults}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                sx={{ border: 0 }}
                getRowId={e => e.bookId}
            />
        </Paper>
            <Button
                className="mt-2"
                startIcon={<AddIcon />}
                variant="outlined"
                color="primary"
                onClick={handleOpen}
            >
                Add Books
            </Button>
            <NewBookDialog
                open={dialogOpen}
                onClose={handleClose}
                onCreate={handleAddBook}
            />
        </>
    );
}

export default LibraryBooks;
