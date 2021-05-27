//Action Verbs

const SET_STOCK = 'stock/setStock'



//Action Creater

const setStocks = (symbol) => {
    return {
        type: SET_STOCK,
        stock
    }
}


//Thunk
export const getStock



// Reducer
const initialState = {};

const stockReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {

        default:
            return state;
    }
};

export default stockReducer;
