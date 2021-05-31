import React, { useState, useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { loadPortfolio, updateCashBalance } from '../../store/portfolio';
import { Modal } from '../../context/Modal';
import './Portfolio.css'
import DashChart from '../DashChart';
import * as stockReducer from '../../store/stock'

function Portfolio() {
  const dispatch = useDispatch();
  const [bpDivExpand, setbpDivExpand] = useState(false);
  const [funds, setFunds] = useState(0);
  const [cashBalance, setCashBalance] = useState(0)
  const [refresh, setRefresh] = useState(false)
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [dateRange, setDateRange] = useState('5d');
  const [loading, setLoading] = useState(true)
  const portfolioPerformance = useSelector(state => state.stock.portfolioInfo)
  // console.log(portfolioPerformance)

  const userId = useSelector(state => state.session.user.id)

  const portfolioInfo = useSelector(state => {
    const portfolio = Object.values(state.portfolio)
    return portfolio[0]
})


  useEffect(() => {
    dispatch(loadPortfolio(userId))
}, [dispatch])

  useEffect(() => {
    dispatch(stockReducer.getPortfolioStocks(userId)).then(setLoading(false))
  }, [dispatch])

if (!portfolioInfo) return null;
if (!refresh && cashBalance === 0) {
  setCashBalance(portfolioInfo.cash_balance)
  setRefresh(true)
}

  const setDate = (e) => setDateRange(e.target.value);

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

  if(!portfolioPerformance) {
		return null
	}

  return (
    <div className="portfolio-container">
      <div className="total-investment">
        ${portfolioPerformance.stock_amount.total}
                </div>
      <div className="portfolio-timeline">
        <DashChart dateRange={dateRange} history={portfolioPerformance}/>
      </div>
      <div className="portfolio-timeline-bar">
        <button onClick={setDate} value={'1d'} className="stock-timeline-options btn tlbtn">1D</button>
        <button onClick={setDate} value={'5d'} className="stock-timeline-options btn tlbtn">1W</button>
        <button onClick={setDate} value={'1m'} className="stock-timeline-options btn tlbtn">1M</button>
        <button onClick={setDate} value={'3m'} className="stock-timeline-options btn tlbtn">3M</button>
        <button onClick={setDate} value={'1y'} className="stock-timeline-options btn tlbtn">1Y</button>
        <button onClick={setDate} value={'5y'} className="stock-timeline-options btn tlbtn">5Y</button>
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
