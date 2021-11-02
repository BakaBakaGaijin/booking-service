import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
    allRooms: [],
    status: 'idle',
    error: null,
}

export const addNewToAcceptRooms = createAsyncThunk(
    'rooms/addNewToAcceptRooms',
    async initialData => {
        const response = await axios.post('/api/rooms', initialData);
        return response.data;
    }
)

export const fetchRooms = createAsyncThunk('rooms/fetchRooms', async() => {
    const response = await axios.get('/api/rooms');
    return response.data;
})

export const roomSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        addToAccept: (state, action) => {
            state.acceptRooms.push({
                title: action.payload.title,
                person: action.payload.person,
                date: action.payload.date,
                time: action.payload.time,
            });
        },
        doNotAccept: (state, action) => {
            console.log("action.payload: ", action.payload);
            const newState = state.acceptRooms.filter((room) =>
                room.title != action.payload.title &&
                room.person != action.payload.person &&
                room.date != action.payload.date &&
                room.time != action.payload.time
            )

            state.acceptRooms = newState;
        },
        acceptRoom: (state, action) => {
            console.log("accept room action.payload: ", action.payload);
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

            .addCase(addNewToAcceptRooms.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchRooms.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.allRooms = state.allRooms.concat(action.payload);
            })

            .addCase(addNewToAcceptRooms.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.acceptRooms.push(action.payload);
            })
            .addCase(fetchRooms.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            .addCase(addNewToAcceptRooms.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export const {addToAccept, doNotAccept, acceptRoom} = roomSlice.actions;

export const selectRooms = (state) => state.rooms.allRooms;



export default roomSlice.reducer;