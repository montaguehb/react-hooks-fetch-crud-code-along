import React from "react";

function Item({ item, handleUpdateItem, handleDeleteItem }) {

  const handleAddToCartClick = async () => {
    const updateCart = await fetch(`http://localhost:4000/items/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        isInCart: !item.isInCart
      })
    })
    const resp = await updateCart.json()
    handleUpdateItem(resp)
  }

  const handleDeleteClick = async () => {
    const deleteItem = await fetch(`http://localhost:4000/items/${item.id}`, {
      method: "DELETE",
    })
    const resp = await deleteItem.json()
    resp.Status !== 404?handleDeleteItem(item):console.log("Item does not exist")
    
  }
  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button className={item.isInCart ? "remove" : "add"} onClick={handleAddToCartClick}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDeleteClick}>Delete</button>
    </li>
  );
}

export default Item;
