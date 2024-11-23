import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Routes/Home";
import Login from "./Routes/Login";
import Userinfo from "./Routes/Userinfo";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path={`/userinfo`} element={<Userinfo />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
