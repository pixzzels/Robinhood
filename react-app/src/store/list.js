/* -----action verbs-------------------------------------------------- */
const LOAD_LIST = "list/LOAD_LIST";
const ADD_ONE = "list/ADD_ONE";
const LOAD_ALL = "list/LOAD_ALL";


/* -----action creator-------------------------------------------------- */

const loadList = (list) => ({
    type: LOAD_LIST,
    list
})

const addOneList = (list) => ({
    type: ADD_ONE,
    list
})

const loadAll = (list) => ({
    type: LOAD_ALL,
    list
})

/* -----thunk-------------------------------------------------- */



// GET
export const loadStocksList = (watchlistId) => async (dispatch) => {

    const response = await fetch(`/api/list/${watchlistId}`, {
        headers: { 'Content-Type': 'application/json' }
    })

    if (!response.ok) {
        throw response
    }

    const data = await response.json();

    dispatch(loadList(data));
    return data;
}


export const addOneStock = (stockInfo) => async (dispatch) => {
    const {watchlistOne, stockId} = stockInfo;

    const response = await fetch(`/api/list/add-default`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            watchlist_id: watchlistOne,
            stock_id: stockId,
        })
    })

    if (!response.ok) {
        throw response
    }

    const data = await response.json();
    dispatch(addOneList(data));
    return data;
}


/* -----reducer-------------------------------------------------- */
const initialState = {};

const listReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_LIST: {
            newState = {}
            action.list.forEach((oneList) => {
                newState[oneList.id] = oneList
            })
            return {
                ...newState, ...state
            }
        }

        case ADD_ONE: {
            newState = {
                ...state,
                [action.list.id]: action.list
            };
            return newState;
        }

        default:
            return state;
    }
}

export default listReducer;
