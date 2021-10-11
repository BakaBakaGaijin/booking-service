import "./App.css";
import "./features/Rooms/Room/Room.css";
import "./features/Modal/Modal.css";
import {PrivateRoute, ProvideAuth} from "./features/Auth/use-auth";
import Modal from "./features/Modal/Modal";
import SelectRoomMode from "./features/Rooms/SelectRoomMode/SelectRoomMode";
import {useAuth} from "./features/Auth/use-auth";
import {Redirect, Route, Switch} from "react-router-dom";
import Login from "./features/Auth/Login";
import React from "react";
import Rooms from "./features/Rooms/Rooms";
import AcceptRooms from "./features/AcceptRooms/AcceptRooms";
import CurrentRoom from "./features/Rooms/CurrentRoom/CurrentRoom";

const App = () => {

    return (
        <ProvideAuth>
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
            </Switch>
            <PrivateRoute
                path={"/acceptRoom"}
            >
                <AcceptRooms />
            </PrivateRoute>
            <PrivateRoute
                path={`/rooms/:roomId`}>
                <CurrentRoom />
            </PrivateRoute>
            <Redirect to={"/rooms"}/>
            <Modal />
        </ProvideAuth>
    );
};

export default App;
