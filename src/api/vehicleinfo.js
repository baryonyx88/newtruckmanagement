import axios from "axios";

export const getVehicleInfo = () => {
    return axios.get('/vehicleinfos')
}

export const createVehicleInfo = (body) => {
    console.log(body)
    axios.post('/vehicleinfos', body).then((res) => {
        console.log(res)
    }).catch((error) => {
        console.log(error)
    })
}

export const deleteVehicleInfo = (vehicleId) => {
    return axios.delete(`/vehicleinfos/${vehicleId}`)
}

export const editVehicleInfo = (body) => {
    console.log(body)
    return axios.put(`/vehicleinfos/${body.vehicleId}`, body).then((res) => {
        console.log(res)
    }).catch((error) => {
        console.log(error)
    })
}