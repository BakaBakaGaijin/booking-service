import {useDispatch} from 'react-redux';

import is from '../../../icons/is.png';
import isnt from '../../../icons/isnt.png';
import {getTimeData} from '../../getTimeData/getTimeData';
import {change} from '../../Modal/modalSlice';

export const CurrentRoomContent = ({strTitle, places, room, roomId}) => {
    const dispatch = useDispatch();

    return (
        <>
            <h3 className={'currentRoom-title'}>{strTitle}</h3>
            <p className={'p'}>{places}</p>
            <div className='currentRoomToolsWrapper'>
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
            <p className='description'>{room.description}</p>
            <h4>Зарезервированное время</h4>
            <table>
                {room.time.map(r => <tr className={'reservationTime'}>
                    <td className={'reservationTime-item'}>{getTimeData(r).timeRange}</td>
                    <td className={'reservationTime-item'}>{getTimeData(r).date}</td>
                    <td className={'reservationTime-item'}>{r.person}</td>
                </tr>)}
            </table>
            <button
                className={'currentRoom-btn'}
                onClick={() => dispatch(change({
                    mode: 'time',
                    currentRoom: roomId
                }))}
            >Забронировать</button>
        </>
    );
}