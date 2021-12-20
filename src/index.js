import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import {combineReducers, createStore} from "redux";
import { Provider } from 'react-redux';
import mathExamplesReducer from './reducers/mathExamples'

const resultReducer = combineReducers({
    mathExamples: mathExamplesReducer,
})
const store = createStore(resultReducer)

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById("root")
);

