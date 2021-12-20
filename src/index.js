import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import {combineReducers, createStore} from "redux";
import { Provider } from 'react-redux';
import bankReducer from './reducers/bank'
import studentsReducer from './reducers/students'

const resultReducer = combineReducers({
    bank:bankReducer,
    students: studentsReducer,
})
const store = createStore(resultReducer)

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById("root")
);

