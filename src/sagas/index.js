import { all } from "redux-saga/effects";
import UsersSaga from "./users";
import CargoTypeSaga from "./cargotypes";
import AuthSaga from "./auth";
import VehicleInfoSaga from "./vehicleinfo";

export default function* rootSaga(){
    yield all([
        ...UsersSaga,
        ...CargoTypeSaga,
        ...AuthSaga,
        ...VehicleInfoSaga
    ])
}