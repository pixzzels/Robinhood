import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { buyStock, loadTransactions } from '../../store/transaction';
import { loadPortfolio, updateCashBalance } from '../../store/portfolio';
import './BuySellStock.css'

function BuySellStock({ symbol, price, stockId }) {

    const dispatch = useDispatch();
    const [shares, setShares] = useState(0);
    const [investmentType, setInvestmentType] = useState('Shares');
    const [reviewTransactionDropDown, setReviewTransactionDropDown] = useState(false);
    const [MPDescription, setMPDescription] = useState(false);
    const [buySell, setBuySell] = useState(true)
    const [cashBalance, setCashBalance] = useState(0)
    const [isVisible, setIsVisible] = useState(false);
    const [refresh, setRefresh] = useState(false)
    const ref = useRef(null);

    const userId = useSelector(state => state.session.user.id)
    const portfolioInfo = useSelector(state => {
        const portfolio = Object.values(state.portfolio)
        return portfolio[0]
    })
    const transactions = useSelector(state => {
        const trans = Object.values(state.transaction)
        return trans;
    })
    // console.log("transactions", transactions)
    // console.log("stockId",stockId)


    useEffect(() => {
        dispatch(loadPortfolio(userId))
    }, [dispatch])

    useEffect(() => {
        dispatch(loadTransactions(userId))
    }, [dispatch])

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

    if (!portfolioInfo) return null;
    if (!refresh && cashBalance === 0) {
        setCashBalance(portfolioInfo.cash_balance)
        setRefresh(true)
    }

    const stockSymbol = symbol.toUpperCase();

    const orderPrice = parseInt(price.toFixed(2));
    let orderType;
    const estimatedPrice = orderPrice * shares

    const stockBuys = transactions.filter((transaction) => transaction.stock_id.ticker === stockSymbol && transaction.order_type === 1).map((el => el.order_volume))
    const stockSells = transactions.filter((transaction) => transaction.stock_id.ticker === stockSymbol && transaction.order_type === 2).map((el => el.order_volume))

    const buyVol = stockBuys.reduce(function (a, b) {
        return a + b;
    }, 0);

    const sellVol = stockSells.reduce(function (a, b) {
        return a + b;
    }, 0);

    let sharesOwned = buyVol - sellVol

    const handleTransactionSubmit = (e) => {
        e.preventDefault();
        let orderVolume = parseInt(shares)

        let newBal;
        if (buySell === true) {
            orderType = 1;
            newBal = cashBalance - estimatedPrice
            dispatch(updateCashBalance({ userId, newBal }))
            setCashBalance(newBal)
        } else {
            orderType = 2;
            newBal = cashBalance + estimatedPrice
            dispatch(updateCashBalance({ userId, newBal }))
            setCashBalance(newBal)
        }

        dispatch(buyStock({ userId, stockId, orderPrice, orderVolume, orderType }))
        setReviewTransactionDropDown(false)
        setShares(0)
        setBuySell(true)
        let input = document.querySelector(".bs-share-input")
        input.value = ''
        // console.log("userId:", userId, "stockId:", stockId, "orderPrice:", orderPrice, "orderVolume:", orderVolume, "orderType:", orderType)

    }

    const handleReviewTransaction = () => {
        setReviewTransactionDropDown(true)
    }


    return (
        <>
            <div className="buy-sell-container">
                <div className="buy-sell-header bold">
                    <span className={(buySell ? 'atv-header' : '')} onClick={() => {
                        setBuySell(true)
                        setReviewTransactionDropDown(false)
                    }
                    }>Buy {stockSymbol}</span>

                    {sharesOwned != 0 &&
                        <span className={(buySell === false ? 'atv-header' : '')} onClick={() => {
                            setBuySell(false)
                            setReviewTransactionDropDown(false)
                        }
                        }>Sell {stockSymbol}</span>
                    }
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
                                    <span>${(estimatedPrice).toFixed(2)}</span>
                                </div>

                                {reviewTransactionDropDown && shares > 0 &&
                                    <>
                                        <p>You are placing a good for day market order to {buySell ? "buy" : "sell"} {shares} share(s) of {stockSymbol}.</p>
                                        <footer className="review-transaction-buy-edit">
                                            <button className="review-transaction-buy-btn rtbe-btn bold" type="submit">{buySell ? "Buy" : "Sell"} </button>
                                            <button className="review-transaction-edit-btn rtbe-btn bold" type="button" onClick={() => setReviewTransactionDropDown(false)}>Edit</button>

                                        </footer>
                                    </>

                                }

                                {reviewTransactionDropDown && shares === 0 &&
                                    <p>Please enter a valid number of shares.</p>
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
                        <span>{buySell ? "$" + cashBalance.toFixed(2) + " buying power available" : sharesOwned + " Share(s) Available"} </span>
                        <button className="add-to-list-clicker" onClick={() => setIsVisible(!isVisible)}> 
                            + Add to Lists
                            {isVisible &&
                                <div className="add-to-list-div" ref={ref}>
                                    <div>Insert Lists and add to lists buttons</div>
                                </div>
                            }
                        </button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default BuySellStock;