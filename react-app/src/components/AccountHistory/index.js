import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadTransactions } from '../../store/transaction';



import './AccountHistory.css'

function AccountHistory() {

    const dispatch = useDispatch();

    const userId = useSelector(state => state.session.user.id)
    const transactions = useSelector(state => {
        const trans = Object.values(state.transaction)
        return trans.reverse();
    })

    console.log(transactions)

    useEffect(() => {
        dispatch(loadTransactions(userId))
    }, [dispatch])

    return (
        <>
            <div className="history-wrapper">


                <div className="history-info-wrapper">
                    <h2>Recent</h2>
                    {transactions.map((transaction) => {
                        return (
                            <div className="transaction-wrapper">
                                <div className="transaction-content-1 bold">
                                    <div>
                                        {transaction.order_type === 1 ? transaction.stock_id.name + " Market Buy" : transaction.stock_id.name + " Market Sell"}
                                        {/* {transaction.stock_id.name} */}
                                    </div>
                                </div>
                                <div className="transaction-content-2 bold">
                                    <div>
                                        {"$" + (transaction.order_price * transaction.order_volume).toFixed(2)}
                                    </div>
                                </div>
                                <div className="transaction-content-3">
                                    <div>
                                        {(transaction.time_created).slice(0, -13)}
                                    </div>
                                </div>
                                <div className="transaction-content-4">
                                    <div>
                                        {transaction.order_volume + " shares at " + "$" + transaction.order_price.toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="history-filter-container">
                    <h4>Filter</h4>
                    <div className="history-filter-wrapper">
                        <div id="history-filter-orders">Orders</div>
                        <div id="history-filter-rewards">Rewards</div>
                        <div id="history-filter-transfers">Transfers</div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default AccountHistory;