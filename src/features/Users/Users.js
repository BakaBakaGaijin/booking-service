import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {fetchUsers, editUser} from './usersSlice';
import './Users.css';
import {Loader} from '../Loader/Loader';
import {useInterval} from '../useInterval/useInterval';

export const Users = () => {
    const [addRequestStatus, setAddRequestStatus] = useState('idle');
    let timerId;
    const dispatch = useDispatch();

    const usersStatus = useSelector(state => state.users.status);
    const error = useSelector(state => state.users.error);

    useEffect(() => {
        if (usersStatus === 'idle') {
            dispatch(fetchUsers());
        }
    }, [usersStatus, dispatch])

    useInterval(() => {
        dispatch(fetchUsers())
    }, 1000 * 10)

    const users = useSelector(state => state.users.allUsers);

    if (usersStatus === 'penging') return <Loader/>

    return (
        <div className={'usersPage'}>
            {
                usersStatus === 'loading'
                    ? <Loader/>
                    : <>
                        <div className='usersCol usersCol1'>
                            <h3>id</h3>
                            {users.map(user => <div key={user.userId} className={'usersRow'}>
                                {user.userId}
                            </div>)}
                        </div>
                        <div className='usersCol usersCol2'>
                            <h3>ф.и.</h3>
                            {users.map(user => <div key={user.userId} className={'usersRow'}>
                                {user.name}
                            </div>)}
                        </div>
                        <div className='usersCol usersCol3'>
                            <h3>роль</h3>
                            {users.map(user => <div key={user.userId} className={'usersRow'}>
                                {user.role}
                            </div>)}
                        </div>
                        <div className='usersCol usersCol4'>
                            <h3>повысить роль</h3>
                            {users.map(user => {
                                return user.role === 'employee'
                                    ? <div
                                        key={user.userId}
                                        onClick={() => dispatch(editUser({userId: user.userId}))}
                                        className={'usersRow usersRow-btn'}
                                    >
                                        повысить
                                    </div>
                                    : <div key={user.userId} className={'usersRow'}>
                                        нельзя
                                    </div>
                            })}
                        </div>
                    </>
            }
        </div>
    )
}