import {Redirect, useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

import {change} from '../../Modal/modalSlice';
import {getStrToChairs} from '../Room/Room';
import {getTimeData} from '../../getTimeData/getTimeData';
import './CurrentRoom.css';
import is from '../../../icons/is.png'
import isnt from '../../../icons/isnt.png'
import {editRoom, selectRooms} from '../roomSlice';
import {useState} from 'react';
import {selectIsOfficeManager} from '../../Auth/authSlice';
import {Loader} from '../../Loader/Loader';

export default function CurrentRoom() {
    const [addRequestStatus, setAddRequestStatus] = useState('idle');

    const isOfficeManager = useSelector(selectIsOfficeManager);

    let {roomId} = useParams();
    let room = useSelector(selectRooms).filter(r => r.title == roomId)[0];


    const [isEdit, setIsEdit] = useState(false);
    const [title, setTitle] = useState(room.title);
    const [chairs, setChairs] = useState(room.chairs);
    const [isProjector, setIsProjector] = useState(room.isProjector);
    const [isBoard, setIsBoard] = useState(room.isBoard);
    const [description, setDescription] = useState(room.description);

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
                    ? <button onClick={() => setIsEdit(true)}>Редактировать</button>
                    : isEdit
                        ? <button onClick={() => setIsEdit(false)}>Отменить редактирование</button>
                        : null}
                {
                    isEdit
                        ? <label>Номер комнаты:
                            <input
                                type={'number'}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </label>
                        : <h3 className={'currentRoom-title'}>{strTitle}</h3>
                }
                {
                    isEdit
                        ? <label>Количество мест:
                            <input
                                value={chairs}
                                onChange={(e) => setChairs(e.target.value)}
                                type='number'
                            />
                        </label>
                        : <p className={'p'}>{places}</p>
                }
                {
                    isEdit
                        ? <>
                            <label>Есть проектор?
                                <input
                                    type='checkbox'
                                    value={isProjector}
                                    onClick={() => setIsProjector(!isProjector)}
                                />
                            </label>
                            <label>Есть доска?
                                <input
                                    type='checkbox'
                                    value={isBoard}
                                    onClick={() => setIsBoard(!isBoard)}
                                />
                            </label>
                        </>
                        : <div className='currentRoomToolsWrapper'>
                            <div className='currentRoom-tools currentRoom-projector'>
                                {room.isProjector ?
                                    <img src={is} alt='есть' className={'currentRoom-img'}/> :
                                    <img src={isnt} alt='нет' className={'currentRoom-img'}/>} Прожектор
                            </div>
                            <div className='currentRoom-tools currentRoom-board'>
                                {room.isBoard ?
                                    <img src={is} alt='есть' className={'currentRoom-img'}/> :
                                    <img src={isnt} alt='нет' className={'currentRoom-img'}/>} Маркерная доска
                            </div>
                        </div>
                }
                {
                    isEdit
                        ? <label>
                            Описание комнаты:
                            <input
                                type='text'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </label>
                        : <>
                            <p className='description'>{room.description}</p>
                            <h4>Зарезервированное время</h4>
                            <table>
                                {room.time.map(r => <tr className={'reservationTime'}>
                                    <td className={'reservationTime-item'}>{getTimeData(r).timeRange}</td>
                                    <td className={'reservationTime-item'}>{getTimeData(r).date}</td>
                                    <td className={'reservationTime-item'}>{r.person}</td>
                                </tr>)}
                            </table>
                        </>
                }

                {
                    isEdit
                        ? <button
                            onClick={onEditRoom}
                            type={'submit'}
                            className='currentRoom-btn'
                        >
                            Сохранить изменения
                        </button>
                        : <button
                            className={'currentRoom-btn'}
                            onClick={() => dispatch(change({
                                mode: 'time',
                                currentRoom: roomId
                            }))}
                        >Забронировать</button>
                }
            </div>
            {addRequestStatus === 'pending' && <Loader/>}
        </>
    );
}
