import React, { useState } from 'react';
import Portfolio from '../Portfolio';
import Watchlist from '../Watchlist'
import './Dashboard.css';


function Dashboard() {

	return (
		<>
			<div className="dashboard-container__wrapper">
				{/* <h1>Hello Dashboard</h1> */}
				<div className="dashboard__portfolio-wrapper">

					<Portfolio />

				</div>
				<div className="dashboard__watchlist-wrapper">
					<Watchlist />
				</div>

			</div>
		</>
	)
}

export default Dashboard;