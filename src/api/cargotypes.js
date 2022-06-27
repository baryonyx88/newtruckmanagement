import axios from "axios";

export const getCargoType = () => {
    return axios.get('/cargotypes')
}

export const createCargoType = (body) => {
    axios.post('/cargotypes', body).then((res) => {
        console.log(res)
    }).catch((error) => {
        console.log(error)
    })
}

export const deleteCargoType = (cargoId) => {
    return axios.delete(`/cargotypes/${cargoId}`)
}

export const editCargoType = (body) => {
    // console.log(body)
    return axios.put(`/cargotypes/${body.cargoId}`, body).then((res) => {
        console.log(res)
    }).catch((error) => {
        console.log(error)
    })
}