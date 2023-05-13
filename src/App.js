import React from 'react';
import './App.css';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import ItemList from './ItemList';
import ItemForm from './ItemForm';
import { AppProvider } from './AppContext';

function App() {
  return (
    <AppProvider>
      <h5>MY NOTES</h5>
      <div className="app">
        <Navbar />
        <div className="container">
          <Sidebar />
          <div className='vertical-line'></div>
          <ItemForm />
        </div>
      </div>
    </AppProvider>
  );
}

export default App;
