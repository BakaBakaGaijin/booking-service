import {useSelector, useDispatch} from 'react-redux';

import './AcceptRooms.css';
import confirm from '../../icons/is.png';
import unConfirm from '../../icons/isnt.png';
import {useEffect} from 'react';
import {Loader} from '../Loader/Loader';
import {fetchAcceptRooms, selectAcceptRooms} from './acceptRoomsSlice';
import {getTimeData} from '../getTimeData/getTimeData';
import {acceptRoomDecision} from './acceptRoomsSlice';

export default function AcceptRooms() {
    let timerId;

    const dispatch = useDispatch();

    const roomStatus = useSelector(state => state.acceptRoom.status);
    const error = useSelector(state => state.acceptRoom.error);


    useEffect(() => {
        if (roomStatus === 'idle') {
            dispatch(fetchAcceptRooms())
        }

        timerId = setInterval(() => dispatch(fetchAcceptRooms()), 1000000)
    }, [roomStatus, dispatch]);

    const rooms = useSelector(selectAcceptRooms);

    return (
        <>
            {
                roomStatus === 'loading' && !timerId
                    ? <Loader/>
                    : roomStatus === 'succeeded'
                        ? <div className={"acceptRoomList"}>
                            {rooms.map(room => (
                                <div
                                    className={'acceptRoomItem'}
                                    key={room.title}
                                >
                                    <div className='acceptRoomInfo'>
                                        <p>Дата: {getTimeData(room).date}</p>
                                        <p>Участник: {room.person}</p>
                                        <p>Номер комнаты: {room.title[0]}.{room.title.slice(1)}</p>
                                        <p>Время: {getTimeData(room).timeRange}</p>
                                    </div>
                                    <div className='acceptRoomConfirm'>
                                        <img
                                            onClick={() => dispatch(acceptRoomDecision({
                                                ...room,
                                                decision: 'accept'
                                            }))}
                                            src={confirm}
                                            alt='Разрешить'
                                            className={'acceptRoomBtn'}/>
                                        <img
                                            onClick={() => dispatch(acceptRoomDecision({
                                                ...room,
                                                decision: 'reject'
                                            }))}
                                            src={unConfirm}
                                            alt='Запретить'
                                            className={'acceptRoomBtn'}
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