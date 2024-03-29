import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    show: false,
    mode: null,
    currentRoom: null,
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        change: (state, action) => {
            if (action.payload) {
                if (action.payload.currentRoom) {
                    state.mode = action.payload.mode;
                    state.currentRoom = action.payload.currentRoom;
                } else {
                    state.mode = action.payload.mode;
                }
            }

            state.show = !state.show;
        }
    },
})

export const {change} = modalSlice.actions;

export default modalSlice.reducer;

