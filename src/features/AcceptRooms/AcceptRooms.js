import {useSelector, useDispatch} from "react-redux";
import "./AcceptRooms.css";

import confirm from "../../icons/is.png";
import unConfirm from "../../icons/isnt.png";
import {doNotAccept, acceptRoom} from "../Rooms/roomSlice";

export default function AcceptRooms() {
    const dispatch = useDispatch();
    const rooms = useSelector(state => state.rooms.acceptRooms);
    console.log(rooms);
    return (
        <div className={"acceptRoomList"}>
            {rooms.map(room => (
                <div
                    className={"acceptRoomItem"}
                    key={room.title}
                >
                    <div className="acceptRoomInfo">
                        <p>Дата: {room.date}</p>
                        <p>Участник: {room.person}</p>
                        <p>Номер комнаты: {room.title[0]}.{room.title.slice(1)}</p>
                        <p>Время: {room.time}</p>
                    </div>
                    <div className="acceptRoomConfirm">
                        <img
                            onClick={() => dispatch(acceptRoom({...room}))}
                            src={confirm}
                            alt="Разрешить"
                            className={"acceptRoomBtn"}/>
                        <img
                            onClick={() => dispatch(doNotAccept({...room}))}
                            src={unConfirm}
                            alt="Запретить"
                            className={"acceptRoomBtn"}
                        />
                    </div>
                </div>
            ))}

        </div>
    );
}