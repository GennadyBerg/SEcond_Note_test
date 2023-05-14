import { useContext, useEffect, useState } from 'react';
import { AppContext } from './AppContext';

const ItemForm = () => {
    const cntx = useContext(AppContext);
    let item = cntx.getSelectedItem();

    const save = async (itm) => {
        await cntx.updateItem(itm);
    };

    const handleSetTitle = (title) => {
        item.title = title;
        save(item);
    }
    const handleSetBody = (body) => {
        item.body = body;
        save(item);
    }

    return (
        <>
        <div className='input-form'>
            <p>{item?.date.toLocaleString()}</p>
            <input className='title' disabled={!cntx.editMode} style={{fontSize:"x-large"}} type="text" placeholder="Title" value={item?.title ?? ''} 
                onInput={e => handleSetTitle(e.target.value)} required />
            <textarea className='text-note' disabled={!cntx.editMode} placeholder="Body" value={item?.body ?? ''} 
                onChange={e => handleSetBody(e.target.value)} required></textarea>
        </div>
        </>
    );
};

export default ItemForm;