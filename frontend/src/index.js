import React from "react";
import ReactDOM from "react-dom/client";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";


import App from "./App";

// const store=createStore(reducers, compose(applyMiddleware(thunk)));

const root=ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <Provider>
        <App />
    // </Provider>
);