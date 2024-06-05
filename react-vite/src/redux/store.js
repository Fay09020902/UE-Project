import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
// import logger from "redux-logger"; // Import logger synchronously
import sessionReducer from "./session";
import restaurantsReducer from "./restaurants";
import cartReducer from "./cart";
import menuitemsReducer from "./menu_items";



const rootReducer = combineReducers({
  session: sessionReducer,
  restaurants: restaurantsReducer,
  cart: cartReducer,
  menuitems: menuitemsReducer,
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
