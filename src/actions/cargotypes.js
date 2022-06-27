export const Types = {
    GET_CARGO_TYPES_REQUEST: 'cargotypes/get-cargotypes-request',
    GET_CARGO_TYPES_SUCCESS: 'cargotypes/get-cargotypes-success',
    CREATE_CARGO_TYPES_REQUEST: 'cargotypes/create-cargotypes-request',
    DELETE_CARGO_TYPES_REQUEST: 'cargotypes/delete-cargotypes-request',
    EDIT_CARGO_TYPES_REQUEST: 'cargotypes/edit-cargotypes-request',
}

export const getCargoTypesRequest = () => ({
    type: Types.GET_CARGO_TYPES_REQUEST
})

export const getCargoTypesSuccess = (items) => ({
    type: Types.GET_CARGO_TYPES_SUCCESS,
    payload: {
        items
    }
})

export const createCargoTypesRequest = ({cargoName}) => ({
    type: Types.CREATE_CARGO_TYPES_REQUEST,
    payload: {
        cargoName
    }
})

export const deleteCargoTypesRequest = (cargoId) => ({
    type: Types.DELETE_CARGO_TYPES_REQUEST,
    payload: {
        cargoId
    }
})

export const editCargoTypesRequest = ({cargoId, cargoName}) => ({
    type: Types.EDIT_CARGO_TYPES_REQUEST,
    payload: {
        cargoId,
        cargoName
    }
})