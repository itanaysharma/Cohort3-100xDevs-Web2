import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });
let userCount = 0;
let allSockets = [];
wss.on("connection", function (socket) {
  allSockets.push(socket);
  userCount += 1;
  console.log("User connected # " + userCount);

  socket.on("message", (message) => {
    console.log("message recieved " + message.toString());
    for (const s of allSockets) {
      s.send(message.toString() + ": sent from the server");
    }
  });
});
