import express = require("express");
import http = require("http");
import socketIO = require("socket.io");

export function createIo(server: http.Server): void {
  const io: socketIO.Server = socketIO.listen(server);
  io.origins("*:*");
  const nsp: socketIO.Namespace = io.of("/socket");

  nsp.on("connection", (client) => {
    client.on("request", (str: string) => {
      client.emit("response", str.toUpperCase());
    });
  });
}
