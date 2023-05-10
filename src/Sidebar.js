import { useContext } from 'react';
import { AppContext } from './AppContext';

const Sidebar = ({ items, selectedItem, setSelectedItem }) => {
  const { handleAddItem } = useContext(AppContext);

  const handleSidebarItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="Sidebar">
      <div className="Sidebar-item" onClick={() => handleAddItem('', '')}>
        Add New Item
      </div>
      {items?.map(item => (
        <div key={item.id} className={`Sidebar-item ${selectedItem?.id === item.id ? 'selected' : ''}`} onClick={() => handleSidebarItemClick(item)}>
          {item.title}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;