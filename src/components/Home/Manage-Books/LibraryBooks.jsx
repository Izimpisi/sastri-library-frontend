"use client"

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/lib/axiosInstance';
import Link from 'next/link';
import { DataGrid } from '@mui/x-data-grid';
import { Button, TextField, Box, Typography, Container, Paper, Card, CardMedia, CardContent, Breadcrumbs } from '@mui/material';


const LibraryBooks = () => {
    const router = useRouter();

    return (
        <Container sx={{ display: 'flex', flexDirection: "column", width: "100%", minHeight: "100vh", alignItems: 'flex-start', justifyContent: "flex-start" }} component="div">
            <Breadcrumbs aria-label="breadcrumb" sx={{marginBottom: "5px"}}>
                <Link underline="hover" color="inherit" href="/home">
                    Home
                </Link>
                <Link
                    underline="hover"
                    color="inherit"
                    href="/home/manage-books"
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
    { field: 'description', headerName: 'Description', width: 160 },
    {
        field: 'author',
        headerName: 'Author',
        width: 100
    },
    {
        field: 'publishedYear',
        headerName: 'Published Year',
        width: 120
    }
];

const rows = [
    { isbn: 1, title: 'Snow', description: 'Jon', author: "Jon Coffee", publishedYear: 1935 },
    { isbn: 2, title: 'Lannister', description: 'Cersei', author: "Jon Coffee", publishedYear: 1942 },
    { isbn: 3, title: 'Lannister', description: 'Jaime', author: "Jon Coffee", publishedYear: 1945 },
    { isbn: 4, title: 'Stark', description: 'Arya', author: "Jon Coffee", publishedYear: 2016 },
    { isbn: 5, title: 'Targaryen', description: 'Daenerys', author: "Jon Coffee", publishedYear: 2013 },
    { isbn: 6, title: 'Melisandre', description: null, author: "Jon Coffee", publishedYear: 1950 },
    { isbn: 7, title: 'Clifford', description: 'Ferrara', author: "Jon Coffee", publishedYear: 1944 },
    { isbn: 8, title: 'Frances', description: 'Rossini', author: "Jon Coffee", publishedYear: 1936 },
    { isbn: 9, title: 'Roxie', description: 'Harvey', author: "Jon Coffee", publishedYear: 1965 },
];

const paginationModel = { page: 0, pageSize: 5 };

export function DataTable() {

    function handleClick(event) {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    }

    return (

        <Paper sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
                getRowId={e => e.isbn}
            />
        </Paper>

    );
}

export default LibraryBooks;
