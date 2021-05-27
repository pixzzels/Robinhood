/* -----action verbs-------------------------------------------------- */
const LOAD = "portfolio/LOAD";


/* -----action creator-------------------------------------------------- */
const load = (portfolio) => ({
  type: LOAD,
  portfolio
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


/* -----reducer-------------------------------------------------- */
const initialState = {};

const portfolioReducer = (state = initialState, action) => {
  let newState;
  console.log('al;dfasdf', action)
  switch (action.type) {


    default:
      return state;
  }
}

export default portfolioReducer;