import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {

  const logout = () => {
    localStorage.removeItem('token');
  }

  return (
    <header>
      <nav>
        <a className="navbar-brand" href="#">
          App Name
        </a>
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/" >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/about">
              About
            </NavLink>
          </li>
          <li className="nav-item dropdown">
            <NavLink className="nav-link dropbtn" to={'#'}>
              User Name
            </NavLink>
            <div className="dropdown-content">
              <NavLink to="/profile">My Profile</NavLink>
              <a onClick={logout} href="/login">Logout</a>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
