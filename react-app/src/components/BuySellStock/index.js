import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { buyStock, loadTransactions } from '../../store/transaction';
import { loadPortfolio, updateCashBalance } from '../../store/portfolio';
import { addOneList, loadAllList } from '../../store/watchlist';
import { addStocksList, addOneStock, loadStocksList } from '../../store/list';
import './BuySellStock.css';

function BuySellStock({ symbol, price, stockId }) {

    const dispatch = useDispatch();
    const [shares, setShares] = useState(0);
    const [investmentType, setInvestmentType] = useState('Shares');
    const [reviewTransactionDropDown, setReviewTransactionDropDown] = useState(false);
    const [buySell, setBuySell] = useState(true);
    const [cashBalance, setCashBalance] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const ref = useRef(null);


    const userId = useSelector(state => state.session.user.id);
    const portfolioInfo = useSelector(state => {
        const portfolio = Object.values(state.portfolio);
        return portfolio[0];
    })

    const transactions = useSelector(state => {
        const trans = Object.values(state.transaction);
        return trans;
    })

    const allLists = useSelector(state => {
        const lists = Object.values(state.watchlist)
        return lists
    })

    const defaultWatchlist = useSelector(state => {
        const stocks = Object.values(state.list)
        return stocks;
    })

    useEffect(() => {
        dispatch(loadPortfolio(userId))
    }, [dispatch])

    useEffect(() => {
        dispatch(loadTransactions(userId))
    }, [dispatch])

    useEffect(() => {
        dispatch(loadStocksList(1))
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

    useEffect(() => {
        dispatch(loadAllList(userId))
    }, [dispatch])


    if (!portfolioInfo) return null;
    if (!refresh && cashBalance === 0) {
        setCashBalance(portfolioInfo.cash_balance);
        setRefresh(true);
    }

    const stockSymbol = symbol.toUpperCase();

    const orderPrice = parseInt(price.toFixed(2));
    let orderType;
    const estimatedPrice = orderPrice * shares;

    const stockBuys = transactions.filter((transaction) => transaction.stock_id.ticker === stockSymbol && transaction.order_type === 1).map((el => el.order_volume));
    const stockSells = transactions.filter((transaction) => transaction.stock_id.ticker === stockSymbol && transaction.order_type === 2).map((el => el.order_volume));

    const buyVol = stockBuys.reduce(function (a, b) {
        return a + b;
    }, 0);

    const sellVol = stockSells.reduce(function (a, b) {
        return a + b;
    }, 0);

    let sharesOwned = buyVol - sellVol;

    // checks to see if stock is already in owned list
    const ifExists = defaultWatchlist.filter((el => el.watchlist_id === 1 && el.stock_id === stockId))

    const handleTransactionSubmit = (e) => {
        e.preventDefault();
        let orderVolume = parseInt(shares);

        let newBal;
        if (buySell === true) {
            let watchlistOne = 1;
            orderType = 1;
            newBal = cashBalance - estimatedPrice;
            dispatch(updateCashBalance({ userId, newBal }));
            setCashBalance(newBal);

            if (ifExists.length === 0) {
                dispatch(addOneStock({ watchlistOne, stockId }))
            }

        } else {
            orderType = 2;
            newBal = cashBalance + estimatedPrice;
            dispatch(updateCashBalance({ userId, newBal }));
            setCashBalance(newBal);
        }

        dispatch(buyStock({ userId, stockId, orderPrice, orderVolume, orderType }));
        setReviewTransactionDropDown(false);
        setShares(0);
        setBuySell(true);
        let input = document.querySelector(".bs-share-input");
        input.value = '';
        // console.log("userId:", userId, "stockId:", stockId, "orderPrice:", orderPrice, "orderVolume:", orderVolume, "orderType:", orderType)

    }

    const handleReviewTransaction = () => {
        setReviewTransactionDropDown(true);
    }

    const userWatchlists = allLists.map((list => list.name))
    userWatchlists.shift()
    console.log("userWatchlists", userWatchlists)

    const handleAddToLists = (e) => {
        e.preventDefault();
        userWatchlists.forEach((watchlist => {
            let curr = document.getElementById(`${watchlist}`)
            let isChecked = curr.checked
            if (isChecked) {
                let watchlistOne = parseInt(curr.value)
                dispatch(addOneStock({ watchlistOne, stockId }))
                // console.log("watchlistId:", watchlistOne, "stockId", stockId)
            }
            // console.log("checked", curr.checked)
            // console.log("curr", curr)
        }))
    }

    return (
        <>
            <div className="buy-sell-container">
                <div className="buy-sell-header bold">
                    <span className={(buySell ? 'atv-header' : '') + (!buySell && reviewTransactionDropDown ? 'hidden' : '')}
                        onClick={() => {
                            setBuySell(true)
                            setReviewTransactionDropDown(false)
                        }
                        }>Buy {stockSymbol}</span>

                    {sharesOwned != 0 &&
                        <span className={(buySell === false ? 'atv-header' : '') + (buySell && reviewTransactionDropDown ? 'hidden' : '')}
                            onClick={() => {
                                setBuySell(false)
                                setReviewTransactionDropDown(false)
                            }
                            }>Sell {stockSymbol}</span>
                    }
                    {reviewTransactionDropDown === false &&
                        < button className="down-arrow-btn">
                            <i className="fas fa-chevron-down"></i>
                        </button>
                    }
                    {reviewTransactionDropDown === true &&
                        < button className="down-arrow-btn">
                            <i className="fas fa-lock"></i>
                        </button>
                    }
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
                                        max={shares > 0 ? shares : 1000000}
                                        placeholder="0"
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
                                >
                                    <span style={{ color: '#00c805' }}>
                                        Market Price
                                        <i className="far fa-question-circle"></i>
                                    </span>
                                    <span>${orderPrice}</span>

                                </div>
                                <div className="bs-form-inputs bold">
                                    <span>Estimated {buySell ? "Cost" : "Credit"}</span>
                                    <span>${(estimatedPrice).toFixed(2)}</span>
                                </div>

                                {reviewTransactionDropDown && shares > 0 &&
                                    <>
                                        {buySell === true &&
                                            <>
                                                <p>You are placing a good for day market order to buy {shares} {parseInt(shares) === 1 ? "share" : "shares"}  of {stockSymbol}.</p>
                                                <footer className="review-transaction-buy-edit">
                                                    <button className="review-transaction-buy-btn rtbe-btn bold" type="submit">{buySell ? "Buy" : "Sell"} </button>
                                                    <button className="review-transaction-edit-btn rtbe-btn bold" type="button" onClick={() => setReviewTransactionDropDown(false)}>Edit</button>

                                                </footer>
                                            </>
                                        }

                                        {buySell === false && shares <= sharesOwned &&
                                            <>
                                                <p>You are placing a good for day market order to sell {shares} {parseInt(shares) === 1 ? "share" : "shares"}  of {stockSymbol}.</p>
                                                <footer className="review-transaction-buy-edit">
                                                    <button className="review-transaction-buy-btn rtbe-btn bold" type="submit">{buySell ? "Buy" : "Sell"} </button>
                                                    <button className="review-transaction-edit-btn rtbe-btn bold" type="button" onClick={() => setReviewTransactionDropDown(false)}>Edit</button>

                                                </footer>
                                            </>
                                        }

                                    </>

                                }
                                {reviewTransactionDropDown && shares > 0 && shares > sharesOwned && buySell === false &&
                                    <>
                                        <span className="bold">
                                            <i className="fas fa-exclamation-circle"></i>
                                            {" " + "Not Enough Shares"}
                                        </span>
                                        <p>
                                            You can only sell up to {sharesOwned} shares of {stockSymbol}.
                                        </p>
                                        <button type="button" className="bs-submit-btn bold" onClick={() => setReviewTransactionDropDown(false)}>
                                            Back
                                        </button>
                                    </>
                                }


                                {reviewTransactionDropDown && shares <= 0 &&
                                    <>
                                        <span className="bold">
                                            <i className="fas fa-exclamation-circle"></i>
                                            {" " + "Error"}
                                        </span>
                                        <p>Please enter a valid number of shares.</p>
                                        <button type="button" className="bs-submit-btn bold" onClick={() => setReviewTransactionDropDown(false)}>
                                            Back
                                        </button>
                                    </>
                                }

                                <button className={"bs-submit-btn bold " + (reviewTransactionDropDown && shares > 0 || reviewTransactionDropDown && shares <= 0 || reviewTransactionDropDown && shares > 0 && shares > sharesOwned && buySell === false ? 'hidden' : '')} type="button" onClick={handleReviewTransaction}>
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
                        </button>
                        {isVisible &&
                            <div className="add-to-list-div" ref={ref}>
                                <div id="add-to-lists-container">

                                    <form className="add-to-list-form" id="add-stock-to-list" onSubmit={handleAddToLists}>
                                        <button id="close-add-div" onClick={() => setIsVisible(!isVisible)}> X </button>
                                        <h2>Add {stockSymbol} to Your Lists</h2>
                                        {allLists && allLists.map((list) => {
                                            return (
                                                <>
                                                    <div className='list-text-container-2'>
                                                        {/* {console.log(list)} */}
                                                        <input
                                                            type="checkbox"
                                                            className="add-to-list-input"
                                                            name="list-input"
                                                            id={list.name}
                                                            value={list.id}
                                                        >
                                                        </input>
                                                        <i className="fa fa-building check-symbol-2" aria-hidden="true"></i>
                                                        <label htmlFor="list-input" className='single-list-txt-2'>{list.name}</label>
                                                    </div>
                                                </>
                                            )
                                        })}
                                    </form>

                                </div>
                                <button type="submit" form="add-stock-to-list">Save</button>
                            </div>
                        }
                    </div>
                </div>

            </div>
        </>
    )
}

export default BuySellStock;