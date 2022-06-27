import { combineReducers } from "redux";
import UsersReducer from "./users";
import CargoTypesReducer from "./cargotypes";
import AuthReducer from "./auth";
import VehicleReducer from "./vehicleinfo";

export default combineReducers({
    users: UsersReducer,
    cargotypes: CargoTypesReducer,
    auth: AuthReducer,
    vehicleinfo: VehicleReducer
})
