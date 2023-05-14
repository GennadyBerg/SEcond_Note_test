import React, { useContext } from 'react';
import { AppContext } from './AppContext';

function Item({ item }) {
    const { selectedItemId, setSelectedItemId, setEditMode } = useContext(AppContext);

    const handleItemClick = () => {
        setSelectedItemId(item.id);
        setEditMode(false);
    };

    var today = new Date();
    var itemDate = item?.date;
    var dateFormat = itemDate?.getDate() == today.getDate() ?
        { hour: 'numeric', minute: 'numeric' } :
        { year: "numeric", month: "short", day: "numeric" };
    return (
        <div
            className={`item ${item?.id === selectedItemId ? "selected-item" : "unselected-item"}`}            
            onClick={handleItemClick}
        >
            <div className='trimmed-item-text item-title-text'>{item.title}</div>
            <div className={`trimmed-item-text`}>
                <span className='item-date-text'>{item?.date?.toLocaleString('en-US', dateFormat)}</span>
                {" "}
                <span className='item-body-text'>{item?.body}</span>
            </div>
        </div>
    );
}

export default Item;
