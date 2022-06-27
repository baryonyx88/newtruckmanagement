import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as yup from 'yup';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { createCargoTypesRequest } from '../../actions/cargotypes';
import { useDispatch } from 'react-redux';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const CargoTypeCreatingModal = ({ open, handleClose }) => {

    const validationSchema = yup.object({
        cargoName: yup
            .string('Enter your first name')
            .required('Cargo type name is required'),
    });

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            cargoName: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(createCargoTypesRequest({
                cargoName: values.cargoName,
            }))
            handleClose()
        },
    });

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    <Typography component="h1" variant="h5">
                        Create new cargo type
                    </Typography>
                    <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="cargoName"
                                    label="Cargo Type Name"
                                    name="cargoName"
                                    autoComplete="cargoName"
                                    value={formik.values.cargoName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.cargoName && Boolean(formik.errors.cargoName)}
                                    helperText={formik.touched.cargoName && formik.errors.cargoName}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            variant="outlined"
                            onClick={handleClose}
                            sx={{ mt: 3, mb: 2, mr: 2 }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Create
                        </Button>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    )
}

export default CargoTypeCreatingModal