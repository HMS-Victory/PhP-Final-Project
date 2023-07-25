import React, {useState, useCallback, useEffect} from "react";
import { fetchSuggestions } from "../api/connectDB";
import Content from "../components/Content";
// import Navigation from "../components/Navigation";

function HomePage(){
    const [items, setItems]=useState([]);
    
    // Add no dependancy, we do not want it to constantly repeat itself
    const fetchData=useCallback(async()=>{
        const suggestions=await fetchSuggestions();
        const json=suggestions.data.slice(25);
        let data=JSON.parse(json);
        setItems(data);
    }, []);
    useEffect(()=>{
        fetchData()
        .catch(console.error);
        
    }, [fetchData]);
    return(
        <>
            {items.items && <Content suggestions={items}/>}
        </>
    );
}

export default HomePage;