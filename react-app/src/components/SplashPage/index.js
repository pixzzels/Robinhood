import React from 'react';
import './SplashPage.css';
import trade from '../../images/trade.gif';

function SplashPage() {
  return (
    <div className='splash-wrapper'>
      <div id="container-1">
        <div id="message-wrapper">
          <div id="c1-message1">Investing for Everyone</div>
          <div id="c1-message2">Commission-free investing, plus the tools you need to put your money in motion. Sign up and get your first stock for free. Certain limitations apply.</div>
          <div>
            Sign Up
          </div>
        </div>
        <div id="trade-gif_wrapper">
          {/* <img src={trade} alt='trade gif' id='trade'></img> */}
        </div>
      </div>
    </div >
  )
}

export default SplashPage