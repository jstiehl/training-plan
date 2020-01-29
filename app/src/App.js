import React from 'react';
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import Routes from './Routes'
import Nav from './components/Nav'
import './App.scss';

const history = createBrowserHistory()

function App() {
  return (
    <Router history={history}>
      <div className="App">
        <header className="App-header">
          <h2>Training Plan</h2>
        </header>
        <div className="main-container">
          <div className="main-navigation">
            <Nav />
          </div>
          <div className="main-routes">
            <Routes />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
