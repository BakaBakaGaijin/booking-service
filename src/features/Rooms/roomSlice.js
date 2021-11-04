import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";

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

export const roomSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        allRoomStatusChanged: (state, action) => {
            state.status = action.payload;
        },
        neededUpdate: (state, action) => {
            const newState = state.acceptRooms.filter((room) =>
                room.title != action.payload.title &&
                room.person != action.payload.person &&
                room.date != action.payload.date &&
                room.time != action.payload.time
            )

            state.acceptRooms = newState;
            state.allRooms.map(room => {
                if (room.title == action.payload.title) {
                    room.time.push({
                        date: action.payload.date,
                        time: action.payload.time,
                        person: action.payload.person
                    })
                }
            })
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchRooms.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(createRoom.pending, (state, action) => {
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
            .addCase(fetchRooms.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createRoom.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export const {allRoomStatusChanged, neededUpdate} = roomSlice.actions;

export const selectRooms = (state) => state.rooms.allRooms;

export default roomSlice.reducer;