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
            person: "",
            date: "",
            time: "",
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
            //state.acceptRooms.append
        }
    },
    extraReducers: () => {}
})

export const {addToAccept} = roomSlice.actions;

export const selectRooms = (state) => state.rooms.rooms;

export default roomSlice.reducer;