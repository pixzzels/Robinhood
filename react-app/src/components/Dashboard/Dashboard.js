import React, { useState } from 'react';
import ReactDOM from "react-dom";
import { Collapse } from "reactstrap";
import { Modal } from '../../context/Modal';


import './Dashboard.css';


function Dashboard() {
    const [listForm, setListForm] = useState(false);
    const [newList, setNewList] = useState('');
    const [bpDivExpand, setbpDivExpand] = useState(false);
    const [fundsForm, setFundsForm] = useState(false);
    const [showDepositModal, setShowDepositModal] = useState(false);

    const addList = () => {
        setListForm(!listForm)
    }

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
        <>
            <div className="dashboard-container">
                {/* <h1>Hello Dashboard</h1> */}
                <div className="div-row">


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
                                        (<Modal onClose={() => setShowDepositModal(false)}>
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

                    <div className="watchlist-container">
                        <div className="all-stocks-container">

                            <div className="all-stocks-header">
                                <span>Stocks</span>
                                <button className="all-stocks-header-btn btn">
                                    <svg fill="none" height="24" role="img" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.5 10.5H3.5V13.5H6.5V10.5Z" fill="grey"></path>
                                        <path d="M13.5 10.5H10.5V13.5H13.5V10.5Z" fill="grey"></path>
                                        <path d="M17.5 10.5H20.5V13.5H17.5V10.5Z" fill="grey"></path>
                                    </svg>
                                </button>
                            </div>

                            <div className="all-stock__stock">
                                <div className="stock-name-shares-owned">
                                    <span>APPL</span>
                                    <span>3 Shares</span>
                                </div>
                                <div className="all-stock__graph-container">
                                    :)
                                </div>
                                <div className="all-stock_current-price">
                                    <span>$127.02</span>
                                    <span>-3.29%</span>
                                </div>
                            </div>

                            <div className="all-stocks__list-container">

                                <div className="all-stocks__list-header">
                                    <span>Lists</span>
                                    <button className="btn" type="button" onClick={addList}>
                                        <svg fill="none" height="16" role="img" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.125 8.875V14H8.875V8.875H14V7.125H8.875V2H7.125V7.125H2V8.875H7.125Z" fill="black"></path>
                                        </svg>
                                    </button>
                                </div>

                                <div className="all-stocks__list-each">
                                    {listForm &&
                                        <form className="new-list-form">

                                            <input
                                                className="new-list-input"
                                                name='list'
                                                placeholder="List Name"
                                                value={newList}
                                                onChange={e => setNewList(e.target.value)}
                                            >
                                            </input>
                                            <footer>
                                                <button className="list-form-btn" type="button">
                                                    Cancel
                                                </button>
                                                <button className="list-form-btn" type="submit">
                                                    Create List
                                                </button>

                                            </footer>
                                        </form>

                                    }

                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
            <button>
                Testing Here
            </button>
        </>
    )
}

export default Dashboard;