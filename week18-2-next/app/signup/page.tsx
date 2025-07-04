"use client";
import axios from "axios";
import { useRef } from "react";
export default function Signup() {
  const userRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const handleSubmit = () => {
    axios.post("http://localhost:3000/api/v1/signup", {
      username: userRef.current?.value,
      password: passRef.current?.value,
    });
  };
  return (
    <div className="w-screen h-screen flex text-2xl items-center justify-center">
      <input ref={userRef} type="text" placeholder="username"></input>
      <input ref={passRef} type="password" placeholder="password"></input>
      <button onClick={handleSubmit}>Sign up</button>
    </div>
  );
}
