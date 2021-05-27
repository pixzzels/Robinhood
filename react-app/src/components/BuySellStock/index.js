import React, { useState } from 'react'
import './BuySellStock.css'

function BuySellStock() {

    const [shares, setShares] = useState(0)

    const marketPrice = 143.13;

    const buyingPower = 3034.76;

    // const shares = 2

    const estimatedPrice = marketPrice * shares

    return (
        <>
            <div className="buy-sell-container">
                <div className="buy-sell-header bold">
                    <span>Buy APPL</span>
                    <span>Sell APPL</span>
                    <button className="down-arrow-btn">
                        <i className="fas fa-chevron-down"></i>
                    </button>
                </div>
                <div className="buy-sell-content">
                    <form className="buy-sell-form">
                        <div className="bs-form-inputs">
                            <label htmlFor="invest-options">Invest In</label>
                            <select className="bs-share-select" name="invest-options">
                                <option>Shares</option>
                                <option>Dollars</option>
                            </select>
                        </div>
                        <div className="bs-form-inputs">
                            <label htmlFor="shares">Shares</label>
                            <input
                                className="bs-share-input"
                                type="number"
                                placeholder="0"
                                // value={(e)=> e.target.value}
                                onChange={(e) => setShares(e.target.value)}

                            >
                            </input>
                        </div>
                        <div className="bs-form-inputs underline">
                            <span>Market Price</span>
                            <span>${marketPrice}</span>
                        </div>
                        <div className="bs-form-inputs bold">
                            <span>Estimated Cost</span>
                            <span>${estimatedPrice}</span>
                        </div>
                        <button className="bs-submit-btn" type="submit">
                            Review Order
                        </button>
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