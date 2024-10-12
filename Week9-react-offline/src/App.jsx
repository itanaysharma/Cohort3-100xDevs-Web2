import { PureComponent, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
// Flat UI colors
function App() {
  return (
    <div
      style={{
        background: "#dfe6e9",
        height: "100vh",
      }}
    >
      <PostComponent></PostComponent>
    </div>
  );
}

function PostComponent() {
  return (
    <div
      style={{
        backgroundColor: "white",
        width: 200,
        borderRadius: 10,
        borderColor: "gray",
        borderWidth: 1,
        padding: 20,
      }}
    >
      <div style={{ display: "flex" }}>
        <img
          src="https://media.licdn.com/dms/image/v2/C4E03AQGtUGBLj0IuKg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1602558554045?e=1733961600&v=beta&t=hXddhO9p7hBZPa9B3iuBZd4BHQLIncTTuYxR6aPWRf4"
          style={{ width: 30, height: 30, borderRadius: 200 }}
        ></img>
        <div style={{ marginLeft: 10, fontSize: 10 }}>
          <b>Tanay Sharma</b>
          <div>3000 followers</div>
          <div>3d</div>
        </div>
      </div>
      <div style={{ fontSize: 12 }}>
        What to know how to win big? Check out these folks won $6000 in
        bounties.
      </div>
    </div>
  );
}

export default App;
