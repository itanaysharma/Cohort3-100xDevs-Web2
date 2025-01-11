import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState(["hi there"]);
  const wsRef = useRef();
  useEffect(() => {
    const ws = new WebSocket("https://localhost:3000");
    ws.onmessage = (event) => {
      setMessages((m) => [...m, event.data]);
    };
  });
  return (
    <div className="h-screen text-white bg-black">
      <div className="h-[95vh]">
        {messages.map((message) => (
          <div className="bg-white text-black">{message}</div>
        ))}
      </div>
      <div className="w-full bg-white flex">
        <input className="flex-1 p-4" type="text"></input>
        <button className="bg-purple-600 text-white p-4">Send Message</button>
      </div>
    </div>
  );
}

export default App;
