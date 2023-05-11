import React, { useContext } from 'react';
import { AppContext } from './AppContext';

function Item({ item }) {
  const { selectedItemId, setSelectedItemId, setEditMode } = useContext(AppContext);

  const handleItemClick = () => {
    setSelectedItemId(item.id);
    setEditMode(false);
  };

  return (
    <div
      className={`item ${item.id === selectedItemId ? 'active' : ''}`}
      onClick={handleItemClick}
    >
      <h3>{item.title}</h3>
      <p>{item.body}</p>
      <p>{item.date?.toLocaleString()}</p>
    </div>
  );
}

export default Item;
