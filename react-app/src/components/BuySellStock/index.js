import React, { useState, useEffect, useRef } from 'react'
import { useDispatchf} from 'react-redux'
import './BuySellStock.css'

function BuySellStock() {

    const [shares, setShares] = useState(0);
    const [investmentType, setInvestmentType] = useState('Shares');
    const [reviewTransactionDropDown, setReviewTransactionDropDown] = useState(false);
    const [MPDescription, setMPDescription] = useState(false);


    const marketPrice = 143.13;
    const buyingPower = 3034.76;
    const stockSymbol = 'APPL'

    const handleTransactionSubmit = () => {

    }


    const handleReviewTransaction = () => {
        setReviewTransactionDropDown(true)
    }

    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);
  
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsVisible(false);
      }
    };
  
    useEffect(() => {
      document.addEventListener('click', handleClickOutside, true);
      return () => {
        document.removeEventListener('click', handleClickOutside, true);
      };
    }, []);


    const estimatedPrice = marketPrice * shares

    return (
        <>
            <div className="buy-sell-container">
                <div className="buy-sell-header bold">
                    <span>Buy {stockSymbol}</span>
                    <span>Sell {stockSymbol}</span>
                    <button className="down-arrow-btn">
                        <i className="fas fa-chevron-down"></i>
                    </button>
                </div>
                <div className="buy-sell-content">
                    <form className="buy-sell-form" onSubmit={handleTransactionSubmit}>
                        <div className="bs-form-inputs">
                            <label htmlFor="invest-options">Invest In</label>
                            <select className="bs-share-select" name="invest-options" onChange={(e) => setInvestmentType(e.target.value)}>
                                <option>Shares</option>
                                <option>Dollars</option>
                            </select>
                        </div>
                        {investmentType == 'Shares' &&
                            <>
                                <div className="bs-form-inputs">
                                    <label htmlFor="shares">Shares</label>
                                    <input
                                        className="bs-share-input"
                                        type="number"
                                        min="0"
                                        placeholder="0"
                                        // value={(e)=> e.target.value}
                                        onChange={(e) => {
                                            setShares(e.target.value)
                                            setReviewTransactionDropDown(false)
                                        }
                                        }
                                    >
                                    </input>
                                </div>
                                <div className="bs-form-inputs underline bs-form-inputs-mp" 
                                style={{position: 'relative'}}
                                onClick={()=>{
                                    setMPDescription(true)
                                    setIsVisible(!isVisible)
                                }
                                }>
                                    <span style={{color: '#00c805'}}>
                                        Market Price 
                                        <i className="far fa-question-circle"></i>
                                    </span>
                                    <span>${marketPrice}</span>
                                    {MPDescription && isVisible &&
                                    <div className="market-price-info" ref={ref}>
                                        {/* hello */}
                                        <p style={{fontSize: '13px'}}>
                                        The consolidated FAKE-time market data for AGTC across all US stock exchanges is:
                                        </p>
                                    </div>
                                    }
                                </div>
                                <div className="bs-form-inputs bold">
                                    <span>Estimated Cost</span>
                                    <span>${estimatedPrice}</span>
                                </div>

                                {reviewTransactionDropDown && shares > 0 &&
                                    <>
                                        <p>You are placing a good for day market order to buy {shares} share of {stockSymbol}.</p>
                                        <footer className="review-transaction-buy-edit">
                                            <button className="review-transaction-buy-btn rtbe-btn bold" type="submit">Buy</button>
                                            <button className="review-transaction-edit-btn rtbe-btn bold" type="button" onClick={() => setReviewTransactionDropDown(false)}>Edit</button>

                                        </footer>
                                    </>

                                }

                                {reviewTransactionDropDown && shares == 0 &&
                                    <p>You must identify the number of shares you would like to purchase.</p>
                                }

                                <button className={"bs-submit-btn bold " + (reviewTransactionDropDown && shares > 0 ? 'hidden' : '')} type="button" onClick={handleReviewTransaction}>
                                    Review Order
                                </button>


                            </>
                        }
                        {investmentType == "Dollars" &&
                            <div className="bs-form-inputs">
                                Functionality for dollar purchases unavailable at this time.
                            </div>
                        }
                    </form>
                    <div className="bs-form-bspower">
                        <span>${buyingPower} buying power available</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BuySellStock;