"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
wss.on("connection", function (socket) {
    console.log("User Connected");
    socket.send("User Connected");
    socket.on("message", function (e) {
        console.log(e, toString());
        socket.send(e.toString());
    });
});
