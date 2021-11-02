import {useDispatch} from "react-redux";
import {change} from "../Modal/modalSlice";

import './AddBtn.css';
import add from '../../icons/add.png';

export const AddBtn = ({onClick}) => {
    const dispatch = useDispatch();

    return (
        <button className={'addBtn'} onClick={() => dispatch(change({mode: 'createRoom'}))}>
            <img src={add} alt="" width={'80px'}/>
        </button>
    );
};