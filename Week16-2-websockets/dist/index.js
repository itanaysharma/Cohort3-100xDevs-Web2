"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let allSockets = [];
wss.on("connection", function (socket) {
    console.log("User connected # ");
    socket.on("message", (message) => {
        //this time the message will be of object looking like a string
        const parsedMessage = JSON.parse(message.toString());
        if (parsedMessage.type === "join") {
            allSockets.push({ socket: socket, room: parsedMessage.roomId });
        }
        else if (parsedMessage.type === "chat") {
            let room = "";
            for (const s of allSockets) {
                if (s.socket === socket) {
                    room = s.room;
                }
            }
            for (const ss of allSockets) {
                if (ss.room === room) {
                    ss.socket.send(parsedMessage.message);
                }
            }
        }
    });
    //   socket.on("disconnect", () => {
    //     allSockets = allSockets.filter((x) => x != socket);
    //   });
});
