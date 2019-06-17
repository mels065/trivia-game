import * as React from "react";
import * as io from "socket.io-client";

import "./style.scss";

export function App(): JSX.Element {
  const [message, changeMessage] = React.useState("Hello World");

  const socket: SocketIOClient.Socket = io("/socket");
  socket.on("response", (str: string) => {
    changeMessage(str);
  });

  React.useEffect((): void => {
    setTimeout(() => {
      socket.emit("request", "Goodbye World");
    }, 5000);
  });

  return (
      <div id="App">
        {message}!
      </div>
  );
}
