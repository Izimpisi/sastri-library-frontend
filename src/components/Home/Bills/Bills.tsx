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

interface BillRow {
    Id: number;
    DueDate: string; // Use string to hold date in 'YYYY-MM-DD' format
    currentAmountOwing: number;
    billPaidAmout: number; // Optional field
  }
  

const Bills = () => {
    const [bills, setBills] = React.useState<BillRow[]>([]);
    const [refresh, triggerRefresh] = React.useState<boolean>(true);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);
    const router = useRouter();
  
    const [dialogOpen, setDialogOpen] = React.useState(false);
  
    const handleOpen = () => setDialogOpen(true);
    const handleClose = () => setDialogOpen(false);
  
    const handleCreateLoan = (loanData) => {
      console.log('New Loan Created:', loanData);
      // Add logic to save loanData to the backend
    };
  
  
    const handleEdit = (id: number) => {
      console.log(`Edit loan with id: ${id}`);
      // Implement edit logic here
    };
  
    const handleDelete = (id: number) => {
      console.log(`Delete loan with id: ${id}`);
      // Implement delete logic here
    };
  
    const handleRefresh = (val: boolean) => {
      triggerRefresh(val)
    }
  
    React.useEffect(() => {
      if (refresh) {
        const fetchLoans = async () => {
          try {
            const response = await axiosInstance.get<BillRow[]>('/bill/overdue-loans');
            setBills(response.data);
            console.log(response.data)
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
            field: 'dueDate',
            headerName: 'Due Date',
            width: 120,
            type: 'date',
            valueGetter: (params: any) => {
                return params ? new Date(params) : null;
            },
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
                    href="/home/bills-student"
                >
                    Student Bills
                </Link>
            </Breadcrumbs>
            <DataTable bills={bills} columns={columns} />
        </Container>
    );
};


const paginationModel = { page: 0, pageSize: 5 };

export function DataTable({ columns, bills }) {

    function handleClick(event) {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    }

    return (

        <Paper sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={bills}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                sx={{ border: 0 }}
            />
        </Paper>

    );
}

export default Bills;
