"use client"

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
    Button,
    TextField,
    Box,
    Typography,
    Container,
    Card, CardMedia, CardContent,
} from '@mui/material';
import axiosInstance from '@/lib/axiosInstance';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Yup schema for validation
const schema = yup.object({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    studentIdNumber: yup
        .string()
        .required('Identity Number is required')
        .length(13, 'Identity Number must be exactly 13 digits')
        .matches(/^\d+$/, 'Identity Number must be only numbers'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
}).required();

const SignUpPage = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            const response = await axiosInstance.post("/Account/SignUp", data);
            console.log(response);
            router.push(`/home`);
        } catch (error) {
            console.log(error)
            return [];
        }
    };

    return (
        <Container component="main" sx={{ display: 'flex', width: "100%", minHeight: "100vh", alignItems: 'center' }}>
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
                    flexGrow: 2,
                    paddingInline: "15px"
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign Up for SLMS
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    sx={{ mt: 3 }}
                >
                    <TextField
                        margin="normal"
                        fullWidth
                        label="First Name"
                        {...register('firstName')}
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Last Name"
                        {...register('lastName')}
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Identity Number"
                        {...register('studentIdNumber')}
                        error={!!errors.studentIdNumber}
                        helperText={errors.studentIdNumber?.message}
                    />
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
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        {...register('confirmPassword')}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Link href="/auth/login">
                        <Typography sx={{textDecoration: "underline"}}>
                            Aready have an account? Log in
                        </Typography>
                    </Link>
                </Box>
            </Box>
        </Container>
    );
};

export default SignUpPage;
