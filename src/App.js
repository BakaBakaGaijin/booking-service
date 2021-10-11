import React, {useState} from 'react';
import {
    Switch,
    Route,
    Link,
    Redirect,
} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import axios from "axios";

// импортировать ProvideAuth
import './App.css';
import './features/Rooms/Room/Room.css'
import './features/Modal/Modal.css'
import Rooms from "./features/Rooms/Rooms";
import Room from "./features/Rooms/Room/Room";
import Login from "./features/Auth/Login";
/*import { AuthProvider } from "./features/Auth";*/
import AcceptRooms from "./features/AcceptRooms/AcceptRooms";
import {authorize} from "./features/Auth/authSlice";
import {ProvideAuth, useAuth} from "./features/Auth/use-auth";
import CurrentRoom from "./features/Rooms/CurrentRoom/CurrentRoom";
import Modal from "./features/Modal/Modal";
import {PrivateRoute} from "./features/Auth/use-auth";

const App = () => {
    // Модальное окно
    const [show, setShow] = useState(false);

    const handleModalClose = (e) => {
        const currentClass = e.target.className;

        if (currentClass === "modal-card") {
            return;
        }

        setShow(false);
    };

    const handleModalOpen = () => {
        setShow(true);
    };
    //
    const auth = useAuth();
    const something = useSelector((state) => state.auth.isAuthorized);
    console.log("something is", something);

    const dispatch = useDispatch();

    return (
        <ProvideAuth>
            <button
                onClick={() => auth.signin}
            >
                one more way to auth
            </button>
            <button
                onClick={() => dispatch(authorize())}
            >
                authorization
            </button>
            <div>text</div>
            <ul>
                <li>
                    <Link to={"/login"}>Login</Link>
                </li>
                <li>
                    <Link to={"/rooms"}>Комнаты</Link>
                </li>
                <li>
                    <Link
                        to={"/roomDesctiption123"}
                    >
                        Room description
                    </Link>
                </li>
                <li>
                    <Link to={"/date"}>Date</Link>
                </li>
                <li>
                    <Link to={"/acceptRooms"}>Private</Link>
                </li>
            </ul>
            <Switch>
                <Route path={"/login"}>
                    <Login />
                </Route>
                <PrivateRoute
                    exact
                    path={"/rooms"}
                >
                    <Rooms />
                </PrivateRoute>
                <Route
                    path={`/rooms/:roomId`}
                    component={CurrentRoom}
                />
                <Redirect to={"/rooms"}/>
            </Switch>
            <Modal />
        </ProvideAuth>
    );
}

export default App;
