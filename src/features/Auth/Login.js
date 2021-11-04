import {useState} from 'react';

import './Login.css';
import {useAuth} from './use-auth';
import {useHistory, useLocation} from 'react-router-dom';
import {loginAsync} from './authSlice';
import {useDispatch, useSelector} from 'react-redux';

export default function Login() {
    const isPerson = useSelector(state => state.auth.isPerson);
    const dispatch = useDispatch();
    let history = useHistory();
    let location = useLocation();
    let auth = useAuth();

    let {from} = location.state || {from: {pathname: '/'}};
    let logIn = () => {
        auth.signin(() => {
            history.replace(from);
        })
    }

    let [login, setLogin] = useState('');
    let [password, setPassword] = useState('');

    return (
        <div className='loginFormWrapper'>
            <form className={'loginForm'}>
                <label
                    htmlFor='login'
                    className={'label'}
                >
                    Login
                </label>
                <input
                    type='text'
                    id='login'
                    className={'input'}
                    placeholder={'Enter your login'}
                    onChange={(e) => setLogin(e.target.value)}
                />
                <label
                    htmlFor='password'
                    className={'label'}
                >
                    Password
                </label>
                <input
                    type='password'
                    id='password'
                    className={'input'}
                    placeholder={'Enter your password'}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {!isPerson && <p className={'loginWarning'}>Пользователь не зарегистрирован</p>}
                <button
                    type={'submit'}
                    className={'loginButton'}
                    onClick={(e) => {
                        e.preventDefault();
                        if (login && password) {
                            dispatch(loginAsync({login, password}));
                        }
                        logIn();
                    }}
                >
                    Log in
                </button>
            </form>
        </div>
    );
}