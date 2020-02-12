import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import Routes from './Routes'
import Nav from './components/Nav'
import './App.scss';

import AuthActions from './actions/auth'

const history = createBrowserHistory()

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const accessToken = window.localStorage.getItem('tpaccess')
    if(!accessToken) {
      dispatch(AuthActions.login("jstiehl@gmail.com"))
    }
  }, [dispatch])

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
