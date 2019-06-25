import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { changeText, changeTextAsync } from "../../redux/HelloWorld/actions";
import { IHelloWorldStateShape } from "../../redux/HelloWorld/interfaces";

interface IHelloWorldProps {
  error: Error | null;
  isLoading: boolean;
  text: string;
  handleChangeTextClick: () => void;
  handleChangeTextAsyncClick: () => void;
}
function HelloWorld(props: IHelloWorldProps): JSX.Element {
  const { error, isLoading, text } = props;
  const { handleChangeTextClick, handleChangeTextAsyncClick } = props;

  return (
    <div className="hello-world">
      <div className="status">{isLoading ? "LOADING..." : (error ? error.message : null)}</div>
      <div className="text">{text}</div>

      <button className="btn-change-text" onClick={handleChangeTextClick}>Change Text</button>
      <button className="btn-change-text-async" onClick={handleChangeTextAsyncClick}>Change Text Async</button>
    </div>
  );
}

export default connect(
  (state: { helloWorld: IHelloWorldStateShape }) => (
    {
      error: state.helloWorld.error,
      isLoading: state.helloWorld.isLoading,
      text: state.helloWorld.text,
    }
  ),
  (dispatch: Dispatch) => (
    {
      handleChangeTextAsyncClick: () => dispatch(changeTextAsync(null)),
      handleChangeTextClick: () => dispatch(changeText("Oh Hai, Mark!")),
    }
  )
)(HelloWorld);
