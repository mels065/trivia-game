import * as React from "react";

import "./style.scss";

import HelloWorld from "../modules/HelloWorld";

export default function App(): JSX.Element {
  return (
      <div id="App" data-testid="app">
        <HelloWorld />
      </div>
  );
}
