import {useState} from "react";

import "./Login.css";
import {useAuth} from "./use-auth";
import {useHistory, useLocation} from "react-router-dom";

export default function Login() {
    let history = useHistory();
    let location = useLocation();
    let auth = useAuth();

    let {from} = location.state || { from: { pathname: "/"}};
    let logIn = () => {
        auth.signin(() => {
            history.replace(from);
        })
    }

    let [login, setLogin] = useState("");
    let [password, setPassword] = useState("");

    return (
        <form className={"loginForm"}>
            <label
                htmlFor="login"
                className={"label"}
            >
                Login
            </label>
            <input
                type="text"
                id="login"
                className={"input"}
                placeholder={"Enter your login"}
                onChange={(e) => setLogin(e.target.value)}
            />
            <label
                htmlFor="password"
                className={"label"}
            >
                Password
            </label>
            <input
                type="password"
                id="password"
                className={"input"}
                placeholder={"Enter your password"}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                type={"submit"}
                className={"loginButton"}
                onClick={(e) => {
                    e.preventDefault();
                    logIn();
                }}
            >
                Log in
            </button>
        </form>
    );
}