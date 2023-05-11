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
            updateItem(getSelectedItem());
        }
    };

    const handleDeleteClick = () => {
        if (selectedItemId) {
            deleteItem(getSelectedItem());
            setSelectedItemId();
            setEditMode(false);
        }
    };

    return (
        <>
            <nav className="NavBar">
                <div className='nav-wrapper'>
                    {!editMode ? (
                        <>
                            <button className="add-button" onClick={handleAddClick}>
                                <FaPlus />
                            </button>
                        </>
                    ) : null}
                    {selectedItemId && !editMode ? (
                        <>
                            <button className="edit-button" onClick={handleEditClick}>
                                <FaEdit />
                            </button>
                            <button className="delete-button" onClick={handleDeleteClick}>
                                <FaTrash />
                            </button>
                        </>
                    ) : null}
                    <SearchBox />
                </div>
            </nav>
        </>
    );
};

export default NavBar;
