import React from 'react'
import { Route, Switch } from 'react-router-dom'
import About from './components/About'
import PlansContainer from './containers/PlansContainer'
import Home from './components/Home'

export default ({ authed }) => (
  <Switch>
    <Route path="/about">
      <About />
    </Route>
    <Route path="/plans">
      <PlansContainer />
    </Route>
    <Route path="/">
      <Home />
    </Route>
  </Switch>
)