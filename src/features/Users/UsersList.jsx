import {useEditUserMutation} from '../api/apiSlice';

export const UsersList = ({allUsers}) => {
    const [editUser, {isLoading}] = useEditUserMutation();

    const canSave = !isLoading;

    const onEditUserClicked = async (userId) => {
        if (canSave) {
            try {
                await editUser({userId});
            } catch (err) {}
        }
    }

    return (
        <>
            <div className='usersCol usersCol1'>
                <h3>id</h3>
                {allUsers.map(user => <div key={user.userId} className={'usersRow'}>
                    {user.userId}
                </div>)}
            </div>
            <div className='usersCol usersCol2'>
                <h3>ф.и.</h3>
                {allUsers.map(user => <div key={user.userId} className={'usersRow'}>
                    {user.name}
                </div>)}
            </div>
            <div className='usersCol usersCol3'>
                <h3>роль</h3>
                {allUsers.map(user => <div key={user.userId} className={'usersRow'}>
                    {user.role}
                </div>)}
            </div>
            <div className='usersCol usersCol4'>
                <h3>повысить роль</h3>
                {allUsers.map(user => {
                    return user.role === 'employee'
                        ? <div
                            key={user.userId}
                            onClick={() => onEditUserClicked(user.userId)}
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
    );
}
