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
import axiosInstance from '../../../lib/axiosInstance';
import NewLoanDialog from './NewLoanDialog';

// Define the row data type
interface LoanRow {
  loanId?: number;
  loanDate: string; // Use string to hold date in 'YYYY-MM-DD' format
  dueDate: string;
  returnDate?: string; // Optional field
  bookTitle: string;
  author: string;
  isbn?: number;
  approved?: boolean;
  message?: string;
}

// Loan columns definition for DataGrid
const columns: GridColDef[] = [
  { field: 'isbn', headerName: 'ISBN', width: 130 },
  { field: 'title', headerName: 'Book Title', width: 200 },
  { field: 'author', headerName: 'Author', width: 150 },
  {
    field: 'loanDate',
    headerName: 'Loan Date',
    width: 120,
    type: 'date',
    valueGetter: (params: any) => {
      return params ? new Date(params) : null;
    },
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
    field: 'returnDate',
    headerName: 'Return Date',
    width: 120,
    type: 'date',
    valueGetter: (params: any) => {
      return params ? new Date(params) : null;
    },
  },
  {
    field: 'approved',
    headerName: 'Approved',
    width: 90,
    type: 'boolean',
  },
  {
    field: 'message',
    headerName: 'Status',
    width: 120
  }
  // ,
  // {
  //   field: 'actions',
  //   headerName: 'Actions',
  //   sortable: false,
  //   width: 90,
  //   renderCell: (params: GridRenderCellParams) => (
  //     <Stack direction="row" spacing={1}>
  //       <IconButton
  //         color="primary"
  //       //onClick={() => handleEdit(params.row.id)}
  //       >
  //         <EditIcon />
  //       </IconButton>
  //       <IconButton
  //         color="error"
  //       //onClick={() => handleDelete(params.row.id)}
  //       >
  //         <DeleteIcon />
  //       </IconButton>
  //     </Stack>
  //   ),
  // },
];

// Placeholder data for loans
const rows: LoanRow[] = [
  {
    loanId: 1,
    isbn: 1,
    bookTitle: 'A Game of Thrones',
    author: 'George R. R. Martin',
    loanDate: '2024-10-01',
    dueDate: '2024-10-14',
    returnDate: '2024-10-10'
  },
  {
    loanId: 2,
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
  const [loans, setLoans] = React.useState<LoanRow[]>([]);
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
          const response = await axiosInstance.get<LoanRow[]>('/loan');
          setLoans(response.data);
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
      <DataTable loans={loans} />
      <Button
        className="mt-2"
        endIcon={<AddIcon />}
        variant="outlined"
        color="primary"
        onClick={handleOpen}
      >
        New Loan
      </Button>
      <NewLoanDialog
        open={dialogOpen}
        onClose={handleClose}
        onCreate={handleCreateLoan}
        handleRefresh={handleRefresh}
      />
    </Container>
  );
};

interface DataTableProps {
  loans: LoanRow[];
}

export const DataTable: React.FC<DataTableProps> = ({ loans }) => {
  return (
    <Paper sx={{ height: 400, width: '100%', backgroundColor: '#fff0' }}>
      <DataGrid
        rows={loans}
        columns={columns}
        getRowId={(row) => row.loanId}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
      />
    </Paper>
  );
};

export default Loan;
