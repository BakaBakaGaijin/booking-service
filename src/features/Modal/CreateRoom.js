import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

import {change} from './modalSlice';
import {allRoomStatusChanged, createRoom} from '../Rooms/roomSlice';

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
                setAddRequestStatus('pending')
                await dispatch(createRoom({
                    title,
                    chairs,
                    isProjector,
                    isBoard,
                    description
                }));
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
        <form className='loginForm createRoom'>
            <label
                htmlFor='title'
                className={'label'}
            >
                Номер комнаты:
            </label>
            <input
                value={title}
                type='text'
                id='title'
                className={'input'}
                placeholder={'Введите номер комнаты'}
                onChange={(e) => {
                    setTitle(e.target.value);
                }}
            />
            <label
                htmlFor='chairs'
                className='label'
            >
                Количество мест:
            </label>
            <input
                value={chairs}
                type='text'
                id='chairs'
                className={'input'}
                placeholder={'Введите количество кресел'}
                onChange={(e) => {
                    setChairs(e.target.value);
                }}
            />
            <input
                checked={isProjector ? 'checked' : false}
                type='checkbox'
                id='projector'
                className='input'

            />
            <label
                htmlFor='projector'
                className='label'
                onClick={() => {
                    setIsProjector(!isProjector)

                }}
            >
                Есть проектор?
            </label>
            <input
                checked={isBoard ? 'checked' : false}
                type='checkbox'
                id='board'
                className='input'

            />
            <label
                htmlFor='board'
                className='label'
                onClick={() => {
                    setIsBoard(!isBoard)

                }}
            >
                Есть доска?
            </label>
            <label
                htmlFor='description'
                className='label'
            >Описание:</label>
            <textarea
                value={description}
                id='description'
                className={'input textarea'}
                placeholder={'Добавьте описание комнаты'}
                onChange={(e) => {
                    setDescription(e.target.value)
                }}
            />
            <button
                type={'submit'}
                onClick={onCreateRoom}
                className='loginButton'
            >Добавить комнату
            </button>
        </form>
    )
}