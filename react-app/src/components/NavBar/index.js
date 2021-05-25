import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css';
import blackleaf from '../../images/black-leaf.PNG';

const NavBar = () => {
  const user = useSelector(state => state.session.user);

  return (
    <nav className="nav-wrapper">
      <div className="nav-link" id="home-link">
        <NavLink to="/" exact={true} activeClassName="active">
          <img src={blackleaf} alt='black leaf logo' id='blackleaf'></img>
        </NavLink>
      </div>

      <>
      <LogoutButton/>
      </>
    </nav>
  );
}

export default NavBar;
