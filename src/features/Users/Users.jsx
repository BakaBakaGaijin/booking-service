import './Users.css';
import {Loader} from '../Loader/Loader';
import {useGetUsersQuery} from '../api/apiSlice';
import {UsersList} from './UsersList';

export const Users = () => {
    const {
        data: allUsers,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch
    } = useGetUsersQuery();
    
    let content;

    if (isLoading) {
        content = <Loader/>
    } else if (isSuccess) {
        content = <UsersList allUsers={allUsers} />
    } else if (isError) {
        content = 'Something went wrong';
    }

    return (
        <div className={'usersPage'}>
            {content}
        </div>
    )
}