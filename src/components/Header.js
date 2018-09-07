import React from 'react';
import logo from '../logo.svg';
const Header = ({PageName}) =>   
   <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to {PageName}</h1>
    </header>    
export default Header;