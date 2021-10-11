import "./Modal.css";
import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {change} from "./modalSlice";
import {addToAccept} from "../Rooms/roomSlice";
import {useParams} from "react-router-dom";

export default function Modal() {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const dispatch = useDispatch();
    const isShowing = useSelector(state => state.modal.show);
    const mode = useSelector(state => state.modal.mode);
    const roomId = useSelector(state => state.modal.currentRoom);
    console.log(roomId);

    const changeHandler = (e) => {
        console.log(isShowing);
        if (isShowing) {
            const currentClass = e.target.className;
            e.stopPropagation();
            e.preventDefault();

            if (currentClass === 'modal-card') {
                return;
            }
        }

        dispatch(change());
    }
    return (
        <>
            <div hidden={!isShowing}>
                <div
                    className="modal-background"
                    onClick={changeHandler}
                >
                    <div className="modal-card"
                        onClick={(e) => {e.preventDefault()
                        e.stopPropagation()}}
                    >
                        {mode == 'time' && <div>
                            <form className={"loginForm"}>
                                <label
                                    htmlFor="date"
                                    className={"label"}
                                >
                                    Выберите дату
                                </label>
                                <input
                                    type="text"
                                    id="date"
                                    className={"input"}
                                    placeholder={"Enter date"}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                                <label
                                    htmlFor="time"
                                    className={"label"}
                                >
                                    Password
                                </label>
                                <input
                                    type="text"
                                    id="time"
                                    className={"input"}
                                    placeholder={"Enter time"}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                                <button
                                    type={"submit"}
                                    className={"loginButton"}
                                    onClick={() => {
                                        if (date && time) {
                                            dispatch(addToAccept({
                                                title: roomId,
                                                person: 'I',
                                                date,
                                                time
                                            }))
                                        }
                                    }
                                    }
                                >
                                    Забронировать
                                </button>
                            </form>
                        </div>}
                    </div>
                </div>
            </div>
        </>
    );
}