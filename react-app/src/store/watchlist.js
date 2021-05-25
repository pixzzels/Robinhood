/* -----action verbs-------------------------------------------------- */
const ADD_LIST = "watchlist/ADD_LIST";
const LOAD_LIST = "watchlist/LOAD_LIST";


/* -----action creator-------------------------------------------------- */
const addList = (list) => ({
  type: ADD_LIST,
  list
})

const loadList = (list) => ({
  type: LOAD_LIST,
  list
})


/* -----thunk-------------------------------------------------- */
export const addOneList = (listName) => async (dispatch) => {
  const { name, user_id } = listName;
  // console.log("test", name, user_id)

  // POST
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
  // console.log("HELLO WORLD")

  const response = await fetch(`/api/watchlist/${userId}`, {
    headers: { 'Content-Type': 'application/json' }
  })

  if (!response.ok) {
    throw response
  }

  const data = await response.json();

  // console.log("DATA", data)
  dispatch(loadList(data));
  return data;
}



/* -----reducer-------------------------------------------------- */
const initialState = {};

const listReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case ADD_LIST:
      newState = {
        ...state,
        [action.list.id]: action.list
      };
      return newState;

    case LOAD_LIST:
      newState = {}
      action.list.forEach((oneList) => {
        newState[oneList.id] = oneList
      })
      return {
        ...newState, ...state
      }

    default:
      return state;
  }
}

export default listReducer;