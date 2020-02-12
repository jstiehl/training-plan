import React from 'react'
import { Route, Switch } from 'react-router-dom'
import About from './components/About'
import PlansContainer from './containers/PlansContainer'
import HomeContainer from './containers/HomeContainer'

export default ({ authed }) => (
  <Switch>
    <Route path="/about">
      <About />
    </Route>
    <Route path="/plans">
      <PlansContainer />
    </Route>
    <Route path="/">
      <HomeContainer />
    </Route>
  </Switch>
)