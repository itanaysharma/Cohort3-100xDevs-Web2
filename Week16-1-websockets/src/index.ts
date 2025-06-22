import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });
//We can connect via postnam on 8080 port and check run this
wss.on("connection", function (socket) {
  console.log("User Connected");
  socket.send("User Connected");
  socket.on("message", function (e) {
    if (e.toString() === "ping") {
      socket.send("pong");
    }
  });
});
