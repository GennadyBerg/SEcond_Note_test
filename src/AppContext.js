import React, { useState, useEffect, useContext } from 'react';
import ItemDB from './ItemDB';

export const AppContext = React.createContext();

export function AppProvider({ children }) {
    const [filteredItems, setFilteredItems] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [searchText, setSearchText] = useState('');
    const itemDB = new ItemDB();

    useEffect(() => {
        async function fetchItems() {
            const result = await itemDB.getAll();
            setFilteredItems(result);
        }
        fetchItems();
    }, []);

    useEffect(() => {
        async function filterItems() {
            const result = await itemDB.searchItems(searchText);
            setFilteredItems(result);
        }
        filterItems();
    }, [searchText]);

    async function handleAddItemClick(item) {
        const result = await itemDB.addItem(item);
        setFilteredItems([...filteredItems, result]);
    }

    async function handleEditItemClick(item) {
        const result = await itemDB.updateItem(item);
        const index = filteredItems.findIndex((i) => i.id === result.id);
        if (index >= 0) {
            const updatedItems = [...filteredItems];
            updatedItems[index] = result;
            setFilteredItems(updatedItems);
        }
    }

    async function handleDeleteItemClick(id) {
        await itemDB.deleteItem(id);
        const updatedItems = filteredItems.filter((item) => item.id !== id);
        setFilteredItems(updatedItems);
        setSelectedItemId(null);
    }

    const addItem = async (item) => {
        const addedItem = await itemDB.add(item);
        setFilteredItems([...filteredItems, addedItem]);
    };

    const updateItem = async (item) => {
        const updatedItem = await itemDB.update(item);
        const updatedItems = filteredItems.map((item) => (item.id === updatedItem.id ? updatedItem : item));
        setFilteredItems(updatedItems);
    };

    const deleteItem = async (itemId) => {
        await itemDB.delete(itemId);
        const updatedItems = filteredItems.filter((item) => item.id !== itemId);
        setFilteredItems(updatedItems);
    };

    const getSelectedItem = () => {
        if (selectedItemId > 0){
            let res = filteredItems.filter((item) => item.id == selectedItemId);
            return res.length > 0 ? res[0] : null;
        }
        else
            return null;
    }

    const value = {
        filteredItems,
        setFilteredItems,
        selectedItemId,
        setSelectedItemId,
        getSelectedItem,
        searchText,
        setSearchText,
        handleAddItemClick,
        handleEditItemClick,
        handleDeleteItemClick,
        addItem,
        updateItem,
        deleteItem,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
    return useContext(AppContext);
};
