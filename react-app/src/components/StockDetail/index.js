import "./StockDetail.css";
import NavBar from "../NavBar/index";
import StockChart from "../StockChart/index";
import NewsStory from "../News/index";
import BuySellStock from '../BuySellStock';
import * as stockReducer from '../../store/stock'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useEffect, useState } from "react";


function StockDetail() {
    const dispatch = useDispatch();
    const ticker = useParams();
    const symbol = ticker['ticker']
    const [dateRange, setDateRange] = useState('1d')
    const setDate = (e) => setDateRange(e.target.value)

    const stock = useSelector(state => state.stock.currentStock)

    useEffect(()=> {
        dispatch(stockReducer.getStockCompany(symbol))
    }, [dispatch, symbol])

    if(!stock) {
        return null
    }

    function nFormatter(num, digits) {
        var si = [
          { value: 1, symbol: "" },
          { value: 1E3, symbol: "k" },
          { value: 1E6, symbol: "M" },
          { value: 1E9, symbol: "B" },
          { value: 1E12, symbol: "T" },
          { value: 1E15, symbol: "P" },
          { value: 1E18, symbol: "E" }
        ];
        var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
        var i;
        for (i = si.length - 1; i > 0; i--) {
          if (num >= si[i].value) {
            break;
          }
        }
        return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
    }

    const companyInfo = stock[symbol]['company_info']
    const companyStatistics = stock[symbol]['company_statistics']
    const news = stock[symbol]['company_news']
    const history = stock[symbol]['price_history']

    return(
        <>
            <NavBar />
            <div className="detail-page__wrapper">
                <div className="stock-wrapper">
                    <div className="info-container">
                        <div id="stock-name">{companyInfo.company_name}</div>
                        <div id="curr-price">${(companyInfo.price).toFixed(2)}</div>
                        <div id="price-change">{(companyInfo.change).toFixed(2)}({((companyInfo.priceChange)*100).toFixed(2)})%</div>
                    </div>

                    <div className="chart-container">
                        <StockChart dateRange={dateRange} symbol={symbol} history={history}/>
                        <div className="stock-chart-bar">
                            {/* <button onClick={setDate} value={'1d'} className="stock-timeline-options btn tlbtn">1D</button>
                            <button onClick={setDate} value={'5d'} className="stock-timeline-options btn tlbtn">1W</button>
                            <button onClick={setDate} value={'1m'} className="stock-timeline-options btn tlbtn">1M</button>
                            <button onClick={setDate} value={'3m'} className="stock-timeline-options btn tlbtn">3M</button>
                            <button onClick={setDate} value={'1y'} className="stock-timeline-options btn tlbtn">1Y</button>
                            <button onClick={setDate} value={'5y'} className="stock-timeline-options btn tlbtn">5Y</button> */}

                            <button onClick={setDate} value={'1d'} className="stock-timeline-options btn tlbtn">1D</button>
                            <button onClick={setDate} value={'2d'} className="stock-timeline-options btn tlbtn">1W</button>
                            <button onClick={setDate} value={'3d'} className="stock-timeline-options btn tlbtn">1M</button>
                            <button onClick={setDate} value={'4d'} className="stock-timeline-options btn tlbtn">3M</button>
                            <button onClick={setDate} value={'5d'} className="stock-timeline-options btn tlbtn">1Y</button>
                            <button onClick={setDate} value={'5d'} className="stock-timeline-options btn tlbtn">5Y</button>

                        </div>
                    </div>

                    <div className="about-container">
                        <div id="about-title">About</div>
                        {/* <hr id="hr"></hr> */}
                        <div id="description">
                            {companyInfo.description}
                        </div>
                        <div className="company-info-container">
                            <div>
                                <div className="info-label">CEO</div>
                                <div>{companyInfo.ceo}</div>
                            </div>
                            <div>
                                <div className="info-label">Employees</div>
                                <div>{companyInfo.employees}</div>
                            </div>
                            <div>
                                <div className="info-label">Headquarters</div>
                                <div>{companyInfo.headquarters}</div>
                            </div>
                        </div>
                    </div>

                    <div className="statistics-container">
                        <div id="statistics-title">Key Statistics</div>
                        <div id="statistics">
                            <div>
                                <div className="info-label">Market Cap</div>
                                <div>{nFormatter((companyStatistics.market_cap),3)}</div>
                            </div>
                            <div>
                                <div className="info-label">Price-Earnings Ratio</div>
                                <div>{nFormatter((companyStatistics.pe_ratio),2) }</div>
                            </div>
                            <div>
                                <div className="info-label">Dividend Yield</div>
                                <div>{(companyStatistics.div_yield).toFixed(4)*100}</div>
                            </div>
                            <div>
                                <div className="info-label">Average Volume</div>
                                <div>{nFormatter((companyStatistics.avg_volume),3)}</div>
                            </div>
                        </div>
                    </div>

                    <NewsStory news={news} symbol={symbol}/>
                </div>

                <div className="buy-sell__wrapper">
                    <BuySellStock symbol={symbol} price={companyInfo.price} />
                </div>
            </div>
            {/* <button onClick={handleClick}>
                testing
            </button> */}
        </>
    )
}


export default StockDetail;
