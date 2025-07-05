"use client";
import axios from "axios";
import { useRef } from "react";
export default function Signin() {
  const userRef = useRef(null);
  const passRef = useRef(null);
  return (
    <div className="w-screen h-screen flex text-2xl items-center justify-center">
      <input ref={userRef} type="text" placeholder="username"></input>
      <input ref={passRef} type="password" placeholder="password"></input>
      <button
        onClick={() => {
          axios.post("http://localhost:3000/api/v1/signin");
        }}
      >
        Sign up
      </button>
    </div>
  );
}
