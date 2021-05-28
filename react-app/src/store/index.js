import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import session from "./session";
import watchlist from "./watchlist";
import stockReducer from './stock';
import transaction from "./transaction";
import portfolio from "./portfolio";
import list from "./list";

const rootReducer = combineReducers({
    session,
    watchlist,
    stock: stockReducer,
    transaction,
    portfolio,
    list,
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
