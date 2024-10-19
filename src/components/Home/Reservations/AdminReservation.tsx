"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '../../../lib/axiosInstance';
import Link from 'next/link';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Button, IconButton, Stack, Typography, Container, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Breadcrumbs } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

// Define the row data type
interface ReservationRow {
    id?: number;
    firstName: string; // Use string to hold date in 'YYYY-MM-DD' format
    dueDate: string;
    lastName?: string; // Optional field
    bookTitle: string;
    author: string;
    isbn?: number;
    approved?: boolean;
    message?: string;
}


const ReservationsAdmin = () => {
    const [reservations, setReservations] = React.useState<ReservationRow[]>([]);
    const [refresh, triggerRefresh] = React.useState<boolean>(true);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);
    const router = useRouter();

    const [dialogOpen, setDialogOpen] = React.useState(false);

    const handleOpen = () => setDialogOpen(true);
    const handleClose = () => setDialogOpen(false);



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
            const fetchReservation = async () => {
                try {
                    const response = await axiosInstance.get<ReservationRow[]>('/reservation/list');
                    setReservations(response.data);
                } catch (err: any) {
                    setError(err.message || 'Failed to fetch loans');
                } finally {
                    setLoading(false); // Stop loading spinner
                }
            };

            fetchReservation();
        }

        handleRefresh(false)
    }, [refresh]);

    const handleApproveReservation = async (id: any) => {
        try {
            await axiosInstance.post(`/reservation/${id}/approve`); // Call the API
            triggerRefresh(true)
        } catch (error) {
            console.error(error); // Handle error
        }
    };

    const columns: GridColDef[] = [
        { field: 'firstName', headerName: 'User', width: 130 },
        { field: 'title', headerName: 'Book Title', width: 200 },
        { field: 'author', headerName: 'Author', width: 150 },
        {
            field: 'reservationDate',
            headerName: 'Reservation Date',
            width: 140,
            type: 'date',
            valueGetter: (params: any) => {
                return params ? new Date(params) : null;
            },
        },
        {
            field: 'expireDate',
            headerName: 'Expiry Date',
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
        ,
        {
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            width: 90,
            renderCell: (params: GridRenderCellParams) => {
                const [openDialog, setOpenDialog] = React.useState(false);
                const { id, approved, active } = params.row; 

                const handleLocalApproveReservation = async (id: number) => {
                    await handleApproveReservation(id);
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
                                Are you sure you want to approve this Reservation?
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setOpenDialog(false)} color="secondary">
                                    Cancel
                                </Button>
                                <Button onClick={(() => handleLocalApproveReservation(id))} color="primary" startIcon={<CheckCircleOutlineIcon />}>
                                    Approve
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </>
                )
            }
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
                    href="/home/reservations"
                >
                    Student Reservations
                </Link>
            </Breadcrumbs>
            <DataTable columns={columns} reservations={reservations} />
        </Container>
    );
}

const paginationModel = { page: 0, pageSize: 5 };

interface DataTableProps {
    reservations: ReservationRow[];
    columns: GridColDef[];
}

export const DataTable: React.FC<DataTableProps> = ({ reservations, columns }) => {

    function handleClick(event) {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    }

    return (

        <Paper sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={reservations}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                sx={{ border: 0 }}
            />
        </Paper>

    );
}

export default ReservationsAdmin;
