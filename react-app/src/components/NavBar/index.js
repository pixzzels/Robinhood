import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css';
import logo from '../../images/logo-black-small.png';

const NavBar = () => {
  // const user = useSelector(state => state.session.user);

  // const logoutLink = (
  //   <>
  //     <LogoutButton />
  //   </>
  // )

  // let linkDisplay;
  // user ? linkDisplay = logoutLink : linkDisplay = ""

  return (
    <nav className="nav-wrapper">
      <div className="nav-link" id="home-link">
        <NavLink to="/" exact={true} activeClassName="active">
          <img src={logo} alt='logo' id='logo-black'></img>
        </NavLink>
      </div>

      {/* links to profile ? drop down ??? */}
      <div className="nav-link greens" id="contact-link">
        <NavLink to="/contactus" exact={true} activeClassName="active">
          Contact us
        </NavLink>
      </div>

      <div className="nav-link greens" id="about-link">
        <NavLink to="/whoweare" exact={true} activeClassName="active">
          Who we are
        </NavLink>
      </div>

      <div className="nav-link greens" id="login-link">
        <NavLink to="/login" exact={true} activeClassName="active">
          Login
        </NavLink>
      </div>

      <div className="nav-link" id="signup-link">
        <NavLink to="/sign-up" exact={true} activeClassName="active">
          Sign Up
        </NavLink>
      </div>
      {/* <div>
        {linkDisplay}
      </div> */}
    </nav>
  );
}

export default NavBar;
