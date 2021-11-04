import {
    Link
} from "react-router-dom";

import './Room.css';
import projector from '../../../icons/projector.png';
import board from '../../../icons/board.png';
import {getTimeData} from "../../getTimeData/getTimeData";

export function getStrToChairs(chairs) {
    let strChairs;

    switch (chairs) {
        case '1':
            strChairs = 'место';
            break;
        case '2':
        case '3':
        case '4':
            strChairs = 'места';
            break;
        default:
            strChairs = 'мест';
            break;
    }

    return strChairs;
}

function Room({title, chairs, time, isProjector, isBoard}) {
    let strChairs = getStrToChairs(chairs);
    const isTime = Boolean(time[0]);

    let timeRange;
    if (isTime) {
        let timeObj = getTimeData(time[0]);
        timeRange = timeObj.timeRange;
    }
    console.log('title: ', title);
    let strTitle = `Комната ${title[0]}.${title.slice(1)}`

    let places = `${chairs} ${strChairs}`;

    return (

        <Link
            to={`rooms/${title}`}
            className={"link"}
        >
            <div
                className={"room"}
                key={title}
            >
                <div className="col1">
                    <h3 className="title">{strTitle}</h3>
                    <p className="chairs">{places}</p>
                    <p className="time">{isTime ? `Time: ${timeRange}` : "Аудитория свободна"}</p>
                </div>
                <div className="col2">
                    <div className="equipment">
                        {isProjector && <img src={projector} alt="projector"/>}
                    </div>
                    <div className="equipment board">
                        {isBoard && <img src={board} alt="board"/>}
                    </div>
                </div>
            </div>
        </Link>

    )
}

export default Room;