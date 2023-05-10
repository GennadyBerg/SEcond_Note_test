import { useContext, useEffect, useState } from 'react';
import { AppContext } from './AppContext';

const ItemForm = () => {
    const cntx = useContext(AppContext);
    let item = cntx.getSelectedItem();
    let [title, setTitle] = useState(item?.title || '');
    let [body, setBody] = useState(item?.body || '');
    let [id, setId] = useState(item?.id);

    const handleSubmit = (e) => {
        e.preventDefault();
        cntx.updateItem(id ? { id, title, body } : { title, body });
        setTitle('');
        setBody('');
    };

    useEffect(() => {
        setTitle(item?.title);
        setBody(item?.body);
        setId(item?.id);
    }, [item?.title, item?.body]);

    return (
        <form className="ItemForm" onSubmit={handleSubmit}>
            <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
            <textarea placeholder="Body" value={body} onChange={e => setBody(e.target.value)} required></textarea>
            <button type="submit">{item ? 'Save' : 'Add'}</button>
        </form>
    );
};

export default ItemForm;