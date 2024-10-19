import { useState } from "react";

function App() {
  //Example of prop drilling
  const [bulbOn, setBulbOn] = useState(true);
  return (
    <div>
      <LightBulb bulbOn={bulbOn} setBulbOn={setBulbOn} />
    </div>
  );
}

function LightBulb({ bulbOn, setBulbOn }) {
  return (
    <div>
      <BulbState bulbOn={bulbOn} />
      <ToggleBulbState setBulbOn={setBulbOn} bulbOn={bulbOn} />
    </div>
  );
}

function BulbState({ bulbOn }) {
  return <div>{bulbOn ? " Bulb on" : "Bulb Off"}</div>;
}
function ToggleBulbState({ bulbOn, setBulbOn }) {
  function toggle() {
    setBulbOn(!bulbOn);
  }
  return (
    <div>
      <button onClick={toggle}>Toggle the bulb</button>
    </div>
  );
}
export default App;
