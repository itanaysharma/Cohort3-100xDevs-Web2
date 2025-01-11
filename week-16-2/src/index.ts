import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });
interface User {
  socket: WebSocket;
  room: string;
}
let allSockets: User[] = [];
wss.on("connection", (socket) => {
  socket.on("message", (message) => {
    //@ts-ignore
    const parsedMessage = JSON.parse(message);
    if (parsedMessage.type === "join") {
      allSockets.push({ socket, room: parsedMessage.payload.roomId });
    }
    if (parsedMessage.type == "chat") {
      const currentUserRoom = allSockets.find((s) => s.socket === socket)?.room;
      allSockets.forEach((s) => {
        if (s.room === currentUserRoom) {
          s.socket.send("message comming " + parsedMessage.payload.message);
        }
      });
    }
  });
});
