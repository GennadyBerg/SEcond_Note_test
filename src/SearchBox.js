import React, { useContext } from 'react';
import { AppContext } from './AppContext';

function SearchBox() {
  const { searchText, setSearchText } = useContext(AppContext);

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search items"
        value={searchText}
        onChange={handleSearchTextChange}
      />
    </div>
  );
}

export default SearchBox;