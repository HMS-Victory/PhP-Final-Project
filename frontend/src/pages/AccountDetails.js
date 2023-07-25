import React, {useState, useCallback, useEffect} from "react";
import classes from "./AccountDetails.module.css"
import { getUser } from "../api/connectDB";

function AccountDetails(){
    const [user, setUser]=useState([]);
    const getTheUser=useCallback(async()=>{
        const data=await getUser();
        const json=data.data.slice(25);
        const user=JSON.parse(json);
        setUser(user);
    }, []);
    useEffect(()=>{
        getTheUser()
        .catch(console.error);
    }, [getTheUser]);
    console.log(user);
    return(
        <>
            <div className={classes.container}>
                <h2>Your Account</h2>
                <p></p>
            </div>
        </>
    )
}

export default AccountDetails;