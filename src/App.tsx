import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./Routes/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Home />} />
        <Route path="/userinfo" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
