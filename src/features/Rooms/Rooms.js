import {
    useRouteMatch,
    useParams,
    Link,
    Switch,
    Route
} from 'react-router-dom'

import Room from "./Room/Room";
import {useSelector} from "react-redux";

function Rooms() {
    const rooms = useSelector(state => state.rooms.rooms)
    let match = useRouteMatch();

    return (
        <div>
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