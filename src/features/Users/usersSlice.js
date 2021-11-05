import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    allUsers: [],
    status: 'idle',
    error: null,
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get('/api/users');
    return response.data;
});

export const editUser = createAsyncThunk(
    'users/editUser',
    async initialData => {
        const response = await axios.post('/api/users', initialData);
        return response.data;
    }
);

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchUsers.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(editUser.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.allUsers = action.payload;
            })
            .addCase(editUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const editedUser = action.payload;
                state.allUsers = state.allUsers.map((user) => {
                    if (user.userId === editedUser.userId) {
                        return editedUser;
                    } else {
                        return user;
                    }
                })
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(editUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export default usersSlice.reducer;