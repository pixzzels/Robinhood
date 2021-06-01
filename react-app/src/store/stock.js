
//Action Verbs

const SET_STOCK = 'stock/setStock'
const SET_PORTFOLIO = 'stock/setPortfolio'


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
        default:
            return state;
    }
};

export default stockReducer;
