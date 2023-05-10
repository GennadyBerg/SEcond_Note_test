import React, { useContext } from 'react';
import { AppContext } from './AppContext';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import SearchBox from './SearchBox';

const NavBar = () => {
  const { selectedItemId, deleteItem, setEditMode, setNewItem } = useContext(
    AppContext
  );

  const handleAddClick = () => {
    setNewItem(true);
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
    <nav className="NavBar">
      <h1>My Items</h1>
      {selectedItemId ? (
        <>
          <button className="edit-button" onClick={handleEditClick}>
            <FaEdit />
          </button>
          <button className="delete-button" onClick={handleDeleteClick}>
            <FaTrash />
          </button>
        </>
      ) : (
        <>
          <button className="add-button" onClick={handleAddClick}>
            <FaPlus />
          </button>
          <button className="edit-button" disabled>
            <FaEdit />
          </button>
          <button className="delete-button" disabled>
            <FaTrash />
          </button>
        </>
      )}
    </nav>
  );
};

export default NavBar;
