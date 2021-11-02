import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/Auth/authSlice';
import roomReducer from '../features/Rooms/roomSlice';
import acceptRoomReducer from '../features/AcceptRooms/acceptRoomsSlice';
import modalReducer from '../features/Modal/modalSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer,
    rooms: roomReducer,
    acceptRoom: acceptRoomReducer,
    modal: modalReducer,
  },
});
