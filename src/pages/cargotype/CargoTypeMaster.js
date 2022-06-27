import React, {useState, useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { getCargoTypesRequest, deleteCargoTypesRequest } from '../../actions/cargotypes';
import CargoTypeCreatingModal from './CargoTypeCreatingModal';
import CargoEditingModal from './CargoEditingModal';

const CargoTypeMaster = () => {
    const [openCreate, setOpenCreate] = useState(false);
    const [data, setData] = useState([])
    const [currentRow, setCurrentRow] = useState({});
    const [openEdit, setOpenEdit] = useState(false);
    
    const handleCreatingModalOpen = () => setOpenCreate(true);
    const handleCreatingModalClose = () => setOpenCreate(false);
    const handleEditingModalOpen = () => setOpenEdit(true);
    const handleEditingModalClose = () => setOpenEdit(false);
    
    const cargotypes = useSelector((state) => state.cargotypes)
    const dispatch = useDispatch()

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'cargoName', headerName: 'Cargo name', width: 150 },
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
                    dispatch(deleteCargoTypesRequest(params.row.id))
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
        dispatch(getCargoTypesRequest())
    }, [])

    useEffect(() => {
        console.log(cargotypes)
        setData(cargotypes.items.items)
    }, [cargotypes])

    return (
        <div>
            <Button onClick={handleCreatingModalOpen} variant="contained" style={{marginBottom: '10px'}}>Create New</Button>
            <div style={{ height: 400, width: '50%' }}>
                <DataGrid
                    rows={data ? data : []}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>
            <CargoTypeCreatingModal open={openCreate} handleClose={handleCreatingModalClose}/>
            <CargoEditingModal open={openEdit} handleClose={handleEditingModalClose} data={currentRow}/>
        </div>
    );
}

export default CargoTypeMaster
