import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getVehicleInfoRequest, deleteVehicleInfoRequest } from '../../actions/vehicleinfo';
import VehicleCreatingModal from './VehicleCreatingModal'
import VehicleEditingModal from './VehicleEditingModal';

const VehicleInfo = () => {
    const [openCreate, setOpenCreate] = React.useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [currentRow, setCurrentRow] = useState({});
    const handleCreatingModalOpen = () => setOpenCreate(true);
    const handleCreatingModalClose = () => setOpenCreate(false);
    const handleEditingModalOpen = () => setOpenEdit(true);
    const handleEditingModalClose = () => setOpenEdit(false);

    const vehicleinfo = useSelector((state) => state.vehicleinfo);
    const dispatch = useDispatch();

    const [data, setData] = useState([])

    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'truckPlate', headerName: 'Truck Plate', width: 100 },
        {
            field: 'cargoType',
            headerName: 'Cargo Type',
            width: 200,
            renderCell: (params) => {
                return params.value.map((item, index) => {
                    return (
                        <div key={index} style={{display: 'flex'}}>
                            {item}&nbsp;
                        </div>
                    )
                })
            }
        },
        {
            field: 'driver',
            headerName: 'Driver',
            width: 150,
    
        },
        {
            field: 'truckType',
            headerName: 'Truck Type',
            width: 100,
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 120,
        },
        {
            field: 'dimension',
            headerName: 'Dimension(L-W-H)',
            width: 150,
        },
        {
            field: 'parking',
            headerName: 'Parking Address',
            width: 180,
        },
        {
            field: 'production',
            headerName: 'Production Year',
            width: 120,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 100,
        },
        {
            field: 'desc',
            headerName: 'Description',
            width: 100,
        },
        {
            field: "action",
            headerName: 'Action',
            sortable: false,
            width: 110,
            renderCell: (params) => {
                const onClick = (e) => {
                    e.stopPropagation();
                    console.log(params)
                    setCurrentRow(params.row)
                    handleEditingModalOpen()
                }

                const onClickDelete = (e) => {
                    e.stopPropagation();
                    dispatch(deleteVehicleInfoRequest(params.row.id))
                }
                // return <IconButton onClick={showEditModal(params)}><EditIcon/></IconButton>;
                return <div style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton onClick={onClick} style={{ marginRight: '10px' }}><EditIcon /></IconButton>
                    <IconButton onClick={onClickDelete}><DeleteIcon /></IconButton>
                </div>
            }
        },
    ];

    useEffect(() => {
        dispatch(getVehicleInfoRequest())
    }, [])

    useEffect(() => {
        setData(vehicleinfo.items.items)
    }, [vehicleinfo])

    // console.log(vehicleinfo)

    return (
        <div>
            <Button onClick={handleCreatingModalOpen} variant="contained" style={{ marginBottom: '10px' }}>Create New</Button>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={data ? data : []}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    getRowHeight={() => 'auto'}
                />
            </div>
            <VehicleCreatingModal open={openCreate} handleClose={handleCreatingModalClose}/>
            <VehicleEditingModal open={openEdit} handleClose={handleEditingModalClose} data={currentRow}/>
        </div>
    );
}

export default VehicleInfo
