import React, { useState } from 'react';
import Portfolio from '../Portfolio';
import Watchlist from '../Watchlist'
import NavBar from "../NavBar/index";
import './Dashboard.css';


function Dashboard() {

	return (
		<>
			<NavBar />
			<div className="dashboard-container">
				{/* <h1>Hello Dashboard</h1> */}
				<div className="div-row">

					<Portfolio />
					<Watchlist />

				</div>
			</div>
			<button>Testing Here</button>
		</>
	)
}

export default Dashboard;