import React, { useContext } from 'react';
import { AppContext } from './AppContext';

function Item({ item }) {
  const { selectedItemId, setSelectedItemId } = useContext(AppContext);

  const handleItemClick = () => {
    setSelectedItemId(item.id);
  };

  return (
    <div
      className={`item ${item.id === selectedItemId ? 'active' : ''}`}
      onClick={handleItemClick}
    >
      <h3>{item.title}</h3>
      <p>{item.body}</p>
    </div>
  );
}

export default Item;
