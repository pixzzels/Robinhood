import React, { useState, useEffect } from 'react';

import './StockList.css'

function StockList() {
    return (
        <>
            <div className="all-stock__stock">
                <div className="stock-name-shares-owned">
                    <span>APPL</span>
                    <span>3 Shares</span>
                </div>
                <div className="all-stock__graph-container">:)</div>
                <div className="all-stock_current-price">
                    <span>$127.02</span>
                    <span>-3.29%</span>
                </div>
            </div>
        </>
    )
}

export default StockList;