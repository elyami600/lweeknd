import { all, call, put } from 'redux-saga/effects';
import { getInitialData } from '../utils/api';
import { receiveUsers } from './slices/UserSlice';
import { receiveServiceCenters } from './slices/ServiceCenterSlice';
import { receiveStylists } from './slices/StylistSlice';
import { receiveBookings } from './slices/BookingSlice';
import {setAuthedUser } from './slices/authedUserSlice'
 const user =  "John Doe"

function* loadInitialData() {
    const { users, serviceCenters , stylists, bookings} = yield call(getInitialData);

    yield put(receiveUsers(users));
    yield put(receiveServiceCenters(serviceCenters))
    yield put(receiveStylists(stylists))
    yield put(receiveBookings(bookings))
   // yield put(setAuthedUser(user))


}


export default function* rootSaga() {
    yield all([call(loadInitialData)]);
  }