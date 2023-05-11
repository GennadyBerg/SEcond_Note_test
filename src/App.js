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
      <h1>MY NOTES</h1>
      <div className="app">
        <Navbar />
        <div className="container">
          <Sidebar />
          <div id='vertical-line'></div>
          <ItemForm />
        </div>
      </div>
    </AppProvider>
  );
}

export default App;
