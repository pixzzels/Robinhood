import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css';
import blackleaf from '../../images/robinhood-2.svg';

const NavBar = () => {
  const user = useSelector(state => state.session.user);
  const [showDropdown, setShowDropdown] = useState(false);

  // console.log('user', user)

  const handleDropdown = () => {
    setShowDropdown(!showDropdown)
  }

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
          <a href="https://github.com/pixzzels/Robinhood" target="_blank" id="github-link" activeClassName="active">
            Our GitHub Repository
          </a>
        </div>


        <div className="portfolio-nav__links">
          <button type="button" onClick={handleDropdown} id="account-link">
            Account
          </button>
        </div>
        {showDropdown &&
          <div className="account-options-dropdown">

            <div className="drop-container1">
              <div id="users-name">{user.first_name} {user.last_name}</div>
              <div>{user.email}</div>
            </div>

            <div className="drop-container2">
              <NavLink to="/account" exact={true} activeClassName="active" className="account-list history-link">
                <i class="fas fa-toolbox drop-icon"></i>
                Account
              </NavLink>

              <NavLink to="/history" exact={true} activeClassName="active" className="account-list history-link">
                <i class="fas fa-history drop-icon"></i>
                History
               </NavLink>
            </div>

            <div className="drop-container3 account-list">
              <i class="fas fa-sign-out-alt drop-icon"></i>
              <LogoutButton />
            </div>

          </div>
        }

      </div>

    </nav>
  );
}

export default NavBar;
