import {Redirect, useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

import {getStrToChairs} from '../Room/Room';
import './CurrentRoom.css';
import {editRoom, selectRooms} from '../roomSlice';
import {useState} from 'react';
import {selectIsOfficeManager} from '../../Auth/authSlice';
import {Loader} from '../../Loader/Loader';
import {EditCurrentRoom} from './EditCurrentRoom';
import {CurrentRoomContent} from './CurrentRoomContent';

export default function CurrentRoom() {
    const [addRequestStatus, setAddRequestStatus] = useState('idle');

    const isOfficeManager = useSelector(selectIsOfficeManager);

    let {roomId} = useParams();
    let room = useSelector(selectRooms).filter(r => r.title == roomId)[0];

    const [isEdit, setIsEdit] = useState(false);
    const [title, setTitle] = useState(room && room.title);
    const [chairs, setChairs] = useState(room && room.chairs);
    const [isProjector, setIsProjector] = useState(room && room.isProjector);
    const [isBoard, setIsBoard] = useState(room && room.isBoard);
    const [description, setDescription] = useState(room && room.description);

    const dispatch = useDispatch();

    if (!room) {
        return <Redirect to={'/rooms'}/>
    }

    const strTitle = `Комната ${room.title[0]}.${room.title.slice(1)}`;
    const places = `${room.chairs} ${getStrToChairs(room.chairs)}`;

    let canSave = addRequestStatus === 'idle';

    const onEditRoom = async () => {
        if (canSave) {
            try {
                setAddRequestStatus('pending');
                await dispatch(editRoom({
                    oldTitle: room.title,
                    title,
                    chairs,
                    isProjector,
                    isBoard,
                    description
                }));
            } finally {
                setAddRequestStatus('idle');
            }
        }
    }

    return (
        <>
            <div className={'currentRoom'}>
                {isOfficeManager && !isEdit
                    ? <button
                        className={'currentRoom-editBtn'}
                        onClick={() => setIsEdit(true)}
                    >
                        Редактировать
                </button>
                    : isEdit
                        ? <button
                            className={'currentRoom-denyBtn'}
                            onClick={() => setIsEdit(false)}
                        >
                            Отменить редактирование
                    </button>
                        : null}
                {
                    isEdit
                        ? <EditCurrentRoom
                            title={title}
                            setTitle={setTitle}
                            chairs={chairs}
                            setChairs={setChairs}
                            isProjector={isProjector}
                            setIsProjector={setIsProjector}
                            isBoard={isBoard}
                            setIsBoard={setIsBoard}
                            description={description}
                            setDescription={setDescription}
                            onEditRoom={onEditRoom}
                        />
                        : <CurrentRoomContent
                            strTitle={strTitle}
                            places={places}
                            room={room}
                            roomId={roomId}
                        />
                }
            </div>
            {addRequestStatus === 'pending' && <Loader/>}
        </>
    );
}
