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

interface UserRow {

    id: string;
    firstName: string;
    lastName: string;
    userIdNumber: string;
    email: string;
    emailConfirmed: string;
    role: string;

}
const StudentList = () => {
    const [users, setUsers] = React.useState<UserRow[]>([]);
    const [refresh, triggerRefresh] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);

    const handleRefresh = (val: boolean) => {
        triggerRefresh(val)
    }

    React.useEffect(() => {
        if (refresh) {
            const fetchLoans = async () => {
                try {
                    const response = await axiosInstance.get<UserRow[]>('/account/all-users');
                    setUsers(response.data);
                } catch (err: any) {
                    setError(err.message || 'Failed to fetch loans');
                } finally {
                    setLoading(false); // Stop loading spinner
                }
            };

            fetchLoans();
        }

        handleRefresh(false)
    }, [refresh]);

    return (
        <Container sx={{ display: 'flex', flexDirection: "column", width: "100%", minHeight: "100vh", alignItems: 'flex-start', justifyContent: "flex-start" }} component="div">
            <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: "5px" }}>
                <Link color="inherit" href="/home">
                    Home
                </Link>
                <Link

                    color="inherit"
                    href="/home/sudents"
                >
                    User List
                </Link>
            </Breadcrumbs>
            <DataTable users={users} />
        </Container>
    );
};

const columns = [
    { field: 'firstName', headerName: 'First Name', width: 120 },
    { field: 'lastName', headerName: 'Last Name', width: 120 },
    { field: 'userIdNumber', headerName: 'ID Number', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'emailConfirmed', headerName: 'Email Confirmed', width: 130, type: 'boolean' },
    { field: 'role', headerName: 'Role', width: 100 }
];


const paginationModel = { page: 0, pageSize: 5 };

export function DataTable({users}) {

    function handleClick(event) {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    }

    return (

        <Paper sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={users}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                sx={{ border: 0 }}
            />
        </Paper>

    );
}

export default StudentList;
