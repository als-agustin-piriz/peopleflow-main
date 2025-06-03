import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type EnvState = Record<string, string>;

const initialState: EnvState = {};

export const envSlice = createSlice({
    name: 'env',
    initialState,
    reducers: {
        setEnv: (state, action: PayloadAction<EnvState>) => {
            return action.payload;
        },
    },
});

export const {setEnv} = envSlice.actions;
export default envSlice.reducer;
