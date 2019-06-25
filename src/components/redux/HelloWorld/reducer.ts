import { Action } from "redux";

import { IReduxAction } from "../interfaces";
import { ActionTypes, changeText, changeTextAsync } from "./actions";
import { IHelloWorldAction, IHelloWorldStateShape } from "./interfaces";

import * as reduxUtils from "../utils";

const defaultState: IHelloWorldStateShape = {
  error: null,
  isLoading: false,
  text: "Hello, World",
};

export default (state = defaultState, action: IReduxAction<IHelloWorldAction>) => {
  switch (action.type) {
    case ActionTypes.CHANGE_TEXT: {
      const { text } = action.payload;
      return { ...state, text };
    }
    case reduxUtils.createActionPending(ActionTypes.CHANGE_TEXT_ASYNC): {
      return { ...state, error: null, isLoading: true };
    }
    case reduxUtils.createActionFulfilled(ActionTypes.CHANGE_TEXT_ASYNC): {
      const { text } = action.payload;
      return { ...state, text, isLoading: false };
    }
    case reduxUtils.createActionRejected(ActionTypes.CHANGE_TEXT_ASYNC): {
      const { error } = action.payload;
      return { ...state, error, isLoading: false };
    }
    default: {
      return state;
    }
  }
};
