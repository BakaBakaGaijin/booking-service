import {
    useRouteMatch,
    useParams,
    Link,
    Switch,
    Route
} from 'react-router-dom'

import Room from "./Room/Room";
import {useSelector} from "react-redux";
import React from "react";

function Rooms() {
    const rooms = useSelector(state => state.rooms.rooms)
    let match = useRouteMatch();

    return (
        <div>
            <navbar className={"navbar"}>
                <Link to={"/rooms"} className={"navbar-link"}>Занятые комнаты</Link>
                <Link to={"/acceptRoom"} className={"navbar-link"}>Одобрить комнаты</Link>
            </navbar>
            {rooms.map(room =>
                <Room
                    title={room.title}
                    chairs={room.chairs}
                    time={room.time}
                    isProjector={room.isProjector}
                    isBoard={room.isBoard}
                />
            )}
        </div>
    );
}

export default Rooms;