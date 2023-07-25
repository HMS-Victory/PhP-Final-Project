import React from "react";
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import './App.module.css';

import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ItemPage from "./pages/ItemPage";
import ReviewOrder from "./pages/ReviewOrder";
import AccountDetails from "./pages/AccountDetails";

import Root from "./pages/Root";

const router=createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        id: "root",
        children:[
            {index: true, element: <HomePage />},
            {
                path: "/login",
                element: <LoginPage />
            },
            {
                path: "item/:id",
                element: <ItemPage />
            },
            {
                path: "revieworder",
                element: <ReviewOrder />
            },
            // Remember to add a delete functionality in the 
            // edit account details page.
            {
                path: "account",
                element: <AccountDetails />
            },
        ]
    }
]);

function App(){
    return(
        <RouterProvider router={router} />
    );
}

export default App;