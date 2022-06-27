import React, { useEffect, useState } from 'react'
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
import { createVehicleInfoRequest } from '../../actions/vehicleinfo';
import { getUsersRequest } from '../../actions/users';
import { getCargoTypesRequest } from '../../actions/cargotypes';
import { useDispatch, useSelector } from 'react-redux';
import MenuItem from "@mui/material/MenuItem";
import Select from "react-select";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import InputLabel from '@mui/material/InputLabel';

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

const VehicleCreatingModal = ({ open, handleClose }) => {

    const [cargoData, setCargoData] = useState([])
    const [usersData, setUsersData] = useState([])
    const cargotypes = useSelector((state) => state.cargotypes);

    const users = useSelector((state) => state.users);

    const validationSchema = yup.object({
        truckplate: yup
            .string('Enter your truck plate')
            .required('Truck plate is required')
            .matches('^[0-9]{2}[A-Z]{1}-[0-9]{5}$', 'Please enter truck plates'),
        cargotype: yup.array()
            .max(10, "Pick at least 3 tags")
            .of(
                yup.object().shape({
                    label: yup.string().required(),
                    value: yup.string().required()
                })
            ),
        trucktype: yup
            .string('Enter your truck type')
            .required('Truck type is required'),
        price: yup
            .number('Enter your price')
            .required('Price is required'),
        dimension: yup
            .string('Enter your dimension')
            .required('Dimension is required'),
        parkingaddress: yup
            .string('Enter your parking address')
            .required('Parking address is required'),
        productionyear: yup
            .string('Enter your production year')
            .required('Production year is required')
            .matches('^[0-9]{4}$', 'Please enter year'),
        description: yup
            .string('Enter your description')
    });

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCargoTypesRequest())
        dispatch(getUsersRequest())
    }, [])

    useEffect(() => {
        setUsersData(users.items.items)
    }, [users])

    useEffect(() => {
        setCargoData(cargotypes.items.items)
    }, [cargotypes])


    const options = cargoData ? cargoData.map((item) => {
        return { value: item.cargoName, label: item.cargoName }
    }) : []

    const formik = useFormik({
        initialValues: {
            truckplate: '',
            cargotype: [],
            trucktype: '',
            price: '',
            driver: '',
            dimension: '',
            parkingaddress: '',
            productionyear: '',
            status: '',
            description: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values)
            dispatch(createVehicleInfoRequest({
                truckplate: values.truckplate,
                cargotype: values.cargotype.map(item => item.value),
                trucktype: values.trucktype,
                price: values.price,
                driver: values.driver,
                dimension: values.dimension,
                parkingaddress: values.parkingaddress,
                productionyear: values.productionyear,
                status: values.status,
                description: values.description
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
                        Create new vehicle information
                    </Typography>
                    <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    // autoComplete="given-name"
                                    name="truckplate"
                                    required
                                    fullWidth
                                    id="truckplate"
                                    label="Truck Plate"
                                    value={formik.values.truckplate}
                                    onChange={formik.handleChange}
                                    autoFocus
                                    error={formik.touched.truckplate && Boolean(formik.errors.truckplate)}
                                    helperText={formik.touched.truckplate && formik.errors.truckplate}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Select
                                    id="color"
                                    options={options}
                                    isMulti
                                    onChange={option => formik.setFieldValue('cargotype', option)}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.cargotype}
                                />
                                {!!formik.errors.cargotype && formik.touched.cargotype && (
                                    <div style={{ color: "red", marginTop: ".5rem" }}>
                                        {formik.errors.cargotype}
                                    </div>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="trucktype"
                                    label="Truck Type"
                                    name="trucktype"
                                    autoComplete="family-name"
                                    value={formik.values.trucktype}
                                    onChange={formik.handleChange}
                                    error={formik.touched.trucktype && Boolean(formik.errors.trucktype)}
                                    helperText={formik.touched.trucktype && formik.errors.trucktype}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="price"
                                    label="Price"
                                    name="price"
                                    autoComplete="price"
                                    value={formik.values.price}
                                    onChange={formik.handleChange}
                                    error={formik.touched.price && Boolean(formik.errors.price)}
                                    helperText={formik.touched.price && formik.errors.price}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    select
                                    name="driver"
                                    id="driver"
                                    label="Driver"
                                    value={formik.values.driver}
                                    onChange={formik.handleChange}
                                    autoFocus
                                    error={formik.touched.driver && Boolean(formik.errors.driver)}
                                    helperText={formik.touched.driver && formik.errors.driver}
                                >
                                    {usersData ? usersData.map((item) => {
                                        return (
                                            <MenuItem key={item.id} value={`${item.firstName} ${item.lastName}`}>
                                                {item.firstName} {item.lastName}
                                            </MenuItem>
                                        )
                                    }) :
                                        <MenuItem key={""} value={""}>
                                            Empty
                                        </MenuItem>
                                    }

                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    name="dimension"
                                    label="Dimension"
                                    type="dimension"
                                    id="dimension"
                                    // autoComplete="new-dimension"
                                    value={formik.values.dimension}
                                    onChange={formik.handleChange}
                                    error={formik.touched.dimension && Boolean(formik.errors.dimension)}
                                    helperText={formik.touched.dimension && formik.errors.dimension}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    select
                                    name="status"
                                    id="status"
                                    label="Status"
                                    value={formik.values.status}
                                    onChange={formik.handleChange}
                                    autoFocus
                                    error={formik.touched.status && Boolean(formik.errors.status)}
                                    helperText={formik.touched.status && formik.errors.status}
                                >
                                    <MenuItem key={"1"} value={"In-used"}>
                                        In-used
                                    </MenuItem>
                                    <MenuItem key={"2"} value={"New"}>
                                        New
                                    </MenuItem>
                                    <MenuItem key={"3"} value={"Suspended"}>
                                        Suspended
                                    </MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    name="productionyear"
                                    label="Production Year"
                                    type="productionyear"
                                    id="productionyear"
                                    // autoComplete="new-productionyear"
                                    value={formik.values.productionyear}
                                    onChange={formik.handleChange}
                                    error={formik.touched.productionyear && Boolean(formik.errors.productionyear)}
                                    helperText={formik.touched.productionyear && formik.errors.productionyear}
                                />
                            </Grid>
                            
                            <Grid item xs={12}>
                                <InputLabel>Parking Address</InputLabel>
                                <TextareaAutosize
                                    style={{ width: '100%', height: '60px' }}
                                    required
                                    fullWidth
                                    name="parkingaddress"
                                    type="parkingaddress"
                                    id="parkingaddress"
                                    // autoComplete="new-parkingaddress"
                                    value={formik.values.parkingaddress}
                                    onChange={formik.handleChange}
                                    error={formik.touched.parkingaddress && Boolean(formik.errors.parkingaddress)}
                                    helperText={formik.touched.parkingaddress && formik.errors.parkingaddress}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel>Description</InputLabel>
                                <TextareaAutosize
                                    style={{ width: '100%', height: '100px' }}
                                    name="description"
                                    type="description"
                                    id="description"
                                    // autoComplete="new-description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    error={formik.touched.description && Boolean(formik.errors.description)}
                                    helperText={formik.touched.description && formik.errors.description}
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

export default VehicleCreatingModal