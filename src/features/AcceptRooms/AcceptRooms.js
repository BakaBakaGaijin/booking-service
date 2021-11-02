import {useSelector, useDispatch} from "react-redux";
import "./AcceptRooms.css";

import confirm from "../../icons/is.png";
import unConfirm from "../../icons/isnt.png";
import {doNotAccept, acceptRoom} from "../Rooms/roomSlice";
import {useEffect} from "react";
import {Loader} from "../Loader/Loader";
import {fetchAcceptRooms, selectAcceptRooms} from './acceptRoomsSlice';

export default function AcceptRooms() {
    const dispatch = useDispatch();

    const roomStatus = useSelector(state => state.acceptRoom.status);
    const error = useSelector(state => state.acceptRoom.error);

    useEffect(() => {
        if (roomStatus === 'idle') {
            dispatch(fetchAcceptRooms())
        }
    }, [roomStatus, dispatch]);

    const rooms = useSelector(selectAcceptRooms);

    return (
        <>
            {
                roomStatus === 'loading'
                    ? <Loader />
                    : roomStatus === 'succeeded'
                        ? <div className={"acceptRoomList"}>
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
                        : 'Something went Wrong'
            }
        </>
    );
}