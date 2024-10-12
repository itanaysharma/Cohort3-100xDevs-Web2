import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
      ALLEN | CLASS 11 | CLASS 12
      <BrowserRouter>
        <Routes>
          <Route
            path="/need/online-coaching-class-11"
            element={<Class11Program />}
          />
          <Route path="/" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
function Landing() {
  return <div>Landing page</div>;
}
function Class11Program() {
  return <div>Neet program class 11th</div>;
}

export default App;
