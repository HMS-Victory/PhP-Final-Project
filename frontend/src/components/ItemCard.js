import React, { useState } from "react";
import classes from "./ItemCard.module.css";
import { NavLink } from "react-router-dom";
import { updateItem, deleteItem } from "../api/connectDB";

function ItemCard(props) {
  const [EditItem, setEditItem] = useState(false);

  const [EditItemOnChange, setEditItemOnChange] = useState({
    id: props.id,
    name: "",
    price: 0,
    description: "",
    image: "",
  });
  function addToCart() {
    props.addToCartHandler(props.id);
  }
  // submission handlers
  async function updateHandler(e) {
    e.preventDefault();
    const submitdata = JSON.stringify(EditItemOnChange);
    await updateItem(submitdata);
  }
  async function deleteHandler() {
    await deleteItem(props.id);
  }

  function formOnChangeHandler(event) {
    switch (event.target.name) {
      case "name":
        setEditItemOnChange({
          ...EditItemOnChange,
          name: event.target.value,
        });
        break;
      case "price":
        setEditItemOnChange({
          ...EditItemOnChange,
          price: event.target.value,
        });
        break;
      case "description":
        setEditItemOnChange({
          ...EditItemOnChange,
          description: event.target.value,
        });
        break;
      case "image":
        setEditItemOnChange({
          ...EditItemOnChange,
          image: event.target.value,
        });
        break;
    }
  }
  function toggleTextFields() {
    if (EditItem) {
      setEditItem(false);
    } else if (!EditItem) {
      setEditItem(true);
    }
  }

  // Remember to finish the form inputs
  // then just remember to collect the values and pass them into the
  // api functions. Then test and that is it.
  //that is the last thing we need to do in order to be able to turn this in to Austin

  return (
    // onclick move to specific item's page
    <>
      {EditItem && <div className={classes.backgroundShader}></div>}
      <div className={classes.card}>
        <NavLink className={classes.title} to={`item/${props.id}`}>
          {props.name}
        </NavLink>
        <img
          src={require(`../img/items/${props.image}`)}
          alt="item "
          className={classes.productImage}
        ></img>
        <p className={classes.price}>{"$" + props.price}</p>
        <p className={classes.description}>{props.description}</p>
        <div className={classes.buttonContainer}>
          <button className={classes.addToCart} onClick={addToCart}>
            Add to cart
          </button>
          <button className={classes.update} onClick={toggleTextFields}>
            Update
          </button>
          <button className={classes.delete} onClick={deleteHandler}>
            Delete
          </button>
        </div>
      </div>
      {EditItem && (
        <div className={classes.editItem}>
          <form>
            <label htmlFor="name">Item Name</label>
            <input
              name="name"
              type="text"
              onChange={formOnChangeHandler}
              value={EditItemOnChange.name}
            ></input>
            <label htmlFor="price">Item Price</label>
            <input
              name="price"
              type="text"
              onChange={formOnChangeHandler}
              value={EditItemOnChange.price}
            ></input>
            <label htmlFor="description">description</label>
            <input
              name="description"
              type="text"
              onChange={formOnChangeHandler}
              value={EditItemOnChange.description}
            ></input>
            <label htmlFor="image">Image name</label>
            <input
              name="image"
              onChange={formOnChangeHandler}
              type="text"
              value={EditItemOnChange.image}
            ></input>
            <button className={classes.submitChanges} onClick={updateHandler}>
              Submit Changes
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default ItemCard;
