import "./App.css";
import { Otp } from "./components/otp";
function App() {
  return (
    <div className="h-screen bg-blue-700">
      <br />
      <br />
      <br />
      <br />
      <Otp number={6} />
    </div>
  );
}
export default App;
