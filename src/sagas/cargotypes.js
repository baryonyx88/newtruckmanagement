import { call, fork, put, takeEvery, takeLatest, take } from 'redux-saga/effects'
import * as actions from '../actions/cargotypes';
import * as api from '../api/cargotypes'

function* getCargoType() {
    try {
        const result = yield call(api.getCargoType);
        // console.log(result)
        yield put(actions.getCargoTypesSuccess({
            items: result.data
        }))
    } catch (error) {

    }
}

function* createCargoType(action) {
    try {
        yield call(api.createCargoType, action.payload);
        yield call(getCargoType);
    } catch (error) {

    }
}

function* deleteCargoType({ cargoId }) {
    try {
        console.log(cargoId)
        yield call(api.deleteCargoType, cargoId);
        yield call(getCargoType);
    } catch (error) {

    }
}

function* editCargoType(action) {
    try {
        yield call(api.editCargoType, action.payload);
        yield call(getCargoType)
    } catch (error) {

    }
}

function* watchGetCargoTypeRequest() {
    yield takeEvery(actions.Types.GET_CARGO_TYPES_REQUEST, getCargoType);
}

function* watchCreateCargoTypeRequest() {
    yield takeLatest(actions.Types.CREATE_CARGO_TYPES_REQUEST, createCargoType);
}

function* watchDeleteCargoTypeRequest() {
    while (true) {
        const action = yield take(actions.Types.DELETE_CARGO_TYPES_REQUEST);
        yield call(deleteCargoType, {
            cargoId: action.payload.cargoId
        });
    }
}

function* watchEditCargoTypeRequest() {
    yield takeLatest(actions.Types.EDIT_CARGO_TYPES_REQUEST, editCargoType);
}

const cargoTypeSaga = [
    fork(watchGetCargoTypeRequest),
    fork(watchCreateCargoTypeRequest),
    fork(watchDeleteCargoTypeRequest),
    fork(watchEditCargoTypeRequest)
]

export default cargoTypeSaga
