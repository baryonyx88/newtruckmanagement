export const Types = {
    SIGN_UP_REQUEST: 'signup/sign-up-request',
    SIGN_IN_REQUEST: 'signin/sign-in-request',
    SIGN_UP_SUCCESS: 'signup/sign-up-success',
    SIGN_IN_SUCCESS: 'signin/sign-in-success',
    SIGN_OUT_REQUEST: 'signout/sign-out-success'
}


export const signUpRequest = ({firstName, lastName, email, password}) => ({
    type: Types.SIGN_UP_REQUEST,
    payload: {
        firstName,
        lastName,
        email,
        password
    }
})

export const signUpSuccess = (data) => ({
    type: Types.SIGN_UP_SUCCESS,
    payload: {
        data
    }
})

export const signInRequest = ({email, password}) => ({
    type: Types.SIGN_IN_REQUEST,
    payload: {
        email,
        password
    }
})

export const signInSuccess = (data) => ({
    type: Types.SIGN_IN_SUCCESS,
    payload: {
        data
    }
})

export const signOutRequest = () => ({
    type: Types.SIGN_OUT_REQUEST
})