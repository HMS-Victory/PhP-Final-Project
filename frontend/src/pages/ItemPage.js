import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { fetchItem } from "../api/connectDB";
import classes from './ItemPage.module.css';

function ItemPage(){
    const {id}=useParams();
    const [item, setItem]=useState([]);

    function addToCart(){
        
    }

    const getItem=useCallback(async()=>{
        const data=await fetchItem(id);
        const json=data.data.slice(25);
        const item=JSON.parse(json);
        setItem(item);
    }, []);
    useEffect(()=>{
        getItem()
        .catch(console.error);
    }, [fetchItem]);
    return(
        <>
            {item.item &&<div className={classes.body}>
                <div className={classes.itemMain}>
                    <div className={classes.itemDetails}>
                        <img className={classes.image} src={require(`../img/items/${item.item.image}`)}></img>
                        <div className={classes.right}>
                            <h2 className={classes.itemTitle}>{item.item.name}</h2>
                            <p className={classes.description}>{item.item.description}</p>
                            <div className={classes.purchaseSection}>
                                <p className={classes.price}>${item.item.price}</p>
                                <button onclick={addToCart} className={classes.purchase}>add to cart</button>
                            </div>
                        </div>
                        {/* <div className={classes.reviews}>
                            {/* perhaps handle fetching specific reviews in the backend? */}
                            {/* {item.item.reviews} */}
                        {/* </div> */} 
                    </div>
                </div>
                
            </div>}
        </>
    );
}

export default ItemPage;