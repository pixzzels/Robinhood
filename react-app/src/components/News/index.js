import './News.css';
import news from "../../images/news.jpg";

function NewsStory({news, symbol}) {
    return(
        <div className="news-container">
            <div id="news-title">News</div>
            <a href="story-link-here" target="_blank">
                <div className="news-story">
                    <div className="story-info">
                        <div id="story-origin">Origin</div>
                        <div id="story-title">Story Title</div>
                        <div id="story-content">An Apple Store Employee shows the series 5 apple watch during the something with the presentation time cook is the man I love him so much I mean how can you not so yaaaaaa </div>
                    </div>
                    <div id="story-image">
                        <img src={news} id="story-img"></img>
                    </div>
                </div>
            </a>
        </div>
    )
}

export default NewsStory;
