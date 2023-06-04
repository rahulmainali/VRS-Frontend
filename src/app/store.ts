import {configureStore} from '@reduxjs/toolkit';
import counterReducer from '../features/counter/CounterSlice'
import loginReducer from '../features/login/loginSlice'
import kycReducer from '../features/kyc/kycSlice'
import kycFormReducer from '../features/kyc/kycFormSlice'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        kyc: kycReducer,
        kycForm: kycFormReducer,
        login: loginReducer
    },
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
