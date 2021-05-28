/* -----action verbs-------------------------------------------------- */
const LOAD_LIST = "list/LOAD_LIST";

/* -----action creator-------------------------------------------------- */


const loadList = (list) => ({
    type: LOAD_LIST,
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

        default:
            return state;
    }
}

export default listReducer;
