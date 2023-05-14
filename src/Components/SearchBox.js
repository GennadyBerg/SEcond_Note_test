import React, { useContext } from 'react';
import { AppContext } from '../AppContext';

function SearchBox() {
  const { searchText, setSearchText } = useContext(AppContext);

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <div className="search-box">
      <input
        id='seach'
        type="search"
        placeholder="Search "
        value={searchText}
        onChange={handleSearchTextChange}
      />
    </div>
  );
}

export default SearchBox;