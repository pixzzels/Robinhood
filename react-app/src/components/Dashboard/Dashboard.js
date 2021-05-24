import React, { useState } from 'react';
import ReactDOM from "react-dom";
import { Collapse } from "reactstrap";


import './Dashboard.css';


function Dashboard() {
    const [listForm, setListForm] = useState(false);
    const [newList, setNewList] = useState('');

    const addList = () => {
        setListForm(!listForm)
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
                            <button className="portfolio-timeline-options btn">1D</button>
                            <button className="portfolio-timeline-options btn">1W</button>
                            <button className="portfolio-timeline-options btn">1M</button>
                            <button className="portfolio-timeline-options btn">1Y</button>
                            <button className="portfolio-timeline-options btn">ALL</button>

                        </div>
                        <div className="buying-power">
                            <span>Buying Power</span>
                            <span>$3034.76</span>
                        </div>
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