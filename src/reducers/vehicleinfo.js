import { Types } from "../actions/vehicleinfo"

const initialValues = {
    items: []
}

export default function vehicleinfo(state = initialValues, action){
    switch(action.type){
        case Types.GET_VEHICLE_INFO_SUCCESS: {
            console.log(action.payload)
            return {
                items: action.payload.items
            }
        }
        default: {
            return state
        }
    }
}