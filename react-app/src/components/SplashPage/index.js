import React from 'react';
import { NavLink } from 'react-router-dom';
import './SplashPage.css';
import SplashNav from '../SplashNav/index';
import Footer from '../Footer/index';
import splash from '../../images/splash.png';
import python from '../../images/python.png';
import react from '../../images/react.png';
import redux from '../../images/redux.png';
import flask from '../../images/flask.png';
import postgresql from '../../images/postgresql.png';
import docker from '../../images/docker.png';
import shapes from '../../images/shapes.png';
import video from '../../images/trade.mp4';



function SplashPage() {
  return (
    <>
      <SplashNav />
      <div className='splash-wrapper'>
        <div id="container-1">
          <div id="message-wrapper">
            <div id="c1-message1">Investing for Everyone</div>
            <div id="c1-message2">Commission-free investing, plus the tools you need to put your money in motion. Sign up and get your first stock for free. Certain limitations apply.</div>
            <NavLink to="/sign-up" exact={true} id="splash-signup__link" activeClassName="active">
                Sign Up
            </NavLink>
            <div id="disclaimer">*Robinhood is connected to stocks from the S&P 500 and is NOT intended for professional use of any kind.</div>
          </div>
          <div id="splash-vid__wrapper">
            {/* <video controlslist="nodownload nofullscreen noremoteplayback" loop preload="auto" playsinline muted autoPlay id="video"> */}
              <img src={splash} alt='trade video' id='splash-vid'></img>
              {/* <source src={video} type="video/mp4"></source> */}
            {/* </video> */}
          </div>
        </div>

        <div id="container-2">
          We will never charge you commissions...or make you any money for that matter.
        </div>

        <div id="container-3">
          <div id="c3-message__wrapper">
            <div id="c3-message1">
              Built with the latest, cutting edge technologies:
            </div>
            <div className="technology-wrapper">
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
                Flask
              </div>
              <div className="technology" id="c3-technology5">
                <img src={postgresql} alt='postgresql logo' className="tech-logo"></img>
                Postgresql
              </div>
              <div className="technology" id="c3-technology6">
                <img src={docker} alt='docker logo' className="tech-logo"></img>
                Docker
              </div>
            </div>
          </div>

          <div id="shapes-wrapper">
            <img src={shapes} alt='shapes' id="shapes-img"></img>
          </div>
        </div>

        <Footer />
      </div >
    </>
  )
}

export default SplashPage