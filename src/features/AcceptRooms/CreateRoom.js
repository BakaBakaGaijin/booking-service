import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {addNewToAcceptRooms, statusChanged} from "./acceptRoomsSlice";
import {change} from "../Modal/modalSlice";
import {allRoomStatusChanged, createRoom} from "../Rooms/roomSlice";

export const CreateRoom = ({addRequestStatus, setAddRequestStatus}) => {
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [chairs, setChairs] = useState('');
    const [isProjector, setIsProjector] = useState(false);
    const [isBoard, setIsBoard] = useState(false);
    const [description, setDescription] = useState('');

    let canSave = addRequestStatus === 'idle';

    const onCreateRoom = async () => {
        if (canSave) {
            try {
                allRoomStatusChanged('pending');
                console.log('titleee', title);
                setAddRequestStatus('pending')
                await dispatch(createRoom({
                    title,
                    chairs,
                    isProjector,
                    isBoard,
                    description
                }));
                console.log('title', title);
                setTitle('');
                setChairs('');
                setIsProjector(false);
                setIsBoard(false);
                setDescription('');

            } finally {
                allRoomStatusChanged('succeeded');
                setAddRequestStatus('idle');
                dispatch(change())
            }
        }
    }

    return (
        <form className="loginForm createRoom">
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
                onChange={(e) => {
                    setTitle(e.target.value);
                    console.log('title: ', title)
                }}
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
                onChange={(e) => {
                    setChairs(e.target.value);
                    console.log('chairs: ', chairs)
                }}
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
                onChange={(e) => {
                    setDescription(e.target.value)
                    console.log('description: ', description)
                }}
            />
            <button
                type={"submit"}
                onClick={onCreateRoom}
                className="loginButton"
            >Добавить комнату</button>
        </form>
    )
}