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

      <div className="portfolio-nav__links">
        <NavLink to="/dashboard" exact={true} id="home-link" activeClassName="active">
          <img src={blackleaf} alt='black leaf logo' id='blackleaf'></img>
        </NavLink>
      </div>

      <div className="portfolio-search-container">
        <form>
          <input
            className='portfolio-search'
            type='text'
            placeholder='Search'
            required
          />
        </form>
      </div>

      <div className="right-nav-container">
        <div className="portfolio-nav__links">
          <NavLink to="/dashboard" exact={true} id="portfolio-link" activeClassName="active">
            Portfolio
          </NavLink>
        </div>

        <div className="portfolio-nav__links">
          <NavLink to="/account" exact={true} id="account-link" activeClassName="active">
            Account
          </NavLink>
        </div>

        <>
          <LogoutButton />
        </>
      </div>

    </nav>
  );
}

export default NavBar;
