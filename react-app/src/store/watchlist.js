/* -----action verbs-------------------------------------------------- */
const ADD_LIST = "watchlist/ADD_LIST";
const LOAD_LIST = "watchlist/LOAD_LIST";
const REMOVE_LIST = "watchlist/REMOVE_LIST";


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
// ({
//   type: REMOVE_LIST,
//   listId
// })


/* -----thunk-------------------------------------------------- */


// POST ADD
export const addOneList = (listName) => async (dispatch) => {
  const { name, user_id } = listName;
  // console.log("test", name, user_id)

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

// POST DELETE
export const removeOneList = (id) => async (dispatch) => {
  const { listId } = id
  console.log("first~~", listId)

  const response = await fetch(`/api/watchlist/${id}`, {
    method: "DELETE",
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    throw response
  }

  // const listId2 = await response.json();
  // console.log("backend", listId2)
  dispatch(removeList(listId))
}


/* -----reducer-------------------------------------------------- */
const initialState = {};

const listReducer = (state = initialState, action) => {
  let newState;
  console.log('al;dfasdf', action)
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

    case REMOVE_LIST:
      newState = { ...state };
      delete newState[action.listId];
      return newState;

    default:
      return state;
  }
}

export default listReducer;