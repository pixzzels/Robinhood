
//Action Verbs

const SET_STOCK = 'stock/setStock'
const SET_PORTFOLIO = 'stock/setPortfolio'
const SET_DASH_NEWS = 'dash/setDashNews'


//Action Creater

const setStocks = (stock) => {
    return {
        type: SET_STOCK,
        stock
    }
}

const setPortfolio = (stockInfo) => {
    return {
        type: SET_PORTFOLIO,
        stockInfo
    }
}

const setDashNews = (newsInfo) => {
    return {
        type: SET_DASH_NEWS,
        newsInfo
    }
}


//Thunk
export const getStockCompany = (symbol) => async (dispatch) => {
    const response = await fetch(`/api/stock/companyinfo/${symbol}`)
    if(response.ok) {
        const companyInfo = await response.json();
        dispatch(setStocks(companyInfo))
    }
}

export const getPortfolioStocks = (userId) => async (dispatch) => {
    const response = await fetch(`/api/dashboard/stockinfo/${userId}`)
    if(response.ok) {
        const portfolioPerformance = await response.json()
        dispatch(setPortfolio(portfolioPerformance))
    }
}

export const getDashNews = () => async (dispatch) => {
    const response = await fetch(`/api/dashboard/stocknews`)
    if(response.ok) {
        const dashNews = await response.json()
        dispatch(setDashNews(dashNews))
    }
}



// Reducer
const initialState = {};

const stockReducer = (state = initialState, action) => {
    let newerState;
    switch (action.type) {
        case SET_STOCK:
            newerState = { ... state }
            newerState.currentStock = action.stock

            return newerState
        case SET_PORTFOLIO:
            newerState = { ...state }
            newerState.portfolioInfo = action.stockInfo

            return newerState
        case SET_DASH_NEWS:
            newerState = { ...state }
            newerState.dashNews = action.newsInfo
            
            return newerState
        default:
            return state;
    }
};

export default stockReducer;
