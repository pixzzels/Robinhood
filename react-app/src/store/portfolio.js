/* -----action verbs-------------------------------------------------- */
const LOAD = "portfolio/LOAD";
const UPDATE = "portfolio/UPDATE";



/* -----action creator-------------------------------------------------- */
const load = (portfolio) => ({
  type: LOAD,
  portfolio
})

const update = (cashBalance) => ({
  type: UPDATE,
  cashBalance
})


/* -----thunk-------------------------------------------------- */

export const loadPortfolio = (userId) => async (dispatch) => {
  // console.log("HELLO WORLD")

  const response = await fetch(`/api/portfolio/${userId}`, {
    headers: { 'Content-Type': 'application/json' }
  })

  if (!response.ok) {
    throw response
  }

  const data = await response.json();

  dispatch(load(data));
  return data;
}


export const updateCashBalance = (info) => async (dispatch) => {
  const {userId, cashBalance} = info

  const response = await fetch(`/api/portfolio/update/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      cash_balance: cashBalance
    })
  })

  if (!response.ok) {
    throw response
  }

  const data = await response.json();

  dispatch(update(data));
  return data;
}



/* -----reducer-------------------------------------------------- */
const initialState = {};

const portfolioReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD: {
      newState = {}
      // console.log("portfolio", action.portfolio)
      newState[action.portfolio.id] = action.portfolio
      return {
        ...newState, ...state
      }
    }

    default:
      return state;
  }
}

export default portfolioReducer;
