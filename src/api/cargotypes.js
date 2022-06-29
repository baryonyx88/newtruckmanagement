import axios from "axios";
import { toast } from "react-toastify";

export const getCargoType = () => {
    return axios.get('/cargotypes')
}

export const createCargoType = (body) => {
    return axios.post('/cargotypes', body).then((res) => {
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

export const deleteCargoType = (cargoId) => {
    return axios.delete(`/cargotypes/${cargoId}`)
}

export const editCargoType = (body) => {
    // console.log(body)
    return axios.put(`/cargotypes/${body.cargoId}`, body).then((res) => {
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