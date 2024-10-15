"use client";

import React from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import {
  Button,
  Stack,
  IconButton,
  Container,
  Paper,
  Breadcrumbs
} from '@mui/material';

// Define the row data type
interface LoanRow {
  id?: number;
  loanDate: string; // Use string to hold date in 'YYYY-MM-DD' format
  dueDate: string;
  returnDate?: string; // Optional field
  bookTitle: string;
  author: string;
  isbn?: number;
  approved?: boolean;
}

// Loan columns definition for DataGrid
const columns: GridColDef[] = [
  { field: 'isbn', headerName: 'ISBN', width: 70 },
  { field: 'bookTitle', headerName: 'Book Title', width: 150 },
  { field: 'author', headerName: 'Author', width: 130 },
  {
    field: 'loanDate',
    headerName: 'Loan Date',
    width: 120,
    type: 'date',
    valueGetter: (params: any) => new Date(params?.row?.loanDate), // Convert to Date object
  },
  {
    field: 'dueDate',
    headerName: 'Due Date',
    width: 120,
    type: 'date',
    valueGetter: (params: any) => new Date(params?.row?.dueDate), // Convert to Date object
  },
  {
    field: 'returnDate',
    headerName: 'Return Date',
    width: 120,
    type: 'date',
    valueGetter: (params: any) => params?.row?.returnDate ? new Date(params?.row?.returnDate) : null, // Convert to Date object, handle optional field
  },
  {
    field: 'approved',
    headerName: 'Approved',
    width: 90,
    type: 'boolean',
  },
  {
    field: 'actions',
    headerName: 'Actions',
    sortable: false,
    width: 90,
    renderCell: (params: GridRenderCellParams) => (
      <Stack direction="row" spacing={1}>
        <IconButton
          color="primary"
        //onClick={() => handleEdit(params.row.id)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          color="error"
        //onClick={() => handleDelete(params.row.id)}
        >
          <DeleteIcon />
        </IconButton>
      </Stack>
    ),
  },
];

// Placeholder data for loans
const rows: LoanRow[] = [
  {
    id: 1,
    isbn: 1,
    bookTitle: 'A Game of Thrones',
    author: 'George R. R. Martin',
    loanDate: '2024-10-01',
    dueDate: '2024-10-14',
    returnDate: '2024-10-10'
  },
  {
    id: 2,
    isbn: 2,
    bookTitle: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    loanDate: '2024-10-05',
    dueDate: '2024-10-20',
    approved: true
  },
];

const paginationModel = { page: 0, pageSize: 5 };

// Main Loan Component
const Loan: React.FC = () => {
  const router = useRouter();

  const handleEdit = (id: number) => {
    console.log(`Edit loan with id: ${id}`);
    // Implement edit logic here
  };

  const handleDelete = (id: number) => {
    console.log(`Delete loan with id: ${id}`);
    // Implement delete logic here
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        minHeight: '100vh',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
      }}
      component="div"
    >
      <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: '5px' }}>
        <Link color="inherit" href="/home">
          Home
        </Link>
        <Link color="inherit" href="/home/loans">
          Book Loans
        </Link>
      </Breadcrumbs>
      <DataTable />
      <Button
        className="mt-2"
        endIcon={<AddIcon />}
        variant="outlined"
        color="primary"
      >
        New Loan
      </Button>
    </Container>
  );
};

// DataTable Component
export const DataTable: React.FC = () => {
  return (
    <Paper sx={{ height: 400, width: '100%', backgroundColor: '#fff0' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
      />
    </Paper>
  );
};

export default Loan;
