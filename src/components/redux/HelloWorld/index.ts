// https://github.com/thebrodmann/deox
import { createActionCreator, createReducer } from "deox";
import { Dispatch } from "redux";

import * as reduxUtils from "../utils";

enum ActionTypes {
  CHANGE_TEXT = "CHANGE_TEXT",
  CHANGE_TEXT_ASYNC = "CHANGE_TEXT_ASYNC",
}

export interface IHelloWorldStateShape {
  error: Error | null;
  isLoading: boolean;
  text: string;
}

export const changeText = createActionCreator(
  ActionTypes.CHANGE_TEXT,
  (resolve) => (text: string) => resolve(text),
);

function _changeTextAsyncThunk(text: string) {
  return async (dispatch: Dispatch) => {
    dispatch(changeTextAsync.next());

    try {
      const textUpper: string = await new Promise((resolve) => {
        setTimeout(() => { resolve(text.toUpperCase()); }, 3000);
      });
      dispatch(changeTextAsync.complete(textUpper));
    } catch (err) {
      dispatch(changeTextAsync.error(err));
    }
  };
}

export const changeTextAsync = Object.assign(
  _changeTextAsyncThunk,
  ((type) => (
    {
      complete: createActionCreator(
        reduxUtils.createActionComplete(type),
        (resolve) => (text: string) => resolve(text),
      ),
      error: createActionCreator(
        reduxUtils.createActionError(type),
        (resolve) => (error: Error) => resolve(error),
      ),
      next: createActionCreator(reduxUtils.createActionNext(type)),
    }
  ))(ActionTypes.CHANGE_TEXT_ASYNC),
);

const defaultState: IHelloWorldStateShape = {
  error: null,
  isLoading: false,
  text: "Hello, World",
};

export const helloWorldReducer = createReducer(defaultState, (handleAction) => [
  handleAction(
    changeText,
    (_state, { payload }) => ({ ..._state, text: payload }),
  ),

  handleAction(
    changeTextAsync.complete,
    (_state, { payload }) => ({ ..._state, isLoading: false, text: payload }),
  ),

  handleAction(
    changeTextAsync.error,
    (_state, { payload }) => ({ ..._state, isLoading: false, error: payload }),
  ),

  handleAction(
    changeTextAsync.next,
    (_state) => ({ ..._state, error: null, isLoading: true }),
  ),
]);

// const textState: string = "Hello World";
// const textReducer = createReducer(textState, (handleAction) => [
//   handleAction([changeText, changeTextAsync.complete], (_, { payload }) => payload),
// ]);
//
// const errorState: Error | null = null;
// const errorReducer = createReducer(errorState, (handleAction) => [
//   handleAction(changeTextAsync.error, (_, { payload }) => payload),payload
//   handleAction(changeTextAsync.next, () => null),
// ]);
//
// const isLoadingState: boolean = false;
// const isLoadingReducer = createReducer(isLoadingState, (handleAction) => [
//   handleAction(changeTextAsync.next, () => true),
//   handleAction([changeTextAsync.complete, changeTextAsync.error], () => false),
// ]);
//
// export const helloWorldReducers = {
//   error: errorReducer,
//   loading: isLoadingReducer,
//   text: textReducer,
// };
