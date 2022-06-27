import { Types } from "../actions/users";

const initialValues = {
    items: []
}

export default function users(state = initialValues, action){
    switch(action.type){
        case Types.GET_USERS_SUCCESS: {
            return {
                items: action.payload.items
            }
        }
        case Types.GET_USER_DETAIL_SUCCESS: {
            return {
                items: action.payload.items
            }
        }
        default: {
            return state
        }
    }
}