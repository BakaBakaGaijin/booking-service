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

export const addNewToAcceptRooms = createAsyncThunk(
    'rooms/addNewToAcceptRooms',
    async initialData => {
        const response = await axios.post('/api/accept-rooms', initialData);
        return response.data;
    }
)

export const acceptRoomSlice = createSlice({
    name: 'acceptRoom',
    initialState,
    reducers: {
        statusChanged: (state, action) => {
            state.status = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchAcceptRooms.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(addNewToAcceptRooms.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchAcceptRooms.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (!state.acceptRooms.length) {
                    state.acceptRooms = state.acceptRooms.concat(action.payload);
                } else if (JSON.stringify(state.acceptRooms) !== JSON.stringify(action.payload)) {
                    state.acceptRooms = action.payload;
                }
            })
            .addCase(addNewToAcceptRooms.fulfilled, (state, action) => {
                console.log('addNewToAcceptRooms: ', action.payload);
                state.status = 'succeeded';
                state.acceptRooms.push(action.payload);
            })
            .addCase(fetchAcceptRooms.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addNewToAcceptRooms.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export const {statusChanged} = acceptRoomSlice.actions;

export const selectAcceptRooms = (state) => state.acceptRoom.acceptRooms;

export default acceptRoomSlice.reducer;