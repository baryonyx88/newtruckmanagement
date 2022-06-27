import React, {useEffect, useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UserCreatingModal from './UserCreatingModal';
import UserEditingModal from './UserEditingModal';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { getUsersRequest, deleteUserRequest } from '../../actions/users';

const UserManagement = () => {

    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [currentRow, setCurrentRow] = useState({});
    const [data, setData] = useState([])

    const handleCreatingModalOpen = () => setOpenCreate(true);
    const handleEditingModalOpen = () => setOpenEdit(true);
    const handleCreatingModalClose = () => setOpenCreate(false);
    const handleEditingModalClose = () => setOpenEdit(false);

    const users = useSelector((state) => state.users);
    const dispatch = useDispatch();

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 150 },
        { field: 'lastName', headerName: 'Last name', width: 150 },
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 200,
            valueGetter: (params) =>
                `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
        {
            field: 'email',
            headerName: 'email',
            width: 200,
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
                    dispatch(deleteUserRequest(params.row.id))
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
        dispatch(getUsersRequest())
    }, [])

    useEffect(() => {
        setData(users.items.items)
        console.log(data)
    }, [users])

    return (
        <div>
            <Button onClick={handleCreatingModalOpen} variant="contained" style={{ marginBottom: '10px' }}>Create New</Button>
            <div style={{ height: 500, width: '100%' }}>
                <DataGrid
                    rows={data ? data : []}
                    columns={columns}
                    pageSize={9}
                    rowsPerPageOptions={[5]}
                />
            </div>
            <UserCreatingModal open={openCreate} handleClose={handleCreatingModalClose} />
            <UserEditingModal open={openEdit} data={currentRow} handleClose={handleEditingModalClose} />
        </div>
    );
}

export default UserManagement
