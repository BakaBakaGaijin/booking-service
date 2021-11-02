import DatePicker from "react-datepicker";
import {addToAccept} from "../Rooms/roomSlice";
import {change} from "./modalSlice";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import "react-datepicker/dist/react-datepicker.css";

export const ModalReservation = () => {
    const roomStatus = useSelector(state => state.rooms.status);
    const error = useSelector(state => state.rooms.error);

    const dispatch = useDispatch();

    const roomId = useSelector(state => state.modal.currentRoom);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState();

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
                onClick={() => {
                    if (startDate && endDate) {
                        dispatch(addToAccept({
                            title: roomId,
                            person: 'I',
                            date: '01.01.2001' ,
                            time: startDate + endDate
                        }))

                        dispatch(change())
                    }
                }
                }
            >
                Забронировать
            </button>
        </form>
    )
}