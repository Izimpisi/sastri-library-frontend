"use client"

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import axiosInstance from '../../../lib/axiosInstance';
import Link from 'next/link';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, TextField, Box, Typography, Container, Paper, Card, CardMedia, CardContent, Breadcrumbs } from '@mui/material';


const AdminBills = () => {
    const router = useRouter();

    const columns: GridColDef[] = [
        { field: 'firstName', headerName: 'First Name', width: 130 },
        { field: 'lastName', headerName: 'Last Name', width: 130 },
        {
            field: 'currentAmountOwing',
            headerName: 'Amount Owing',
            width: 150,
            type: 'number',
            valueFormatter: (params) => `R ${params}`,
        },
        {
            field: 'billPaidAmount',
            headerName: 'Paid Amount',
            width: 150,
            type: 'number',
            valueFormatter: (params) => `R ${params}`,
        },
        {
            field: 'daysOutstanding',
            headerName: 'Days Outstanding',
            width: 130,
            type: 'number',
        },
    ];

    return (
        <Container sx={{ display: 'flex', flexDirection: "column", width: "100%", minHeight: "100vh", alignItems: 'flex-start', justifyContent: "flex-start" }} component="div">
            <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: "5px" }}>
                <Link color="inherit" href="/home">
                    Home
                </Link>
                <Link
                    color="inherit"
                    href="/home/bills"
                >
                    Bills
                </Link>
            </Breadcrumbs>
            <DataTable columns={columns} />
        </Container>
    );
};


const rows = [
   
];

const paginationModel = { page: 0, pageSize: 5 };

export function DataTable({ columns }) {

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
                sx={{ border: 0 }}
                getRowId={e => e.isbn}
            />
        </Paper>

    );
}

export default AdminBills;
