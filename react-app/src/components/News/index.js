import './News.css';

function NewsStory({news, symbol}) {
    let stories = news[symbol];

    return(
        <>
            <div id="news-title">News</div>
            {stories.map((story) => {
                return (
                    <div className="news-container" key={Math.random()}>
                        <a href={story.url} rel="noopener noreferrer" target="_blank">
                            <div className="news-story">
                                <div className="story-info">
                                    <div id="story-origin">{story.source}</div>
                                    <div id="story-title">{story.headline}</div>
                                    <div id="story-content">{story.summary.slice(0, 140)}...</div>
                                </div>
                                <div id="story-image">
                                    <img src={story.image} id="story-img"></img>
                                </div>
                            </div>
                        </a>
                    </div>
                )
            })
            }
        </>
    )
}

export default NewsStory;
