import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Navigation extends Component {
  render() {
    return (
      <nav>
        <NavLink 
          className="nav-item"
          exact
          activeClassName="nav-item__active"
          to="/">
          Home
        </NavLink>
        <NavLink
          className="nav-item"
          activeClassName="nav-item__active"
          to="/plans">
          Plans
        </NavLink>
        <NavLink
          className="nav-item"
          activeClassName="nav-item__active"
          to="/about">
          About
        </NavLink>
      </nav>
    )
  }
}