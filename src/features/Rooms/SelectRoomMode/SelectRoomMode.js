import {Link, Redirect, Route, Switch} from "react-router-dom";
import Login from "../../Auth/Login";
import {PrivateRoute} from "../../Auth/use-auth";
import Rooms from "../Rooms";
import AcceptRooms from "../../AcceptRooms/AcceptRooms";
import CurrentRoom from "../CurrentRoom/CurrentRoom";
import "./SelectRoomMode.css";
import React from "react";

export default function SelectRoomMode() {

    return (
        <>
            <navbar className={"navbar"}>
                <Link to={"/rooms"} className={"navbar-link"}>Занятые комнаты</Link>
                <Link to={"rooms/acceptRoom"} className={"navbar-link"}>Одобрить комнаты</Link>
            </navbar>
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
            </Switch>
        </>
    );
}