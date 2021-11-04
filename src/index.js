import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from 'react-redux';
import {worker} from './mocks/browser';

import './index.css';
import {store} from './app/store';
import App from './App';

if (process.env.NODE_ENV === 'development') {
    const {worker} = require('./mocks/browser');
    worker.start();
}

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('root')
);