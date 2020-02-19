import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import Routes from './Routes'
import Nav from './components/Nav'
import Header from './components/Header'
import Login from './components/Login'
import './App.scss';

import AuthActions from './actions/auth'

const history = createBrowserHistory()

function App() {
  const auth = useSelector(state => state.auth.authed)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(AuthActions.verifyAuth())
  }, [dispatch, auth])

  return auth ? (
    <Router history={history}>
      <div className="App">
        <Header />
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
  ) : <Login />
}

export default App;
