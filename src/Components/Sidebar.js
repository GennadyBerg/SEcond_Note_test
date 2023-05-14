import { useContext } from 'react';
import { AppContext } from '../AppContext';
import ItemList from './ItemList';

const Sidebar = () => {
    return (
        <div className="Sidebar">
            <ItemList />
        </div>
    );
};

export default Sidebar;