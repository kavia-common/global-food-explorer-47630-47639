import React from 'react';
import './App.css';
import './styles/theme.css';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import Routes from './router/Routes';

/**
 * PUBLIC_INTERFACE
 * App renders the layout with NavBar, route outlet, and Footer.
 */
function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="container main">
        <Routes />
      </div>
      <Footer />
    </div>
  );
}

export default App;
