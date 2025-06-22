import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });
//@ts-ignore
let allSockets: any[] = [];
wss.on("connection", function (socket) {
  allSockets.push(socket);
  console.log("User connected # ");

  socket.on("message", (message) => {
    console.log("message recieved " + message.toString());
    for (const s of allSockets) {
      s.send(message.toString() + ": sent from the server");
    }
  });

  socket.on("disconnect", () => {
    allSockets = allSockets.filter((x) => x != socket);
  });
});
