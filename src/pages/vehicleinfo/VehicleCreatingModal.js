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
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
            // width: 250,
        },
    },
};

function getStyles(name, cargoName, theme) {
    return {
        fontWeight:
            cargoName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const VehicleCreatingModal = ({ open, handleClose }) => {

    const [cargoData, setCargoData] = useState([])
    const [usersData, setUsersData] = useState([])
    const cargotypes = useSelector((state) => state.cargotypes);
    const users = useSelector((state) => state.users);

    const theme = useTheme();

    const validationSchema = yup.object({
        truckplate: yup
            .string('Enter your truck plate')
            .required('Truck plate is required')
            .matches('^[0-9]{2}[A-Z]{1}-[0-9]{4,5}$', 'Please enter truck plates(example: 00X-00000)'),
        trucktype: yup
            .string('Enter your truck type')
            .required('Truck type is required')
            .matches('^[a-zA-Z]+$', 'You must enter only text'),
        price: yup
            .number()
            .typeError('You must enter number')
            .required('Price is required'),
        dimension: yup
            .string('Enter your dimension')
            .required('Dimension is required'),
        parkingaddress: yup
            .string('Enter your parking address')
            .required('Parking address is required'),
        productionyear: yup
            .string('Enter your production year')
            .required('Production year is required'),
        description: yup
            .string('Enter your dimension'),
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
        enableReinitialize: true,
        onSubmit: (values) => {
            const productionyear = values.productionyear.getFullYear()
            console.log(values)
            dispatch(createVehicleInfoRequest({
                truckplate: values.truckplate,
                cargotype: values.cargotype,
                trucktype: values.trucktype,
                price: values.price,
                driver: values.driver,
                dimension: values.dimension,
                parkingaddress: values.parkingaddress,
                productionyear: productionyear.toString(),
                status: values.status,
                description: values.description
            }))
            handleClose()
        },
    });

    const [cargoName, setCargoName] = useState([]);
    const handleMultipleSelectChange = (event) => {
        const {
            target: { value },
        } = event;

        // console.log(event)

        setCargoName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );

        formik.setFieldValue('cargotype', value)
    };

    const handleDatePickerChange = (event) => {
        formik.setFieldValue('productionyear', event)
    };

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
                        Create vehicle information
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
                                <FormControl sx={{ width: '100%' }}>
                                    <InputLabel id="demo-multiple-name-label">Cargo Types</InputLabel>
                                    <Select
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        multiple
                                        value={cargoName}
                                        onChange={handleMultipleSelectChange}
                                        input={<OutlinedInput label="Cargo Types" />}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value} label={value} />
                                                ))}
                                            </Box>
                                        )}
                                        MenuProps={MenuProps}
                                    >
                                        {options.map((item) => (
                                            <MenuItem
                                                key={item.value}
                                                value={item.value}
                                                style={getStyles(item.value, cargoName, theme)}
                                            >
                                                <Checkbox checked={cargoName.indexOf(item.value) > -1} />
                                                <ListItemText primary={item.label} />
                                            </MenuItem>
                                        ))}
                                        {/* <MenuItem
                                            key={'Haha'}
                                            value={'Haha'}
                                        //   style={getStyles(, personName, theme)}
                                        >
                                            Haha
                                        </MenuItem> */}
                                    </Select>
                                </FormControl>
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
                            <Grid item xs={12}>
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
                                {/* <TextField
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
                                /> */}
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        inputFormat="yyyy"
                                        views={['year']}
                                        label="Production Year"
                                        value={formik.values.productionyear}
                                        onChange={handleDatePickerChange}
                                        renderInput={(params) => <TextField {...params}
                                            error={formik.touched.productionyear && Boolean(formik.errors.productionyear)}
                                            helperText={formik.touched.productionyear && formik.errors.productionyear}
                                        />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12}>
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
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="parkingaddress"
                                    label="Parking Address"
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
                                <TextField
                                    fullWidth
                                    name="description"
                                    label="Description"
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