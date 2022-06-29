import axios from "axios";
import { toast } from "react-toastify";

export const getVehicleInfo = () => {
    return axios.get('/vehicleinfos')
}

export const createVehicleInfo = (body) => {
    console.log(body)
    return axios.post('/vehicleinfos', body).then((res) => {
        console.log(res)
        toast.success('Create successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }).catch((error) => {
        console.log(error)
        toast.error(error.response.data, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    })
}

export const deleteVehicleInfo = (vehicleId) => {
    return axios.delete(`/vehicleinfos/${vehicleId}`)
}

export const editVehicleInfo = (body) => {
    console.log(body)
    return axios.put(`/vehicleinfos/${body.vehicleId}`, body).then((res) => {
        console.log(res)
        toast.success('Update successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }).catch((error) => {
        console.log(error)
        toast.error(error.response.data, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    })
}