import { applyMiddleware, combineReducers, createStore, Reducer } from "redux";
import logger from "redux-logger";
import promise from "redux-promise-middleware";
import thunk from "redux-thunk";

import { IHelloWorldStateShape  } from "./HelloWorld/interfaces";
import helloWorldReducer from "./HelloWorld/reducer";

const primaryReducer: Reducer = combineReducers({
  helloWorld: helloWorldReducer,
});

export type IStateShape = IHelloWorldStateShape;

let middleware = [thunk, promise];

if (process.env.NODE_ENV === "development") {
  middleware = [...middleware, logger];
}

export const store = createStore(
  primaryReducer,
  {},
  applyMiddleware(...middleware),
);
