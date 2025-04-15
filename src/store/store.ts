// store/store.ts

import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

// Reducers
import userReducer from './slices/UserSlice';
import serviceCenterReducer from './slices/ServiceCenterSlice';
import stylistReducer from './slices/StylistSlice';
import bookingReducer from './slices/BookingSlice';

// Root saga
import rootSaga from './rootSaga';

// Initialize the Saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create the store
const store = configureStore({
  reducer: {
    users: userReducer,
    servicecenter: serviceCenterReducer,
    stylists: stylistReducer,
    bookings: bookingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

// Run the root saga
sagaMiddleware.run(rootSaga);

// Types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
