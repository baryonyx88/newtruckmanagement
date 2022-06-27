import {call, fork, put, takeEvery, takeLatest, take} from 'redux-saga/effects'
import * as actions from '../actions/users'
import * as api from '../api/users'

function* getUsers(){
    try {
        const result = yield call(api.getUser);
        // console.log(result)
        yield put(actions.getUsersSuccess({
            items: result.data
        }));
    } catch (error) {
        
    }
}

function* getUserDetail(action){
    try {
        const result = yield call(api.getUserDetail, action.payload.userId);
        // console.log(userId)
        yield put(actions.getUserDetailSuccess({
            items: result.data
        }));
    } catch (error) {
        
    }
}

function* createUser(action){
    try {
        yield call(api.createUser, action.payload);
        yield call(getUsers)
    } catch (error) {
        
    }
}

function* deleteUser({userId}){
    try {
        yield call(api.deleteUser, userId);
        yield call(getUsers);
    } catch (error) {
        
    }
}

function* editUser(action){
    try {
        yield call(api.editUser, action.payload);
        yield call(getUsers);
        // yield call(getUserDetail);
    } catch (error) {
        
    }
}

function* watchGetUserRequest(){
    yield takeEvery(actions.Types.GET_USERS_REQUEST, getUsers);
}

function* watchGetUserDetailRequest(){
    yield takeEvery(actions.Types.GET_USER_DETAIL_REQUEST, getUserDetail);
}

function* watchCreateUserRequest() {
    yield takeLatest(actions.Types.CREATE_USERS_REQUEST, createUser);
}

function* watchEditUserRequest() {
    yield takeLatest(actions.Types.EDIT_USERS_REQUEST, editUser);
}

function* watchDeleteUserRequest() {
    while (true) {
        const action = yield take(actions.Types.DELETE_USERS_REQUEST);
        yield call(deleteUser, {
            userId: action.payload.userId
        });
    }
}

const usersSaga = [
    fork(watchGetUserRequest),
    fork(watchGetUserDetailRequest),
    fork(watchCreateUserRequest),
    fork(watchDeleteUserRequest),
    fork(watchEditUserRequest)
];

export default usersSaga;