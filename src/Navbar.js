import React, { useContext } from 'react';
import { AppContext } from './AppContext';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import SearchBox from './SearchBox';

const NavBar = () => {
    const {
        addItem, updateItem, deleteItem,
        selectedItemId, setSelectedItemId, getSelectedItem,
        editMode, setEditMode } =
        useContext(
            AppContext
        );

    const handleAddClick = async () => {
        let item = await addItem(null);
        setEditMode(true);
        setSelectedItemId(item.id);
    };

    const handleEditClick = () => {
        if (selectedItemId) {
            setEditMode(true);
        }
    };

    const handleDeleteClick = () => {
        if (selectedItemId) {
            let selectedItem = getSelectedItem();
            const confirmed = window.confirm(`Are you sure you want to delete ${selectedItem.title}?`);
            if (confirmed) {
                deleteItem(selectedItem);
                setSelectedItemId();
                setEditMode(false);
            }
        }
    };

    return (
        <>
            <nav className="NavBar">
                <div className='nav-wrapper'>
                    <button disabled={editMode} className="add-button" onClick={handleAddClick}>
                        <FaPlus />
                    </button>
                    <button disabled={editMode || !selectedItemId} className="edit-button" onClick={handleEditClick}>
                        <FaEdit />
                    </button>
                    <button disabled={editMode || !selectedItemId} className="delete-button" onClick={handleDeleteClick}>
                        <FaTrash />
                    </button>
                </div>
                <SearchBox />
            </nav>
        </>
    );
};

export default NavBar;
