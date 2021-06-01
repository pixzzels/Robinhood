import '../News/News.css'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as stockReducer from '../../store/stock'

function DashNews() {
    const dispatch = useDispatch();
	const newsStories = useSelector(state => state.stock.dashNews)

	useEffect(() => {
		dispatch(stockReducer.getDashNews())
	}, [])

    if(!newsStories) {
        return null
    }

    let stories = newsStories['news']

    return(
        <>
            <div id="news-title">News</div>
            {stories.map((story) => {
                return (
                    <div className="news-container" key={Math.random()}>
                        <a href={story.url} target="_blank">
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

export default DashNews;
