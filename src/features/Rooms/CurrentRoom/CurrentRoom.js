import { useParams } from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";

import {change} from "../../Modal/modalSlice";
import {getStrToChairs} from "../Room/Room";
import "./CurrentRoom.css";
import is from "../../../icons/is.png"
import isnt from "../../../icons/isnt.png"

export default function CurrentRoom() {
    const dispatch = useDispatch();
    let {roomId} = useParams();
    let room = useSelector((state) => state.rooms.rooms.filter(r => r.title == roomId)[0])
    console.log("room", room);
    /**/
    const title = `Комната ${room.title[0]}.${room.title.slice(1)}`;
    const places = `${room.chairs} ${getStrToChairs(room.chairs)}`;
    return (
        <div className={"currentRoom"}>
            <h3 className={"currentRoom-title"}>{title}</h3>
            <p>{places}</p>
            <div className="currentRoomToolsWrapper">
                <div className="currentRoom-tools currentRoom-projector">
                    {room.isProjector ?
                    <img src={is} alt="есть" className={"currentRoom-img"}/> :
                    <img src={isnt} alt="нет" className={"currentRoom-img"}/>} Прожектор
                </div>
                <div className="currentRoom-tools currentRoom-board">
                    {room.isBoard ?
                    <img src={is} alt="есть" className={"currentRoom-img"}/> :
                    <img src={isnt} alt="нет" className={"currentRoom-img"}/>} Маркерная доска
                </div>
            </div>
            <p className="description">{room.description}</p>
            <h4>Зарезервированное время</h4>
            <table>
                {room.time.map(r => <tr className={"reservationTime"}>
                    <td className={"reservationTime-item"}>{r.date}</td>
                    <td className={"reservationTime-item"}>{r.time}</td>
                    <td className={"reservationTime-item"}>{r.person}</td>
                </tr>)}
            </table>

            <button
                className={"currentRoom-btn"}
                onClick={() => dispatch(change({mode: 'time',
                currentRoom: roomId}))}
            >Зарезервировать</button>
        </div>
    );
}
