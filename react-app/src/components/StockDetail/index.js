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
                            Apple, Inc. engages in the design, manufacture, and sale of smartphones, personal computers, tablets, wearables and accessories, and other variety of related services. It operates through the following geographical segments: Americas, Europe, Greater China, Japan, and Rest of Asia Pacific. 
                        </div>
                        <div className="company-info-container">
                            <div>
                                <div className="info-label">CEO</div>
                                <div>Timothy Donald Cook</div>
                            </div>
                            <div>
                                <div className="info-label">Employees</div>
                                <div>147,000</div>
                            </div>
                            <div>
                                <div className="info-label">Headquarters</div>
                                <div>Cupertino, California</div>
                            </div>
                        </div>
                    </div>

                    <div className="statistics-container">
                        <div id="statistics-title">Key Statistics</div>
                        <hr id="hr"></hr>
                        <div id="statistics">
                            <div>
                                <div className="info-label">Market Cap</div>
                                <div>2.14T</div>
                            </div>
                            <div>
                                <div className="info-label">Price-Earnings Ratio</div>
                                <div>28.48</div>
                            </div>
                            <div>
                                <div className="info-label">Dividend Yield</div>
                                <div>0.65</div>
                            </div>
                            <div>
                                <div className="info-label">Average Volume</div>
                                <div>94.75M</div>
                            </div>
                        </div>
                    </div>

                    <div className="news-container">
                        <div id="news-title">News</div>
                        <hr id="hr"></hr>
                        <a href="story-link-here">
                            <div className="news-story">
                                <div id="story-origin">Origin</div>
                                <div id="story-title">Story Title</div>
                                <div id="story-content">An Apple Store Employee...</div>
                                <div id="story-image">
                                    <img src="" id="story-img"></img>
                                </div>
                            </div>
                        </a>
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