import { csrfFetch } from './csrf';


/* -----action verbs-------------------------------------------------- */
const ADD_LIST = "dashboard/ADD_LIST";


/* -----action creator-------------------------------------------------- */
const addList = (list) => ({
  type: ADD_LIST,
  list
})


/* -----thunk-------------------------------------------------- */
export const addOneList = (listName) => async (dispatch) => {
  const { name, user_id } = listName;
  // console.log("test", name, user_id)

  const response = await csrfFetch(`/api/dashboard/watchlist`, {
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



/* -----reducer-------------------------------------------------- */
const initialState = [];

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LIST:
      const newState = {
        ...state,
        [action.list.id]: action.list
      };
      return newState;

    default:
      return state;
  }
}

export default listReducer;