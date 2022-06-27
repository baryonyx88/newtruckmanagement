import { Types } from "../actions/cargotypes";

const initialValues = {
    items: []
}

export default function cargotypes(state = initialValues, actions){
    switch(actions.type){
        case Types.GET_CARGO_TYPES_SUCCESS: {
            return {
                items: actions.payload.items
            }
        }
        default: {
            return state;
        }
    }
}