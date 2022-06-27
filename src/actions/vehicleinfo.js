export const Types = {
    GET_VEHICLE_INFO_REQUEST: 'vehicleinfo/get-vehicleinfo-request',
    GET_VEHICLE_INFO_SUCCESS: 'vehicleinfo/get-vehicleinfo-success',
    CREATE_VEHICLE_INFO_REQUEST: 'vehicleinfo/create-vehicleinfo-request',
    DELETE_VEHICLE_INFO_REQUEST: 'vehicleinfo/delete-vehicleinfo-request',
    EDIT_VEHICLE_INFO_REQUEST: 'vehicleinfo/edit-vehicleinfo-request'
}

export const getVehicleInfoRequest = () => ({
    type: Types.GET_VEHICLE_INFO_REQUEST
})

export const getVehicleInfoSuccess = (items) => ({
    type: Types.GET_VEHICLE_INFO_SUCCESS,
    payload: {
        items
    }
})

export const createVehicleInfoRequest = ({truckplate, cargotype, driver, trucktype, price, dimension, parkingaddress, productionyear, status, description}) => ({
    type: Types.CREATE_VEHICLE_INFO_REQUEST,
    payload: {
        truckPlate: truckplate,
        cargoType: cargotype,
        driver,
        truckType: trucktype,
        price,
        dimension,
        parking: parkingaddress,
        production: productionyear,
        status,
        desc: description
    }
})

export const editVehicleInfoRequest = ({truckplate, cargotype, driver, trucktype, price, dimension, parkingaddress, productionyear, status, description, vehicleId}) => ({
    type: Types.EDIT_VEHICLE_INFO_REQUEST,
    payload: {
        vehicleId,
        truckPlate: truckplate,
        cargoType: cargotype,
        driver,
        truckType: trucktype,
        price,
        dimension,
        parking: parkingaddress,
        production: productionyear,
        status,
        desc: description
    }
})

export const deleteVehicleInfoRequest = (vehicleId) => ({
    type: Types.DELETE_VEHICLE_INFO_REQUEST,
    payload: {
        vehicleId
    }
})