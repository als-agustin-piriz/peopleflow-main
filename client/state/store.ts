import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import envReducer from './slices/envSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        env: envReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
