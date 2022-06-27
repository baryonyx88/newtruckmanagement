import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as yup from 'yup';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetailRequest, editUsersRequest } from '../../actions/users';

const Profile = () => {

    const userData = JSON.parse(localStorage.getItem('userData'))
    const [data, setData] = useState([])
    const dispatch = useDispatch()

    const users = useSelector((state) => state.users)

    const validationSchema = yup.object({
        firstName: yup
            .string('Enter your first name')
            .required('First name is required'),
        lastName: yup
            .string('Enter your last name')
            .required('Last name is required'),
        email: yup
            .string('Enter your email')
            .required('Email is required'),
        password: yup
            .string('Enter your password')
            .min(8, 'Password should be of minimum 8 characters length')
            .required('Password is required'),
    });

    useEffect(() => {
        dispatch(getUserDetailRequest(userData.id))
    }, [])

    useEffect(() => {
        setData(users.items.items)
        // console.log(data)
    }, [users])

    const { firstName, lastName, email, password } = data ? data : {}
    // console.log(data)

    const formik = useFormik({
        initialValues: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(editUsersRequest({
                userId: userData.id,
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password
            }));
            // handleClose();
        },
    });

    // console.log(formik.values)

    return (
        <div style={{ width: '50%' }}>
            <Typography component="h1" variant="h5">
                Edit profile
            </Typography>
            <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="given-name"
                            name="firstName"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            autoFocus
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="family-name"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Save changes
                </Button>
            </Box>
        </div>
    )
}

export default Profile