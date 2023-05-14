import React from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import ItemList from './Components/ItemList';
import ItemForm from './Components/ItemForm';
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
