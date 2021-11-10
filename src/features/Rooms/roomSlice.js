import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    allRooms: [],
    status: 'idle',
    error: null,
}

export const fetchRooms = createAsyncThunk('rooms/fetchRooms', async () => {
    const response = await axios.get('/api/rooms');
    return response.data;
});

export const createRoom = createAsyncThunk(
    'rooms/createRoom',
    async initialData => {
        const response = await axios.post('/api/rooms', initialData);
        return response.data;
    }
)

export const editRoom = createAsyncThunk(
    'rooms/editRoom',
    async initialData => {
        const response = await axios.put('/api/rooms', initialData);
        return response.data;
    }
)

export const roomSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        allRoomStatusChanged: (state, action) => {
            state.status = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchRooms.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(createRoom.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(editRoom.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchRooms.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.allRooms = action.payload;
            })
            .addCase(createRoom.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.allRooms.push(action.payload);
            })
            .addCase(editRoom.fulfilled, (state, action) => {
                const {oldTitle, updatedRoom} = action.payload;
                state.status = 'succeeded';
                state.allRooms = state.allRooms.map(room => {
                    if (room.title === oldTitle) {
                        return updatedRoom;
                    } else {
                        return room
                    }
                })
            })
            .addCase(fetchRooms.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createRoom.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(editRoom.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export const {allRoomStatusChanged} = roomSlice.actions;

export const selectRooms = (state) => state.rooms.allRooms;

export default roomSlice.reducer;