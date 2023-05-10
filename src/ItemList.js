import React, { useContext, useState, useEffect } from 'react';
import Item from './Item';
import ItemForm from './ItemForm';
import SearchBox from './SearchBox';
import { AppContext } from './AppContext';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const ItemList = () => {
  const {
    filteredItems,
    selectedItemId,
    editMode,
    setEditMode,
    deleteItem,
  } = useContext(AppContext);


  const handleAddClick = () => {
    setEditMode(false);
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleDeleteClick = () => {
    if (selectedItemId) {
      deleteItem(selectedItemId);
    }
  };

  return (
    <div className="ItemList">
      <SearchBox />
      {filteredItems.map((item) => (
        <Item key={item.id} item={item} />
      ))}
      {editMode || (
        <button className="add-button" onClick={handleAddClick}>
          <FaPlus /> Add
        </button>
      )}
      {!editMode && selectedItemId && (
        <div className="item-buttons">
          <button className="edit-button" onClick={handleEditClick}>
            <FaEdit /> Edit
          </button>
          <button className="delete-button" onClick={handleDeleteClick}>
            <FaTrash /> Delete
          </button>
        </div>
      )}
      {editMode && <ItemForm />}
    </div>
  );
};

export default ItemList;
