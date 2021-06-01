/* -----action verbs-------------------------------------------------- */
const ADD_LIST = "watchlist/ADD_LIST";
const LOAD_LIST = "watchlist/LOAD_LIST";
const REMOVE_LIST = "watchlist/REMOVE_LIST";
const UPDATE_LIST = "watchlist/UPDATE_LIST";


/* -----action creator-------------------------------------------------- */
const addList = (list) => ({
  type: ADD_LIST,
  list
})

const loadList = (list) => ({
  type: LOAD_LIST,
  list
})

const removeList = (listId) => {
  return {
    type: REMOVE_LIST,
    listId
  }
}

const updateList = (list) => ({
  type: UPDATE_LIST,
  list
})




/* -----thunk-------------------------------------------------- */


// POST ADD
export const addOneList = (listName) => async (dispatch) => {
  const { name, user_id } = listName;

  const response = await fetch(`/api/watchlist/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name, user_id
    })
  })

  if (!response.ok) {
    throw response
  }

  const data = await response.json();
  dispatch(addList(data));
  return data;
}

// GET
export const loadAllList = (userId) => async (dispatch) => {

  const response = await fetch(`/api/watchlist/${userId}`, {
    headers: { 'Content-Type': 'application/json' }
  })

  if (!response.ok) {
    throw response
  }

  const data = await response.json();

  dispatch(loadList(data));
  return data;
}

// POST DELETE
export const removeOneList = (id) => async (dispatch) => {

  const response = await fetch(`/api/watchlist/delete/${id}`, {
    method: "DELETE",
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    throw response
  }

  dispatch(removeList(id))
}

// PUT UPDATE

export const updateOneList = (newList) => async (dispatch) => {
  const { name, id } = newList

  const response = await fetch(`/api/watchlist/update/${id}`, {

    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name, id
    })
  })

  if (!response.ok) {
    throw response
  }

  const data = await response.json();
  dispatch(updateList(data));
  return data;
}



/* -----reducer-------------------------------------------------- */
const initialState = {};

const watchListReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case ADD_LIST:
      newState = {
        ...state,
        [action.list.id]: action.list
      };
      return newState;

    case LOAD_LIST: {
      newState = {}
      action.list.forEach((oneList) => {
        newState[oneList.id] = oneList
      })
      return {
        ...newState, ...state
      }
    }

    case REMOVE_LIST: {
      newState = { ...state };
      delete newState[action.listId];
      return newState;
    }

    case UPDATE_LIST: {
      return {
        ...state,
        [action.list.id]: action.list
      }
    }

    default:
      return state;
  }
}

export default watchListReducer;
