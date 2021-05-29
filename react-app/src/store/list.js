/* -----action verbs-------------------------------------------------- */
const LOAD_LIST = "list/LOAD_LIST";
const ADD_LIST = "list/ADD_LIST";


/* -----action creator-------------------------------------------------- */

const loadList = (list) => ({
    type: LOAD_LIST,
    list
})

const addList = (list) => ({
    type: ADD_LIST,
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

// POST 
export const addStocksList = (listInfo) => async (dispatch) => {
    const { watchlistId, listId } = listInfo;

    const response = await fetch(`/api/list/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            watchlist_id: watchlistId,
            list_id: listId
        })
    })

    if (!response.ok) {
        throw response
    }

    const data = await response.json();
    dispatch(addList(data));
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

        case ADD_LIST: {
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
