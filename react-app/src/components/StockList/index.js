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

    console.log("stocks", stocks)


    const userId = useSelector(state => state.session.user.id)


    const watchlistId = 1;

    useEffect(() => {
        dispatch(loadStocksList(watchlistId))
    }, [useDispatch])

    useEffect(() => {
        dispatch(loadTransactions(userId))
    }, [dispatch])


    // an array of stocks owned by stock id
    // const stocksArray = stocks.map((stock => stock.stock_id))
    // console.log('stocksArray', stocksArray)


    // create an object with the stock id as key, 
    // and the number of shares owned as it's value
    const stocksOwned = {}

    transactions.forEach((transaction => {
        if (!stocksOwned[transaction.stock_id.id]) {
            stocksOwned[transaction.stock_id.id] = transaction.order_volume
        } else {
            if (transaction.order_type === 1) {
                stocksOwned[transaction.stock_id.id] += transaction.order_volume
            }
        }
    }))


    console.log("stocksOwned", stocksOwned)
    console.log("transactions", transactions)

    return (
        <>
            {stocks.map((stock) => {
                { console.log("stockinside", stock) }
                return (

                    <>
                        <div className="all-stock__stock">
                            <div className="stock-name-shares-owned">
                                <span>{stock.stock.name}</span>
                                <span>{stocksOwned[stock.stock.id]} Shares</span>
                            </div>
                            {/* <div className="all-stock__graph-container"></div> */}
                            <div className="all-stock_current-price">
                                <span>{"$" + stock.stock.market_price}</span>
                                {/* <span>-3.29%</span> */}
                            </div>
                        </div>
                    </>
                )
            })
            }
        </>
    )
}

export default StockList;