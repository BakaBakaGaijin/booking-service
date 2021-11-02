import React, {
    useState,
    useEffect,
    useContext,
    createContext
} from "react";
import {
    useSelector,
    useDispatch
} from "react-redux";

import {authorize} from "./authSlice";
import {Redirect, Route} from "react-router-dom";

//-
const authContext = createContext();

export function ProvideAuth({children}) {
    const auth = useProvideAuth();
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(authContext);
}
//+

function useProvideAuth() {
    const [user, setUser] = useState(null);

    const dispatch = useDispatch();
    //const user = useSelector((state) => state.auth.name);

    const signin = cb => {
        return fakeAuth.signin(() => {
            setUser("user");
            cb();
        });
    };

    const signout = cb => {
        return fakeAuth.signout(() => {
            setUser(null);
            cb();
        });
    }
    ;
    return {
        user,
        signin,
        signout
    }
}
//

const fakeAuth = {
    isAuthenticated: false,
    signin(cb) {
        fakeAuth.isAuthenticated = true;
        setTimeout(cb, 100);
    },
    signout(cb) {
        fakeAuth.isAuthenticated = false;
        setTimeout(cb, 100);
    }
}

export function PrivateRoute({children, ...rest}) {
    let auth = useAuth();
    return (
        <Route
            {...rest}
            render={({location}) =>
            auth.user ? (
                children
            ) : (
                <Redirect to={{
                    pathname: "/login",
                    state: {from: location}
                }}
                />
            )}
        />
    );
}