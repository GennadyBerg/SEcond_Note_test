import React, { useContext, useState, useEffect } from 'react';
import Item from './Item';
import ItemForm from './ItemForm';
import SearchBox from './SearchBox';
import { AppContext } from '../AppContext';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const ItemList = () => {
  const {
    filteredItems,
  } = useContext(AppContext);

  return (
    <div className="ItemList">
      {filteredItems?.map((item) => (
        <Item key={item?.id} item={item} />
      ))}
    </div>
  );

};

export default ItemList;
