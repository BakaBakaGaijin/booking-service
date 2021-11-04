import {Redirect, Route, Switch} from 'react-router-dom';
import {useSelector} from 'react-redux';

import './App.css';
import './features/Rooms/Room/Room.css';
import './features/Modal/Modal.css';
import {PrivateRoute, ProvideAuth} from './features/Auth/use-auth';
import Modal from './features/Modal/Modal';
import Login from './features/Auth/Login';
import Rooms from './features/Rooms/Rooms';
import AcceptRooms from './features/AcceptRooms/AcceptRooms';
import CurrentRoom from './features/Rooms/CurrentRoom/CurrentRoom';
import {Nav} from './features/Nav/Nav';
import {AddBtn} from './features/AddBtn/AddBtn';
import {selectIsOfficeManager} from './features/Auth/authSlice';

const App = () => {
    const isOfficeManager = useSelector(selectIsOfficeManager);

    return (
        <ProvideAuth>
            <Switch>
                <Route path={'/login'}>
                    <Login/>
                </Route>
                <PrivateRoute
                    exact
                    path={'/rooms'}
                >
                    <Nav/>
                    <Rooms/>
                    {isOfficeManager && <AddBtn/>}
                </PrivateRoute>
            </Switch>
            <PrivateRoute
                path={'/acceptRoom'}
            >
                <Nav/>
                <AcceptRooms/>
            </PrivateRoute>
            <PrivateRoute
                path={`/rooms/:roomId`}>
                <Nav/>
                <CurrentRoom/>
            </PrivateRoute>
            <Redirect to={'/rooms'}/>
            <Modal/>
        </ProvideAuth>
    );
};

export default App;
