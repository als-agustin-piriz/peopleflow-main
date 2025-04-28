import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    name: '',
    email: '',
    isLoggedIn: false,
    modules: [],
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action) {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.modules = action.payload.modules;
            state.isLoggedIn = true;
        },
        logout(state) {
            state.name = '';
            state.isLoggedIn = false;
        },
    },
});

export const {login, logout} = userSlice.actions;
export default userSlice.reducer;
