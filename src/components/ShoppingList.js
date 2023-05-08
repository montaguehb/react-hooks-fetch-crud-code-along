import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);


  useEffect(() => {
    const getItems = async () => {
      const data = await fetch("http://localhost:4000/items")
      const resp = await data.json()
      setItems(resp)
    }
    getItems()
  }, [])

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const handleUpdateItem = updatedItem => setItems(currentItems => currentItems.map(item => item.id === updatedItem.id?updatedItem:item))
  const handleAddItem = newItem => setItems([...items, newItem])
  const handleDeleteItem = deletedItem => setItems(currentItems => currentItems.filter(item => deletedItem.id !== item.id?item:false))

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  
  return (
    <div className="ShoppingList">
      <ItemForm handleAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} handleUpdateItem={handleUpdateItem} handleDeleteItem={handleDeleteItem}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
