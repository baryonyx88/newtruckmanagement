import axios from "axios";

export const getUser = () => {
    return axios.get('/users')
}

export const getUserDetail = (userId) => {
    console.log(userId)
    return axios.get(`/users/${userId}`)
}

export const createUser = (body) => {
    axios.post('/users', body).then((res) => {
        console.log(res)
    }).catch((error) => {
        console.log(error)
    })
}

export const deleteUser = (userId) => {
    return axios.delete(`/users/${userId}`)
}

export const editUser = (body) => {
    console.log(body)
    return axios.put(`/users/${body.userId}`, body).then((res) => {
        console.log(res)
    }).catch((error) => {
        console.log(error)
    })
}