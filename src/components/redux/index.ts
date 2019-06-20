import { applyMiddleware, combineReducers, createStore, Reducer } from "redux";
import thunk from "redux-thunk";

import { helloWorldReducer, IHelloWorldStateShape  } from "./HelloWorld";

const primaryReducer: Reducer = combineReducers({
  helloWorld: helloWorldReducer,
});

export type IStateShape = IHelloWorldStateShape;

export const store = createStore(
  primaryReducer,
  {},
  applyMiddleware(
    thunk,
  ),
);
