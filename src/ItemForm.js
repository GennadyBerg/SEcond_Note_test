import { useContext, useEffect, useState } from 'react';
import { AppContext } from './AppContext';

const ItemForm = () => {
    const cntx = useContext(AppContext);
    let item = cntx.getSelectedItem();
    let [title, setTitle] = useState(item?.title || '');
    let [body, setBody] = useState(item?.body || '');
    let [id, setId] = useState(item?.id);

    const save = async ({title, body}) => {
        var id1 = await cntx.updateItem(id ? { id, title, body } : { title, body });
        setId(id1);
    };

    const handleSetTitle = (title) => {
        setTitle(title);
        save({title, body});
    }
    const handleSetBody = (body) => {
        setBody(body);
        save({title, body});
    }

    useEffect(() => {
        setTitle(item?.title);
        setBody(item?.body);
        setId(item?.id);
    }, [item?.title, item?.body]);

    return (
        <>
        <div className='input-form'>
            <p>Date</p>
            <input id='title' disabled={!cntx.editMode} type="text" placeholder="Title" value={title ?? ''} 
                onInput={e => handleSetTitle(e.target.value)} required />
            <textarea id='text-note' disabled={!cntx.editMode} placeholder="Body" value={body ?? ''} 
                onChange={e => handleSetBody(e.target.value)} required></textarea>
        </div>
        </>
    );
};

export default ItemForm;