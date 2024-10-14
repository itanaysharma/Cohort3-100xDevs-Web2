import "./App.css";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import { UseRefUse1 } from "./Useref";
function App() {
  return (
    <div>
      {/* Best way to route */}
      {/* Learn useNevigate as well */}

      <BrowserRouter>
        <Routes>
          {/* Using layout the: The nested route parent path secures that the path should always start with the string defined. */}
          <Route path="/" element={<Layout />}>
            <Route
              path="/neet/online-coaching-class-11"
              element={<Class11Program />}
            />
            <Route
              path="/neet/online-coaching-class-12"
              element={<Class12Program />}
            />
            <Route path="/" element={<Landing />} />

            {/* If a route is chosen that is not defined */}
            <Route path="*" element={<NoPage />}></Route>
          </Route>
          <Route path="/useRef1" element={<UseRefUse1></UseRefUse1>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function Layout() {
  return (
    <div>
      <Link to="/">Allen</Link>|
      <Link to="/neet/online-coaching-class-11">Class 11</Link>|
      <Link to="/neet/online-coaching-class-12">Class 12</Link>
      {/* Outlet puts all the childs of nested route parents here */}
      <Outlet />
    </div>
  );
}
function NoPage() {
  return <div>Not Found</div>;
}
function Landing() {
  return <div>Landing page</div>;
}
function Class11Program() {
  return <div>Neet program class 11th</div>;
}
function Class12Program() {
  return <div>Neet program class 12th</div>;
}

export default App;
