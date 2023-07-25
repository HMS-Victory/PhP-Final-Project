import React from "react";

import Navigation from "../components/Navigation";
import HomePage from "./HomePage";
import { Outlet } from "react-router-dom";

function Root(){
    return(
        <>
            <Navigation />
            <Outlet />
        </>
    )
}
export default Root;