import React,  { Component } from 'react';
import { NavLink } from 'react-router-dom';

import FaDollar from 'react-icons/lib/fa/dollar';
import './header.css';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="header-logo">
          <FaDollar className="header-icon"/>
          <h1> Money Management </h1>
        </div>
        <ul>
          <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
          <li><NavLink to="/expenses" activeClassName="active">Expenses</NavLink></li>
          <li><NavLink to="/income" activeClassName="active">Income</NavLink></li>
        </ul>
      </div>
    );
  }
}

export default Header;