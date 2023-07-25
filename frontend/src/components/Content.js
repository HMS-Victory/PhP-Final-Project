import React, { useState } from "react";
import classes from "./Content.module.css";
import ItemCard from "./ItemCard";
import { addNewItem } from "../api/connectDB";

function Content(props) {
  const [cart, addToCart] = useState([]);
  const [EditItem, setEditItem] = useState(false);
  const [newItemData, setNewItemData] = useState({
    name: "",
    price: 0,
    description: "",
    image: "",
  });
  function updateForms(event) {
    switch (event.target.name) {
      case "name":
        setNewItemData({
          ...newItemData,
          name: event.target.value,
        });
        break;
      case "price":
        setNewItemData({
          ...newItemData,
          price: event.target.value,
        });
        break;
      case "description":
        setNewItemData({
          ...newItemData,
          description: event.target.value,
        });
        break;
      case "image":
        setNewItemData({
          ...newItemData,
          image: event.target.value,
        });
        break;
    }
  }
  async function submitNewItem() {
    const submitdata = JSON.stringify(newItemData);
    await addNewItem(submitdata);
  }

  function toggleFormDisplay() {
    if (EditItem) {
      setEditItem(false);
    } else if (!EditItem) {
      setEditItem(true);
    }
  }
  function addToCartHandler(id) {
    addToCart([...cart, id]);
  }
  return (
    <>
    {EditItem && <div className={classes.backgroundShader}></div>}
      <section className={classes.mainContent}>
        {props.suggestions.items.map((item) => {
          return (
            <ItemCard
              key={item.id}
              name={item.name}
              price={item.price}
              reviews={item.reviews}
              description={item.description}
              image={item.image}
              id={item.id}
              addToCartHandler={addToCartHandler}
            />
          );
        })}
        {EditItem && (
          <div className={classes.editItem}>
            <form>
              <label htmlFor="name">Item Name</label>
              <input
                name="name"
                type="text"
                onChange={updateForms}
                value={newItemData.name}
              ></input>
              <label htmlFor="price">Item Price</label>
              <input
                name="price"
                type="text"
                onChange={updateForms}
                value={newItemData.price}
              ></input>
              <label htmlFor="description">description</label>
              <input
                name="description"
                type="text"
                onChange={updateForms}
                value={newItemData.description}
              ></input>
              <label htmlFor="image">Image name</label>
              <input
                name="image"
                onChange={updateForms}
                type="text"
                value={newItemData.image}
              ></input>
              <button className={classes.submitChanges} onClick={submitNewItem}>
                Submit Changes
              </button>
            </form>
          </div>
        )}
      </section>
      <button className={classes.newItem} onClick={toggleFormDisplay}>
        New Item
      </button>
    </>
  );
}

export default Content;
