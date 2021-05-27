
//Action Verbs

const SET_STOCK = 'stock/setStock'



//Action Creater

const setStocks = (stock) => {
    return {
        type: SET_STOCK,
        stock
    }
}


//Thunk
export const getStockCompany = (symbol) => async (dispatch) => {
    // console.log(symbol)
    const response = await fetch(`/api/stock/companyinfo/${symbol}`)
    if(response.ok) {
        const companyInfo = await response.json();
        // console.log(companyInfo)
        dispatch(setStocks(companyInfo))
    }
}



// Reducer
const initialState = {};

const stockReducer = (state = initialState, action) => {
    let newerState;
    switch (action.type) {
        case SET_STOCK:
            console.log(action.stock)
            newerState = { ... state }
            newerState.currentStock = action.stock
            console.log('newState', newerState)

            return newerState

        default:
            return state;
    }
};

export default stockReducer;
