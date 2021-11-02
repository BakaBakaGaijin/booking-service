import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    acceptRooms: [],
    status: 'idle',
    error: null,
}

export const fetchAcceptRooms = createAsyncThunk('acceptRooms/fetchAcceptRooms', async() => {
    const response = await axios.get('/api/accept-rooms');
    return response.data;
});

export const acceptRoomSlice = createSlice({
    name: 'acceptRoom',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchAcceptRooms.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchAcceptRooms.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.acceptRooms = state.acceptRooms.concat(action.payload);
            })
            .addCase(fetchAcceptRooms.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export const {} = acceptRoomSlice.actions;

export const selectAcceptRooms = (state) => state.acceptRoom.acceptRooms;

export default acceptRoomSlice.reducer;