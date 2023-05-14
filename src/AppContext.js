import React, { useState, useEffect, useContext } from 'react';
import ItemDBIndexeddb from './DB/ItemDBIndexeddb';
import ItemDBQuinta from './DB/ItemDBQuinta';

const AppContext = React.createContext();

function AppProvider({ children }) {
    const [filteredItems, setFilteredItems] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [editMode, setEditMode] = useState(false);
    let [itemDB, setItemDB] = useState(false);

    const getDB = () => {
        let dbKey = process.env.REACT_APP_USE_DB_CMD ?? process.env.REACT_APP_USE_DB;
        switch (dbKey) {
            case 'indexeddb':
                return new ItemDBIndexeddb();
            case 'quintadb':
                return new ItemDBQuinta();
            default:
                throw new Error(`Support for ${dbKey} DB is not implemented yet.`);
        }
    }

    useEffect(() => {
        async function fetchItems() {
            const result = await itemDB.getAll();
            setFilteredItems(result);
        }
        itemDB = getDB();
        setItemDB(itemDB);
        fetchItems();
    }, []);

    useEffect(() => {
        async function filterItems() {
            const result = await itemDB.searchItems(searchText);
            setFilteredItems(result);
        }
        filterItems();
    }, [searchText]);

    const addItem = async (item) => {
        item = item ?? { title: undefined, body: undefined };
        item = await itemDB.add(item);
        let allItems = filteredItems.map(itm => itm);
        allItems = [...allItems, item];
        setFilteredItems(allItems);
        return item;
    };

    const updateItem = async (item) => {
        const updatedItem = await itemDB.update(item);
        const updatedItems = filteredItems.map((itm) => (itm.id === updatedItem.id ? updatedItem : itm));
        setFilteredItems(updatedItems);
        return updatedItem;
    };

    const deleteItem = async (item) => {
        await itemDB.delete(item);
        const updatedItems = filteredItems.filter((itm) => itm.id !== item.id);
        setFilteredItems(updatedItems);

    };

    const getSelectedItem = () => {
        if (selectedItemId) {
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
export {AppContext, AppProvider};
