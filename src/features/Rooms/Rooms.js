import { useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState} from 'react';

import Room from './Room/Room';
import { selectRooms, fetchRooms } from './roomSlice';
import { Loader } from '../Loader/Loader';

function Rooms() {
    const dispatch = useDispatch();

    const roomStatus = useSelector(state => state.rooms.status);
    const error = useSelector(state => state.rooms.error);

    useEffect(() => {
        if (roomStatus === 'idle') {
            dispatch(fetchRooms())
        }
    }, [roomStatus, dispatch]);

    const rooms = useSelector(selectRooms);
    let match = useRouteMatch();

    return (
        <div>
            {
                roomStatus === 'loading'
                ? <Loader />
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