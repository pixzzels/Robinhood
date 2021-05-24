import React from 'react';

import './Dashboard.css';


function Dashboard() {
    return (
        <>
            <div className="dashboard-container">
                {/* <h1>Hello Dashboard</h1> */}
                <div className="portfolio-container">
                    <div className="total-investment">
                        $400.34
                </div>
                </div>
                <div className="watchlist-container">
                </div>
            </div>
            <button>
                Testing Here
            </button>
        </>
    )
}

export default Dashboard;