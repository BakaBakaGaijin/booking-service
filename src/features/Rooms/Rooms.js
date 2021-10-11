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
            <div>Комнаты</div>
            {rooms.map(room =>
                <Room
                    title={room.title}
                    chairs={room.chairs}
                    time={room.time}
                    isProjector={room.isProjector}
                    isBoard={room.isBoard}
                />
            )}
            {/*<Switch>*/}
            {/*    <Route path={`${match.path}/:roomId`}>*/}
            {/*        <Room*/}
            {/*            title={'test'}*/}
            {/*            chairs={'test'}*/}
            {/*            time={'test'}*/}
            {/*            isProjector={'test'}*/}
            {/*            isBoard={'test'}*/}
            {/*        />*/}
            {/*    </Route>*/}
            {/*</Switch>*/}
        </div>
    );
}

export default Rooms;