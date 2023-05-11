import React, { useState, useEffect, useContext } from 'react';
import ItemDB from './ItemDB';

export const AppContext = React.createContext();

export function AppProvider({ children }) {
    const [filteredItems, setFilteredItems] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [editMode, setEditMode] = useState(false);
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

    const setDate = item => {
        item["date"] = new Date()
    }
    
    const addItem = async (item) => {
        item = item ?? { title: "", body: "" };
        setDate(item)
        const addedItemId = await itemDB.add(item);
        item = { ...item, id: addedItemId };
        let allItems = filteredItems.map(itm => itm);
        allItems = [...allItems, item];
        setFilteredItems(allItems);
        return item;
    };

    const updateItem = async (item) => {
        setDate(item)
        const updatedItemId = await itemDB.update(item);
        const updatedItems = filteredItems.map((itm) => (itm.id === updatedItemId ? item : itm));
        setFilteredItems(updatedItems);
        return updatedItemId;
    };

    const deleteItem = async (item) => {
        /*for(let fi of filteredItems){
            await itemDB.delete(fi);    
        }*/
        await itemDB.delete(item);
        const updatedItems = filteredItems.filter((itm) => itm.id !== item.id);
        setFilteredItems(updatedItems);

    };

    const getSelectedItem = () => {
        if (selectedItemId > 0) {
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
        addItem,
        updateItem,
        deleteItem,
        editMode,
        setEditMode
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
    return useContext(AppContext);
};
