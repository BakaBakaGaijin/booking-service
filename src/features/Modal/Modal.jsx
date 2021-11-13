import './Modal.css';
import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {change} from './modalSlice';
import {ModalReservation} from './ModalReservation';
import {Loader} from '../Loader/Loader';
import {CreateRoom} from './CreateRoom';

export default function Modal() {
    const [addRequestStatus, setAddRequestStatus] = useState('idle');

    const dispatch = useDispatch();
    const isShowing = useSelector(state => state.modal.show);
    const mode = useSelector(state => state.modal.mode);

    const changeHandler = (e) => {
        if (isShowing) {
            const currentClass = e.target.className;
            e.stopPropagation();
            e.preventDefault();

            if (currentClass === 'modal-card') {
                return;
            }
        }

        dispatch(change());
    }
    return (
        <>
            <div hidden={!isShowing}>
                <div
                    className='modal-background'
                    onClick={changeHandler}
                >
                    <div className='modal-card'
                         onClick={(e) => {
                             e.preventDefault()
                             e.stopPropagation()
                         }}
                    >
                        {mode == 'time' && <ModalReservation
                            addRequestStatus={addRequestStatus}
                            setAddRequestStatus={setAddRequestStatus}
                        />}
                        {mode === 'createRoom' && <CreateRoom
                            addRequestStatus={addRequestStatus}
                            setAddRequestStatus={setAddRequestStatus}
                        />}
                    </div>
                </div>
            </div>
            {addRequestStatus === 'pending' && <Loader/>}
        </>
    );
}