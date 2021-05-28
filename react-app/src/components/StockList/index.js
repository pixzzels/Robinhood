import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadStocksList } from '../../store/list';
import { loadTransactions } from '../../store/transaction';


import './StockList.css'

function StockList() {
    const dispatch = useDispatch();

    const transactions = useSelector(state => {
        const trans = Object.values(state.transaction)
        return trans;
    })

    const stocks = useSelector(state => {
        const stocks = Object.values(state.list)
        return stocks;
    })

    const userId = useSelector(state => state.session.user.id)

    
    const watchlistId = 1;
    
    useEffect(() => {
        dispatch(loadStocksList(watchlistId))
    }, [useDispatch])

    useEffect(() => {
        dispatch(loadTransactions(userId))
    }, [dispatch])


    // an array of stocks owned by stock id
    const stocksArray = stocks.map((stock => stock.stock_id))

    const stocksOwned = {}

    transactions.forEach((transaction => {
        stocksOwned[transaction.stock_id] = transaction
    }))
    
    console.log("stocksOwned", stocksOwned)
    console.log("transactions", transactions)




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