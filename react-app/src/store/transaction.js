/* -----action verbs-------------------------------------------------- */
const BUY = "transaction/BUY";
const SELL = "transaction/SELL";
const LOAD = "transaction/LOAD";


/* -----action creator-------------------------------------------------- */
const buy = (reciept) => ({
  type: BUY,
  reciept
})

const sell = (reciept) => ({
  type: SELL,
  reciept
})

const load = (reciept) => ({
  type: load,
  reciept
})


/* -----thunk-------------------------------------------------- */

export const buyStock = (info) => async (dispatch) => {
  const { userId, stockId, orderPrice, orderVolume, orderType } = info
  // console.log("backend", "userId:", userId, "stockId:", stockId, "orderPrice:", orderPrice, "orderVolume:", orderVolume, "orderType:", orderType)


  const response = await fetch(`/api/transaction/buy`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user_id: userId,
      stock_id: stockId,
      order_price: orderPrice,
      order_volume: orderVolume,
      order_type: orderType
    })
  })

  if (!response.ok) {
    throw response
  }

  const data = await response.json();
  dispatch(buy(data));
  return data;
}

export const loadTransactions = (userId) => async (dispatch) => {

  const response = await fetch(`/api/transaction`)

  if (!response.ok) {
    throw response
  }

  const data = await response.json();

  dispatch(load(data));
  return data;
}


/* -----reducer-------------------------------------------------- */
const initialState = {};

const transactionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case BUY: {
      newState = {
        ...state,
        [action.reciept.id]: action.reciept
      };
      return newState;
    }

    default:
      return state;
  }
}

export default transactionReducer;