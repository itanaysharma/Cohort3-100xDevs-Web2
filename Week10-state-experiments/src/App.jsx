import { createContext, useContext, useState } from "react";

const BulbContext = createContext();

function BulbProvider({ children }) {
  const [bulbOn, setBulbOn] = useState(true);
  return (
    <BulbContext.Provider value={{ bulbOn: bulbOn, setBulbOn: setBulbOn }}>
      {children}
    </BulbContext.Provider>
  );
}

function App() {
  //Example of prop drilling

  return (
    <div>
      <BulbProvider>
        <LightBulb />
      </BulbProvider>
    </div>
  );
}

function LightBulb() {
  return (
    <div>
      <BulbState />
      <ToggleBulbState />
    </div>
  );
}

function BulbState() {
  const { bulbOn } = useContext(BulbContext);
  return <div>{bulbOn ? " Bulb on" : "Bulb Off"}</div>;
}
function ToggleBulbState() {
  const { bulbOn } = useContext(BulbContext);
  const { setBulbOn } = useContext(BulbContext);
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
