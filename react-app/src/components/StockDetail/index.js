import "./StockDetail.css";
import NavBar from "../NavBar/index";

function StockDetail() {

    const handleClick = async () => {
            await fetch('/api/stock/history/AAPL')

        }

    return(
        <>
            <NavBar />

            <div className="stock-wrapper">
                <div className="info-container">
                    <div>Apple</div>
                    <div>Current Price</div>
                    <div>Price Change</div>
                </div>

                <div className="chart-container">
                    <div>Chart</div>
                    <div>Days of Week / Years</div>
                </div>

                <div className="about-container">
                    <div>About</div>
                    <div id="description">
                        Company Description
                    </div>
                    <div id="company-info">CEO, Employees....</div>
                </div>

                <div className="statistics-container">
                    <div id="statistics-title">Key Statistics</div>
                    <div id="statistics">Market Cap, Price-Earnings Ratio etc</div>
                </div>

                <button onClick={handleClick}>
                    Testing
                </button>



            </div>
        </>
    )
}


export default StockDetail;
