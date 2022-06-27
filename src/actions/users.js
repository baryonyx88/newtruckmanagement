export const Types = {
    GET_USERS_REQUEST: 'users/get-users-request',
    GET_USERS_SUCCESS: 'users/get-users-success',
    GET_USER_DETAIL_REQUEST: 'users/get-users-detail-request',
    GET_USER_DETAIL_SUCCESS: 'users/get-users-detail-success',
    CREATE_USERS_REQUEST: 'users/create-users-request',
    DELETE_USERS_REQUEST: 'users/delete-users-request',
    EDIT_USERS_REQUEST: 'users/edit-users-request'
}

export const getUsersRequest = () => ({
    type: Types.GET_USERS_REQUEST
})

export const getUserDetailRequest = (userId) => ({
    type: Types.GET_USER_DETAIL_REQUEST,
    payload: {
        userId
    }
})

export const getUsersSuccess = (items) => ({
    type: Types.GET_USERS_SUCCESS,
    payload: {
        items
    }
})

export const getUserDetailSuccess = (items) => ({
    type: Types.GET_USER_DETAIL_SUCCESS,
    payload: {
        items
    }
})

export const deleteUserRequest = (userId) => ({
    type: Types.DELETE_USERS_REQUEST,
    payload: {
        userId
    }
})

export const createUsersRequest = ({firstName, lastName, email, password}) => ({
    type: Types.CREATE_USERS_REQUEST,
    payload: {
        firstName,
        lastName,
        email,
        password
    }
})

export const editUsersRequest = ({userId, firstName, lastName, email, password}) => ({
    type: Types.EDIT_USERS_REQUEST,
    payload: {
        userId,
        firstName,
        lastName,
        email,
        password
    }
})