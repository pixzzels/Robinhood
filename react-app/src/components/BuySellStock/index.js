import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { buyStock } from '../../store/transaction';
import { loadPortfolio } from '../../store/portfolio';
import './BuySellStock.css'

function BuySellStock() {

    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.user.id)

    const [shares, setShares] = useState(0);
    const [investmentType, setInvestmentType] = useState('Shares');
    const [reviewTransactionDropDown, setReviewTransactionDropDown] = useState(false);
    const [MPDescription, setMPDescription] = useState(false);
    const [buySell, setBuySell] = useState(true)

    useEffect(() => {
        dispatch(loadPortfolio(userId))
      }, [dispatch])

    const sharesOwned = 0
    const buyingPower = 3034.76;
    const stockSymbol = 'APPL';

    const stockId = 52;
    const orderPrice = 126.85;
    const orderType = 1;

    const handleTransactionSubmit = (e) => {
        e.preventDefault();
        let orderVolume = parseInt(shares)
        // console.log("userId:", userId, "stockId:", stockId, "orderPrice:", orderPrice, "orderVolume:", orderVolume, "orderType:", orderType)
        dispatch(buyStock({ userId, stockId, orderPrice, orderVolume, orderType }))
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


    const estimatedPrice = orderPrice * shares

    return (
        <>
            <div className="buy-sell-container">
                <div className="buy-sell-header bold">
                    <span className={(buySell ? 'active' : '')} onClick={() => {
                        setBuySell(true)
                        setReviewTransactionDropDown(false)
                    }
                    }>Buy {stockSymbol}</span>
                    <span className={(buySell === false ? 'active' : '')} onClick={() => {
                        setBuySell(false)
                        setReviewTransactionDropDown(false)
                    }
                    }>Sell {stockSymbol}</span>
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
                        {investmentType === 'Shares' &&
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
                                    style={{ position: 'relative' }}
                                    onClick={() => {
                                        setMPDescription(true)
                                        setIsVisible(!isVisible)
                                    }
                                    }>
                                    <span style={{ color: '#00c805' }}>
                                        Market Price
                                        <i className="far fa-question-circle"></i>
                                    </span>
                                    <span>${orderPrice}</span>
                                    {MPDescription && isVisible &&
                                        <div className="market-price-info" ref={ref}>
                                            {/* hello */}
                                            <p style={{ fontSize: '13px' }}>
                                                The consolidated FAKE-time market data for AGTC across all US stock exchanges is:
                                        </p>
                                        </div>
                                    }
                                </div>
                                <div className="bs-form-inputs bold">
                                    <span>Estimated {buySell ? "Cost" : "Credit"}</span>
                                    <span>${estimatedPrice}</span>
                                </div>

                                {reviewTransactionDropDown && shares > 0 &&
                                    <>
                                        <p>You are placing a good for day market order to {buySell ? "buy" : "sell"} {shares} share of {stockSymbol}.</p>
                                        <footer className="review-transaction-buy-edit">
                                            <button className="review-transaction-buy-btn rtbe-btn bold" type="submit">{buySell ? "Buy" : "Sell"} </button>
                                            <button className="review-transaction-edit-btn rtbe-btn bold" type="button" onClick={() => setReviewTransactionDropDown(false)}>Edit</button>

                                        </footer>
                                    </>

                                }

                                {reviewTransactionDropDown && shares === 0 &&
                                    <p>You must identify the number of shares you would like to purchase.</p>
                                }

                                <button className={"bs-submit-btn bold " + (reviewTransactionDropDown && shares > 0 ? 'hidden' : '')} type="button" onClick={handleReviewTransaction}>
                                    Review Order
                                </button>


                            </>
                        }
                        {investmentType === "Dollars" &&
                            <div className="bs-form-inputs">
                                Functionality for dollar purchases is unavailable at this time.
                            </div>
                        }
                    </form>
                    <div className="bs-form-bspower">
                        <span>{buySell ? "$" + buyingPower + " buying power available" : sharesOwned + " Share(s) Available"} </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BuySellStock;