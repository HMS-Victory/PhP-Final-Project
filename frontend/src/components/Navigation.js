import React, {useCallback, useEffect, useState} from 'react';
import classes from './Navigation.module.css';
import shoppingCartSrc from '../img/shopping-cart.png';
import logoSrc from '../img/logo.jpg';
import { NavLink } from 'react-router-dom';
import { getUserLoggedIn } from '../api/connectDB';

function Navigation(){
    const [userLoggedIn, setUserLoggedIn]=useState(false);

    return(
        <nav className={classes.navBar}>
            <div>
                <NavLink className={classes.nav} to='/'>
                    <img src={logoSrc} className={classes['logo']} alt='Commerce-logo'></img>
                </NavLink>
                <div className={classes.center}>
                    <h1>Commerce Site</h1>
                    <input className={classes['searchBar']} type='text'></input>
                </div>
                {userLoggedIn ? <NavLink to="/account">Your Account</NavLink>: <NavLink to="/login">Login</NavLink>}
                <NavLink className={classes.nav} to='/cart'>
                    <img src={shoppingCartSrc} className={classes['cart']} alt="cart"></img>
                </NavLink>
            </div>
            

        </nav>
    )
}

export default Navigation;