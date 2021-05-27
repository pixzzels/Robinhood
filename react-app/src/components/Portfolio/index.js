import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { loadPortfolio, updateCashBalance } from '../../store/portfolio';
import { Modal } from '../../context/Modal';
import './Portfolio.css'

function Portfolio() {
  const dispatch = useDispatch();
  const [bpDivExpand, setbpDivExpand] = useState(false);
  const [funds, setFunds] = useState(0);
  const [cashBalance, setCashBalance] = useState(0)
  const [refresh, setRefresh] = useState(false)
  const [showDepositModal, setShowDepositModal] = useState(false);
  // console.log(funds)

  const userId = useSelector(state => state.session.user.id)

  const portfolioInfo = useSelector(state => {
    const portfolio = Object.values(state.portfolio)
    return portfolio[0]
})


  useEffect(() => {
    dispatch(loadPortfolio(userId))
}, [dispatch])

if (!portfolioInfo) return null;
if (!refresh && cashBalance === 0) {
  setCashBalance(portfolioInfo.cash_balance)
  setRefresh(true)
}

  const buyingPowerExpand = () => {
    setbpDivExpand(!bpDivExpand)
  }

  const bpLearnMore = () => {

  }

  const showDepositForm = () => {
    setShowDepositModal(!showDepositModal)
  }

  const depositFunds = (e) => {
    e.preventDefault();
    let newBal = portfolioInfo.cash_balance

    newBal = parseInt(newBal) + parseInt(funds)
    setCashBalance(newBal)
    // console.log('newBal', newBal)
    updateCashBalance({ userId, newBal })
    setShowDepositModal(false)

  }

  const handleDepositCancel = (e) => {
    e.preventDefault();
    setShowDepositModal(!showDepositModal)
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
          <span className={"buying-power-number " + (bpDivExpand ? 'hidden' : '')}>${cashBalance.toFixed(2)}</span>
        </div>
      </button>
      {bpDivExpand &&
        <div className="buying-power-add grey">
          <div className="buying-power-mini-container">
            <div className="buying-power__2">
              <span>Brokerage Power</span>
              <span>${cashBalance.toFixed(2)}</span>
            </div>
            <div className="buying-power__2">
              <span>Buying Power</span>
              <span className="bold">${cashBalance.toFixed(2)}</span>
            </div>
            <button
              type="button"
              className="deposit-funds-btn"
              onClick={showDepositForm}
            >
              Deposit Funds</button>
            {showDepositModal &&
              <div>
                <Modal className="deposit-modal" onClose={() => setShowDepositModal(false)}>

                  <div className="deposit-modal-content">
                    <form className="deposit-funds-form" onSubmit={depositFunds}>
                      <h2>Deposit Funds</h2>
                      <label htmlFor="amount">Amount</label>
                      <input
                        className="depost-funds-form__input"
                        type="number"
                        name="amount"
                        placeholder="$200.00"
                        onChange={(e) => setFunds(e.target.value)}
                      >
                      </input>
                      <button className='deposit-btn' type="submit">Deposit</button>
                      <button className='deposit-btn' type="button" onClick={handleDepositCancel}>Cancel</button>
                    </form>
                  </div>

                </Modal>
              </div>

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