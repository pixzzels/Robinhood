import React from 'react';
import { NavLink } from 'react-router-dom';
import './SplashPage.css';
import trade from '../../images/trade.gif';
import python from '../../images/python.png';
import react from '../../images/react.png';
import redux from '../../images/redux.png';
import flask from '../../images/flask.png';
import postgresql from '../../images/postgresql.png';
import docker from '../../images/docker.png';
import shapes from '../../images/shapes.png';


function SplashPage() {
  return (
    <div className='splash-wrapper'>
      <div id="container-1">
        <div id="message-wrapper">
          <div id="c1-message1">Investing for Everyone</div>
          <div id="c1-message2">Commission-free investing, plus the tools you need to put your money in motion. Sign up and get your first stock for free. Certain limitations apply.</div>
          <NavLink to="/sign-up" exact={true} id="splash-signup__link" activeClassName="active">
              Sign Up
          </NavLink>
        </div>
        <div id="trade-gif_wrapper">
          <img src={trade} alt='trade gif' id='trade-gif'></img>
        </div>
      </div>

      <div id="container-2">
        We will never charge you commissions...or make you any money for that matter.
      </div>

      <div id="container-3">
        <div id="c3-message__wrapper">
          <div id="c3-message1">
            Built with the latest, cutting edge technology:
          </div>
          <div className="technology" id="c3-technology1">
            <img src={python} alt='python logo' className="tech-logo"></img>
            Python
          </div>
          <div className="technology" id="c3-technology2">
            <img src={react} alt='react logo' className="tech-logo"></img>
            React
          </div> 
          <div className="technology" id="c3-technology3">
            <img src={redux} alt='redux logo' className="tech-logo"></img>
            Redux
          </div>
          <div className="technology" id="c3-technology4">
            <img src={flask} alt='flask logo' className="tech-logo"></img>
            Redux
          </div>
          <div className="technology" id="c3-technology5">
            <img src={postgresql} alt='postgresql logo' className="tech-logo"></img>
            Redux
          </div>
          <div className="technology" id="c3-technology6">
            <img src={docker} alt='docker logo' className="tech-logo"></img>
            Redux
          </div>
        </div>

        <div id="shapes-wrapper">
          <img src={shapes} alt='shapes' id="shapes-img"></img>
        </div>
      </div>
    </div >
  )
}

export default SplashPage