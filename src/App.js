import "./App.css";
import "./features/Rooms/Room/Room.css";
import "./features/Modal/Modal.css";
import {ProvideAuth} from "./features/Auth/use-auth";
import Modal from "./features/Modal/Modal";
import SelectRoomMode from "./features/Rooms/SelectRoomMode/SelectRoomMode";
import {useAuth} from "./features/Auth/use-auth";
import {Route, Switch} from "react-router-dom";
import Login from "./features/Auth/Login";
import React from "react";

const App = () => {
    const auth = useAuth();
    console.log("auth", auth);
    return (
        <ProvideAuth>
            <Switch>
                <Route path={"/login"}>
                    <Login />
                </Route>
            </Switch>
            <SelectRoomMode/>
            <Modal />
        </ProvideAuth>
    );
};

export default App;
