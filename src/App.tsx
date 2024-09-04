import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Routes/Home";
import Login from "./Routes/Login";
import Userinfo from "./Routes/Userinfo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userinfo" element={<Userinfo />} />
      </Routes>
    </Router>
  );
}

export default App;
