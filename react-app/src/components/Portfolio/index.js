import React, { useState } from 'react';
import ReactDOM from "react-dom";
import { Modal } from '../../context/Modal';
import './Portfolio.css'

function Portfolio() {
  const [bpDivExpand, setbpDivExpand] = useState(false);
  const [fundsForm, setFundsForm] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);

  const buyingPowerExpand = () => {
    setbpDivExpand(!bpDivExpand)
  }

  const bpLearnMore = () => {

  }

  const showDepositForm = () => {
    setShowDepositModal(!showDepositModal)
  }

  const depositFunds = () => {
    // post request
    // to add funds
  }

  return (
    <div className="portfolio-container">
      <div className="total-investment">
        $400.34
                </div>
      <div className="portfolio-timeline">
        | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
        | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
        | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
        | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
        | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
        | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
        | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
        | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
        | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
        | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
        | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
        | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
        | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |

                </div>
      <div className="portfolio-timeline-bar">
        <button className="portfolio-timeline-options btn tlbtn">1D</button>
        <button className="portfolio-timeline-options btn tlbtn">1W</button>
        <button className="portfolio-timeline-options btn tlbtn">1M</button>
        <button className="portfolio-timeline-options btn tlbtn">1Y</button>
        <button className="portfolio-timeline-options btn tlbtn">ALL</button>

      </div>
      <button className={"buying-power-container-btn " + (bpDivExpand ? 'grey' : '')} type="button" onClick={buyingPowerExpand}>
        <div className={"buying-power-header " + (bpDivExpand ? 'grey' : '')}>
          <span>Buying Power</span>
          {/* <span>$3034.76</span> */}
          <span className={"buying-power-number " + (bpDivExpand ? 'hidden' : '')}>$3034.76</span>
        </div>
      </button>
      {bpDivExpand &&
        <div className="buying-power-add grey">
          <div className="buying-power-mini-container">
            <div className="buying-power__2">
              <span>Brokerage Power</span>
              <span>$3034.76</span>
            </div>
            <div className="buying-power__2">
              <span>Buying Power</span>
              <span className="bold">$3034.76</span>
            </div>
            <button
              type="button"
              className="deposit-funds-btn"
              onClick={showDepositForm}
            >
              Deposit Funds
                                </button>
            {showDepositModal &&
              (<Modal className="deposit-modal" onClose={() => setShowDepositModal(false)}>
                <form className="deposit-funds-form" onSubmit={depositFunds}>
                  <h2>Deposit Funds</h2>
                  <label htmlFor="amount">
                    Amount
                                        </label>
                  <input
                    className="depost-funds-form__input"
                    type="number"
                    name="amount"
                    placeholder="$200.00"
                  >
                  </input>
                  <button type="submit">
                    Deposit
                                        </button>
                </form>
              </Modal>)
            }
          </div>

          <div className="buying-power__info">
            Buying Power represents the total value of stocks you can purchase.
                                <button
              className="buying-power__learn-more-btn"
              type="button"
              onClick={bpLearnMore}
            >Learn More</button>
          </div>
        </div>
      }
    </div>
  )
}

export default Portfolio;