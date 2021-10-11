import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthorized: false,
        isAdmin: false,
    },
    reducers: {
        authorize: (state) => {
            state.isAuthorized = true;
        }
    },
    extraReducers: {},
});

export const { authorize } = authSlice.actions;

export default authSlice.reducer;