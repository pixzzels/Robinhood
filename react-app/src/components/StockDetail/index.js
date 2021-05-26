import "./StockDetail.css";
import NavBar from "../NavBar/index";
import StockChart from "../StockChart/index";

function StockDetail() {
    return(
        <>
            <NavBar />
            <div className="detail-page__wrapper">
                <div className="stock-wrapper">
                    <div className="info-container">
                        <div id="stock-name">Apple</div>
                        <div id="curr-price">$122.45</div>
                        <div id="price-change">Price Change</div>
                    </div>

                    <div className="chart-container">
                        <StockChart />
                        <div className="stock-chart-bar">
                            <button className="stock-timeline-options btn tlbtn">2D</button>
                            <button className="stock-timeline-options btn tlbtn">1W</button>
                            <button className="stock-timeline-options btn tlbtn">1M</button>
                            <button className="stock-timeline-options btn tlbtn">3M</button>
                            <button className="stock-timeline-options btn tlbtn">1Y</button>
                            <button className="stock-timeline-options btn tlbtn">5Y</button>
                        </div>
                    </div>

                    <hr id="hr"></hr>
                        
                    <div className="about-container">
                        <div id="about">About</div>
                        <hr id="hr"></hr>
                        <div id="description">
                            Company Description
                        </div>
                        <div id="company-info">CEO, Employees....</div>
                    </div>

                    <div className="statistics-container">
                        <div id="statistics-title">Key Statistics</div>
                        <div id="statistics">Market Cap, Price-Earnings Ratio etc</div>
                    </div>
                </div>

                <div className="buy-sell__wrapper">
                    BUY N SELL GOES HERE
                </div>
            </div>
        </>
    )
}


export default StockDetail;