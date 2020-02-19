import React from 'react'
import Img from 'react-image'
import logo from '../assets/climb.png'

const Header = () => (
  <header className="App-header">
    <span className="app-logo"><Img src={logo} /></span>
    <h2>Training Plan</h2>
  </header>
)

export default Header