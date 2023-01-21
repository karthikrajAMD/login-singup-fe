import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Component/Home";
import Login from "./Component/Login";
import Forgot from "./Component/Forgot";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<Forgot />} />
      </Routes>
    </div>
  );
}

export default App;
