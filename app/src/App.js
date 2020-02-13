import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import Img from 'react-image'
import Routes from './Routes'
import Nav from './components/Nav'
import './App.scss';

import logo from './assets/climb.png'

import AuthActions from './actions/auth'

const history = createBrowserHistory()

function App() {
  const [auth, setAuth] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    const accessToken = window.localStorage.getItem('tpaccess')
    if(!accessToken) {
      return dispatch(AuthActions.login("jstiehl@gmail.com"))
        .then(() => {
          setAuth(true)
        })
    } else {
      setAuth(true)
    }
  }, [dispatch, auth])

  return auth ? (
    <Router history={history}>
      <div className="App">
        <header className="App-header">
          <span className="app-logo"><Img src={logo} /></span>
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
  ) : "Loading"
}

export default App;
