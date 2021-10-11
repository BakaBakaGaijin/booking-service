import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    rooms: [
        {
            title: "4442",
            chairs: "45",
            time: [
                {
                    date: "01.01.2001",
                    time: "11:00-12:00",
                    person: "Иванов Иван"
                }
            ],
            isProjector: true,
            isBoard: true,
            description: "Описание1",
        },
        {
            title: "4219",
            chairs: "0",
            time: [
                {
                    date: "01.01.2001",
                    time: "10:00-12:00",
                    person: "Петров Пётр"
                },
                {
                    date: "01.02.2002",
                    time: "14:00-15:00",
                    person: "Углов Николай"
                }
            ],
            isProjector: true,
            isBoard: false,
            description: "Описание2",
        },
        {
            title: "1211",
            chairs: "1",
            time: [],
            isProjector: false,
            isBoard: true,
            description: "Описание3",
        },
    ],
    acceptRooms: [
        {
            title: "1211",
            person: "Vova",
            date: "26.11.2001",
            time: "10:00-16:00",
        },
    ],
}

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
            const newState = state.acceptRooms.filter((room) =>
                room.title != action.payload.title &&
                room.person != action.payload.person &&
                room.date != action.payload.date &&
                room.time != action.payload.time
            )

            state.acceptRooms = newState;
            state.rooms.map(room => {
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
    extraReducers: () => {}
})

export const {addToAccept, doNotAccept, acceptRoom} = roomSlice.actions;

export const selectRooms = (state) => state.rooms.rooms;

export default roomSlice.reducer;