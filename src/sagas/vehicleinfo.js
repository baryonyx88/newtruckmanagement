import {call, fork, put, takeEvery, takeLatest, take} from 'redux-saga/effects'
import * as actions from '../actions/vehicleinfo'
import * as api from '../api/vehicleinfo'

function* getVehicleInfo(){
    try {
        const result = yield call(api.getVehicleInfo);
        // console.log(result)
        yield put(actions.getVehicleInfoSuccess({
            items: result.data
        }));
    } catch (error) {
        
    }
}

function* deleteVehicleInfo({vehicleId}){
    try {
        yield call(api.deleteVehicleInfo, vehicleId);
        yield call(getVehicleInfo);
    } catch (error) {
        
    }
}

function* createVehicleInfo(action){
    try {
        yield call(api.createVehicleInfo, action.payload);
        yield call(getVehicleInfo)
    } catch (error) {
        
    }
}

function* editVehicleInfo(action){
    try {
        yield call(api.editVehicleInfo, action.payload);
        yield call(getVehicleInfo)
    } catch (error) {
        
    }
}

function* watchCreateVehicleInfoRequest() {
    yield takeLatest(actions.Types.CREATE_VEHICLE_INFO_REQUEST, createVehicleInfo);
}

function* watchGetVehicleInfo(){
    yield takeEvery(actions.Types.GET_VEHICLE_INFO_REQUEST, getVehicleInfo);
}

function* watchEditVehicleInfoRequest() {
    yield takeLatest(actions.Types.EDIT_VEHICLE_INFO_REQUEST, editVehicleInfo);
}

function* watchDeleteVehicleInfoRequest() {
    while (true) {
        const action = yield take(actions.Types.DELETE_VEHICLE_INFO_REQUEST);
        yield call(deleteVehicleInfo, {
            vehicleId: action.payload.vehicleId
        });
    }
}

// function* watchCreateUserRequest() {
//     yield takeLatest(actions.Types.CREATE_USERS_REQUEST, createUser);
// }

const vehicleInfoSaga = [
    fork(watchGetVehicleInfo),
    fork(watchCreateVehicleInfoRequest),
    fork(watchDeleteVehicleInfoRequest),
    fork(watchEditVehicleInfoRequest)
];

export default vehicleInfoSaga;