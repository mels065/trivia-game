import express = require("express");
import http = require("http");
import socketIO = require("socket.io");

module.exports = function createIo(app: express.Application): void {
  const server: http.Server = http.createServer(app);
  const io: socketIO.Server = socketIO(server);

  io.on("connection", (client) => {
    client.on("request", (str: string) => {
      client.emit("response", str.toUpperCase());
    });
  });
};
