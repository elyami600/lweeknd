import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga';
import userReducer from "./slices/UserSlice"
import ServiceCenterReducer from "./slices/ServiceCenterSlice" 

import rootSaga from './rootSaga'


const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    users: userReducer,
    servicecenter: ServiceCenterReducer

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {users: UsersState}
export type AppDispatch = typeof store.dispatch // ✅ Fixed the typo

export default store; // ✅ Exporting the store
