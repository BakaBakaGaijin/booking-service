import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetchAuth} from './authAPI';

export const loginAsync = createAsyncThunk(
    'auth/fetchAuth',
    async (login, password) => {
        const response = await fetchAuth(login, password);
        return response.data;
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'idle',
        isPerson: true,
        name: '',
        role: 'deputat',
        isAuthorized: false,
        isAdmin: false,
    },
    reducers: {
        authorize: (state) => {
            state.isAuthorized = true;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                if (action.payload === 'такого пользователя нет') {
                    state.isPerson = false;
                } else {
                    const {name, role} = action.payload;
                    state.name = name;
                    state.role = role;
                    state.isPerson = true;
                }

                state.status = 'idle';
            })
    },
});

export const {authorize} = authSlice.actions;

export const selectIsOfficeManager = state => state.auth.role === 'officeManager';

export default authSlice.reducer;