import axios from "axios";
import { toast } from "react-toastify";

export const getUser = () => {
    return axios.get('/users')
}

export const getUserDetail = (userId) => {
    // console.log(userId)
    return axios.get(`/users/${userId}`)
}

export const createUser = (body) => {
    axios.post('/users', body).then((res) => {
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

export const deleteUser = (userId) => {
    return axios.delete(`/users/${userId}`)
}

export const editUser = (body) => {
    console.log(body)
    return axios.put(`/users/${body.userId}`, body).then((res) => {
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