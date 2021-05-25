import { csrfFetch } from './csrf';


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

  const response = await csrfFetch(`/api/dashboard/watchlist/add`, {
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

export const loadAllList = () => async (dispatch) => {
  // console.log("HELLO WORLD")

  const response = await fetch(`/api/dashboard/watchlist`, {
    headers: { 'Content-Type': 'application/json' }
  })

  if (!response.ok) {
    throw response
  }

  const data = await response.json();

  console.log("DATA", data)
  dispatch(loadList(data));
  return data;
}



/* -----reducer-------------------------------------------------- */
const initialState = {};

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LIST:
      const newState = {
        ...state,
        [action.list.id]: action.list
      };
      return newState;

    case LOAD_LIST:
      const newState2 = {
        ...state
      }
      return newState2;
    default:
      return state;
  }
}

export default listReducer;