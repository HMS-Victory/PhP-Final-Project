import axios from 'axios';

const url='http://localhost/FinalProject/backend/v1/Api.php?apicall=';

export const login=(submitData)=>axios.post(url+'login', submitData);
// export const register=(name, email, username, password)=>axios.post(url, {
//     name: name,
//     email: email,
//     username: username,
//     password: password
// });

// CRUD
export const addNewItem=(itemData)=>axios.post(url+'newItem', itemData);//backend complete
export const updateItem=(itemData)=>axios.post(url+'updateItem', itemData);//backend complete
export const deleteItem=(itemId)=>axios.get(url+'deleteItem$id='+itemId);//backend complete
export const fetchSuggestions=()=>axios.get(url+'fetchItems');//Working already


// EXTRA
export const fetchItem=(id)=>axios.get(`${url}getItem&id=${id}`);
export const searchItems=(searchterm)=>axios.get(`${url}search&searchterm=${searchterm}`);
export const getUser=()=>axios.get(`${url}getUser`);
export const getUserLoggedIn=()=>axios.get(`${url}getUserLoggedIn`);
// export const AddToCart=(cart)=>axios.get(`${url}AddToCart&cart=${cart}`);
