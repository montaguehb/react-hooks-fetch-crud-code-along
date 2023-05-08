import React, { useState } from "react";

function ItemForm({handleAddItem}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");

  const sendForm = async (itemData) => {
    const data = await fetch("http://localhost:4000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(itemData)
    })
    const resp = await data.json()
    handleAddItem(resp)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const itemData = {
      name: name,
      category: category,
      isInCart: false
    }
    sendForm(itemData)
  }

  return (
    <form className="NewItem" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Category:
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;
