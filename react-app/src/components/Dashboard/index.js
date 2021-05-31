import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Portfolio from '../Portfolio';
import Watchlist from '../Watchlist'
import * as stockReducer from '../../store/stock'
import './Dashboard.css';


function Dashboard() {

	// const handleClick = async () => {
    //     await fetch('/api/dashboard/stockinfo', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type':'application/json'
    //         },
    //         body: JSON.stringify({
    //             stock: ['SNAP', 'AAPL', 'TWTR']
    //         }),
    //     })
    // }

	const userId = useSelector(state => state.session.user.id)
	// console.log(userId, 'user')

	const handleClick = async () => {
        await fetch(`/api/dashboard/stockinfo/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                stock: ['SNAP', 'AAPL', 'TWTR']
            }),
        })
    }

	useEffect(() => {
		get_portfolio()
	})

	const portfolioPerformance = async function get_portfolio () {
		const response = await fetch(`/api/dashboard/stockinfo/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                stock: ['SNAP', 'AAPL', 'TWTR']
            }),
        })
		return await response.json()
	}




	return (
		<>
			{/* <NavBar /> */}
			<div className="dashboard-container__wrapper">

				<div className="dashboard__portfolio-wrapper">
					<Portfolio portfolioPerformance={portfolioPerformance}/>
				</div>

				<div className="dashboard__watchlist-wrapper">
					<Watchlist />
				</div>

			</div>
			<button onClick={handleClick}>
				testing
			</button>
		</>
	)
}

export default Dashboard;
