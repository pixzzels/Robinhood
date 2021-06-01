import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
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

    const stocksOwned = {}

    transactions.forEach((transaction => {
        if (!stocksOwned[transaction.stock_id.id]) {
            stocksOwned[transaction.stock_id.id] = transaction.order_volume
        } else {
            if (transaction.order_type === 1) {
                stocksOwned[transaction.stock_id.id] += transaction.order_volume
            }
            else if (transaction.order_type === 2) {
                stocksOwned[transaction.stock_id.id] -= transaction.order_volume
            }
        }
    }))

    return (
        <>
            {stocks.map((stock) => {
                return (
                    <>
                        {/* only display stocks that are owned by the user */}
                        {stocksOwned[stock.stock.id] != undefined && stocksOwned[stock.stock.id] != 0 &&
                            <NavLink className="navlink-stock-owned" to={`/stocks/${stock.stock.ticker}`}>
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
                            </NavLink>
                        }
                    </>
                )
            })
            }
        </>
    )
}

export default StockList;
