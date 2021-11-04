import {useDispatch} from "react-redux";
import {neededUpdate} from "../Rooms/roomSlice";

export const needUpadateAllRooms = () => {
    const dispatch = useDispatch(neededUpdate())
}