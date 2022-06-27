import { Types } from "../actions/auth";

const initialValues = {
    data: {},
    signUpSuccess: false,
    signInSuccess: false,
}

export default function auth(state = initialValues, action) {
    switch (action.type) {
        case Types.SIGN_UP_SUCCESS: {
            console.log(action)
            return {data: action.payload.data, signUpSuccess: true}
        }
        case Types.SIGN_IN_SUCCESS: {
            console.log(action.payload.data)
            localStorage.setItem('userData', JSON.stringify(action.payload.data.data.user))
            return {data: action.payload.data, signInSuccess: true}
        }
        case Types.SIGN_OUT_REQUEST: {
            localStorage.removeItem('userData')
            return {signInSuccess: false}
        }
        default: {
            return state
        }
    }
}