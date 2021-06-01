import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Portfolio from '../Portfolio';
import Watchlist from '../Watchlist'
import * as stockReducer from '../../store/stock'
import './Dashboard.css';
import DashNews from '../DashNews/index'



function Dashboard() {



	return (
		<>
			{/* <NavBar /> */}
			<div className="dashboard-container__wrapper">

				<div className="dashboard__portfolio-wrapper">
					<Portfolio/>
				</div>

				<div className="dashboard__watchlist-wrapper">
					<Watchlist />
				</div>
				<div>
					<DashNews />
				</div>

			</div>
			{/* <button onClick={handleClick}>
				testing
			</button> */}
		</>
	)
}

export default Dashboard;
