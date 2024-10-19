"use client";

import React from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

import {
    Button,
    Stack,
    IconButton,
    Container,
    Paper,
    Breadcrumbs
} from '@mui/material';
import axiosInstance from '../../../lib/axiosInstance';

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
    active?: boolean;
}

// Loan columns definition for DataGrid


const paginationModel = { page: 0, pageSize: 5 };

// Main Loan Component
const AdminLoan: React.FC = () => {
    const [loans, setLoans] = React.useState<LoanRow[]>([]);
    const [refresh, triggerRefresh] = React.useState<boolean>(true);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);
    const router = useRouter();

    const [dialogOpen, setDialogOpen] = React.useState(false);

    const handleApproveLoan = async (loanId: any) => {
        try {
            await axiosInstance.post(`/loan/${loanId}/approve`); // Call the API
            triggerRefresh(true)
        } catch (error) {
            console.error(error); // Handle error
        }
    };

    const columns: GridColDef[] = [
        { field: 'firstName', headerName: 'User', width: 120 },
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
        }
        ,
        {
            field: 'loanId',
            headerName: 'Actions',
            sortable: false,
            width: 90,
            renderCell: (params: GridRenderCellParams) => {
                const [openDialog, setOpenDialog] = React.useState(false);
                const { loanId, approved, active } = params.row; // Destructure loanId and approved from the row

                const handleLocalApproveLoan = async (loanId: number) => {
                    await handleApproveLoan(loanId);
                    setOpenDialog(false);
                }


                return (
                    <>
                        <Stack direction="row" spacing={1}>
                            {!approved ? (
                                <IconButton
                                    color="primary"
                                    onClick={() => setOpenDialog(true)}
                                >
                                    <CheckCircleOutlineIcon />
                                </IconButton>
                            ) : null}

                            {!active ? <IconButton
                                color="error"
                            //onClick={() => handleDelete(loanId)} // Pass loanId to handleDelete
                            >
                                <DeleteIcon />
                            </IconButton> : null}
                        </Stack>
                        {/* Confirmation Dialog */}
                        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                            <DialogTitle>Confirm Approval</DialogTitle>
                            <DialogContent>
                                Are you sure you want to approve this loan?
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setOpenDialog(false)} color="secondary">
                                    Cancel
                                </Button>
                                <Button onClick={(() => handleLocalApproveLoan(loanId))} color="primary" startIcon={<CheckCircleOutlineIcon />}>
                                    Approve
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </>
                )
            }
        },
    ];

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
                    const response = await axiosInstance.get<LoanRow[]>('/loan/list');
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
                <Link color="inherit" href="/home/pending-loans">
                    Student Book Loans
                </Link>
            </Breadcrumbs>
            <DataTable loans={loans} columns={columns} />

        </Container>
    );
};

interface DataTableProps {
    loans: LoanRow[];
    columns: GridColDef[]
}

export const DataTable: React.FC<DataTableProps> = ({ loans, columns }) => {
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

export default AdminLoan;
