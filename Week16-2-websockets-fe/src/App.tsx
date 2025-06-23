import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState(["hi there", "hello"]);
  const wsRef = useRef<WebSocket | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    ws.onmessage = (e) => {
      setMessages((m) => [...m, e.data]);
    };
    wsRef.current = ws;
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          roomId: "red",
        })
      );
    };
    return () => {
      ws.close();
    };
  }, []);
  return (
    <div className="h-screen bg-black">
      <div className="absolute mt-11">
        {messages.map((message) => (
          <div>{message}</div>
        ))}
      </div>
      <div className="h-[90vh] bg-amber-500 rounded-2xl"></div>
      <div className="h-[10vh] flex items-center justify-center">
        <input
          ref={inputRef}
          className="flex-1 w-full bg-gray-900 p-1 text-white border-2 border-purple-400 rounded-2xl text-2xl"
          type="text"
        ></input>
        <button
          onClick={() => {
            if (wsRef.current) {
              wsRef.current.send(
                JSON.stringify({
                  type: "chat",
                  message: inputRef.current?.value,
                })
              );
            }
          }}
          className="bg-purple-400 ml-2 text-black-700 rounded-3xl text-2xl p-2"
        >
          Send Message
        </button>
      </div>
    </div>
  );
}

export default App;
