import "./Modal.css";
import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {change} from "./modalSlice";
import {ModalReservation} from "./ModalReservation";

export default function Modal() {

    const [title, setTitle] = useState('');
    const [chairs, setChairs] = useState('');
    const [isProjector, setIsProjector] = useState(false);
    const [isBoard, setIsBoard] = useState(false);
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();
    const isShowing = useSelector(state => state.modal.show);
    const mode = useSelector(state => state.modal.mode);

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
                        {mode == 'time' && <ModalReservation />}
                        {mode === 'createRoom' && <form className="loginForm">
                            <label
                                htmlFor="title"
                                className={'label'}
                            >
                                Номер комнаты:
                            </label>
                            <input
                                value={title}
                                type="text"
                                id="title"
                                className={'input'}
                                placeholder={'Введите номер комнаты'}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <label
                                htmlFor="chairs"
                                className="label"
                            >
                                Количество мест:
                            </label>
                            <input
                                value={chairs}
                                type="text"
                                id="chairs"
                                className={'input'}
                                placeholder={'Введите количество кресел'}
                                onChange={(e) => setChairs(e.target.value)}
                            />
                            <input
                                checked={isProjector ? 'checked' : false}
                                type="checkbox"
                                id="projector"
                                className="input"

                            />
                            <label
                                htmlFor="projector"
                                className="label"
                                onClick={() => {
                                    console.log(isProjector);
                                    setIsProjector(!isProjector)

                                }}
                            >
                                Есть проектор?
                            </label>
                            <input
                                checked={isBoard ? 'checked' : false}
                                type="checkbox"
                                id="board"
                                className="input"

                            />
                            <label
                                htmlFor="board"
                                className="label"
                                onClick={() => {
                                    console.log(isBoard);
                                    setIsBoard(!isBoard)

                                }}
                            >
                                Есть доска?
                            </label>
                            <label
                                htmlFor="description"
                                className="label"
                            >Описание:</label>
                            <textarea
                                value={description}
                                id="description"
                                className={'input textarea'}
                                placeholder={'Добавьте описание комнаты'}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </form>}
                    </div>
                </div>
            </div>
        </>
    );
}