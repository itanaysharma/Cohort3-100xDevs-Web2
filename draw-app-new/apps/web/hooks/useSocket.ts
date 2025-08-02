import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";

export function useSocket() {
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<WebSocket>();
  useEffect(() => {
    const ws = new WebSocket(
      `${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhYWUzZDkyNy1iOThjLTQ0YjYtYmI4MS0wMGI2Nzc1ZjUxNzUiLCJpYXQiOjE3NTM2Mzg3MDZ9.d2qwFL3tqGUqjLK_FKuSa6b1-Jcr6w7waVVJAkRQIiM`
    );
    ws.onopen = () => {
      (setLoading(false), setSocket(ws));
    };
  }, []);
  return {
    socket,
    loading,
  };
}
