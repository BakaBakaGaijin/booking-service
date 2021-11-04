import DatePicker from "react-datepicker";
import {addNewToAcceptRooms} from "../AcceptRooms/acceptRoomsSlice";
import {change} from "./modalSlice";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import {statusChanged} from "../AcceptRooms/acceptRoomsSlice";
import {Loader} from "../Loader/Loader";

export const ModalReservation = ({addRequestStatus, setAddRequestStatus}) => {
    const name = useSelector(state => state.auth.name);
    const roomStatus = useSelector(state => state.rooms.status);
    const error = useSelector(state => state.rooms.error);

    const dispatch = useDispatch();

    const roomId = useSelector(state => state.modal.currentRoom);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState();

    let canSave = addRequestStatus === 'idle';

    const onReserveRoom = async () => {
        if (canSave) {
            try {
                statusChanged('pending');
                setAddRequestStatus('pending')
                await dispatch(addNewToAcceptRooms({
                    title: roomId,
                    person: name,
                    startDate,
                    endDate
                }));
                setStartDate('');
                setEndDate('');

            } finally {
                statusChanged('succeeded');
                setAddRequestStatus('idle');
                dispatch(change())
            }
        }
    }
    return (
            <form className={"loginForm"}>
                <label
                    htmlFor="date"
                    className={"label"}
                >
                    Начало:
                </label>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    showTimeSelect
                    dateFormat={"Pp"}
                    id="date"
                    className={"input"}
                    placeholder={"Enter start"}
                />
                <label
                    htmlFor="time"
                    className={"label"}
                >
                    Конец:
                </label>
                <DatePicker
                    selected={endDate}
                    onChange={(date) => {
                        console.log(date);
                        setEndDate(date)
                    }}
                    showTimeSelect
                    dateFormat={"Pp"}
                    id="time"
                    className={"input"}
                    placeholder={"Enter end"}
                />
                <button
                    type={"submit"}
                    className={"loginButton"}
                    onClick={onReserveRoom}
                >
                    Забронировать
                </button>
            </form>
    )
}