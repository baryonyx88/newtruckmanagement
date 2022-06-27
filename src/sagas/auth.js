import { call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects'
import * as actions from '../actions/auth'
import * as api from '../api/auth'

function* signUp(action) {
    try {
        const result = yield call(api.signUp, action.payload);
        yield put(actions.signUpSuccess({
            data: result
        }));
    } catch (error) {

    }
}

function* signIn(action) {
    try {
        const result = yield call(api.signIn, action.payload);
        yield put(actions.signInSuccess({
            data: result
        }));
        console.log(result)
    } catch (error) {

    }
}

function* watchSignInRequest() {
    yield takeLatest(actions.Types.SIGN_IN_REQUEST, signIn);
}

function* watchSignUpRequest() {
    yield takeLatest(actions.Types.SIGN_UP_REQUEST, signUp);
}

const authSaga = [
    fork(watchSignUpRequest),
    fork(watchSignInRequest),
];

export default authSaga;