"use client"

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/lib/axiosInstance';
import Link from 'next/link';
import { Button, TextField, Box, Typography, Container, CssBaseline, Card, CardMedia, CardContent } from '@mui/material';

// Validation schema using yup
const schema = yup.object({
    email: yup.string().email('Invalid email address').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
}).required();

const LoginPage = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        console.log('Login Data:', data);
        try {
            const response = await axiosInstance.post('/Account/login', data);
            console.log(response);
            router.push("/home")
        } catch (error) {
            console.log("error", error);
        }
    };

    return (
        <Container sx={{ display: 'flex', width: "100%", minHeight: "100vh", alignItems: 'center', justifyContent: "space-between" }} component="main">
            <Card sx={{
                maxWidth: 345, margin: 'auto', boxShadow: 3, flexGrow: 1, display: {
                    xs: 'none', // Hide on extra-small screens (mobile)
                    sm: 'none', // Hide on small screens (tablets)
                    md: 'none', // Hide on medium screens (like small laptops)
                    lg: 'block', // Visible on large screens and above
                }
            }}>
                {/* Image inside the Card */}
                <CardMedia
                    component="img"
                    height="140"
                    image="/sastribadge.webp" // Example image URL
                    alt="Random Image"
                />

                {/* Text Content below the Image */}
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Sastri College.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Sastri College is co-educational state secondary school with learners from grade 8 to grade 12. The school is located on the periphery of the central business district of the City of Durban. It is a school rich in tradition and respected for its high academic achievement.
                    </Typography>
                </CardContent>
            </Card>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flexGrow: 2
                }}
            >
                <Typography component="h1" variant="h5">
                    Login to SLMS
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Email Address"
                        {...register('email')}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Password"
                        type="password"
                        {...register('password')}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Login
                    </Button>
                    <Link href="/auth/register">
                        <Typography sx={{textDecoration: "underline"}}>
                            Don't have an account? Sign Up
                        </Typography>
                    </Link>
                </Box>
            </Box>
        </Container>
    );
};

export default LoginPage;
