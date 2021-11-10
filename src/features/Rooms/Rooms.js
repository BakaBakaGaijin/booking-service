import {useSelector, useDispatch} from 'react-redux';
import React, {useEffect} from 'react';

import Room from './Room/Room';
import {selectRooms, fetchRooms} from './roomSlice';
import {Loader} from '../Loader/Loader';
import {useInterval} from '../useInterval/useInterval';

function Rooms() {
    let timerId;

    const dispatch = useDispatch();

    const roomStatus = useSelector(state => state.rooms.status);
    const error = useSelector(state => state.rooms.error);

    useEffect(() => {
        if (roomStatus === 'idle') {
            dispatch(fetchRooms())
        }

    }, [roomStatus, dispatch]);

    useInterval(() => {
        dispatch(fetchRooms())
    }, 1000 * 10)

    const rooms = useSelector(selectRooms);

    return (
        <div>
            {
                roomStatus === 'loading'
                    ? <Loader/>
                    : roomStatus === 'succeeded'
                        ? rooms.map(room =>
                            <Room
                                key={room.title}
                                title={room.title}
                                chairs={room.chairs}
                                time={room.time}
                                isProjector={room.isProjector}
                                isBoard={room.isBoard}
                            />)
                        : 'Something went wrong'
            }
        </div>
    );
}

export default Rooms;