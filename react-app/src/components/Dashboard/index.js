import React, { useState } from 'react';
import Portfolio from '../Portfolio';
import Watchlist from '../Watchlist'
import NavBar from "../NavBar/index";
import './Dashboard.css';


function Dashboard() {

	return (
		<>
			<NavBar />
			<div className="dashboard-container__wrapper">

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