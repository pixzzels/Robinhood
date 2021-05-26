import './News.css';

function NewsStory() {
    return(
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
    )
}

export default NewsStory;