import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Routes/Home";
import Login from "./Routes/Login";
import Userinfo from "./Routes/Userinfo";
import { useEffect, useState } from "react";
import { loadNowLoggedInUser } from "./model/localstorage";

function App() {
  const [ghCode, setGhCode] = useState("1234");
  const [token, setToken] = useState("");

  const onLogOutRerender = () => {
    setToken("");
  };
  useEffect(() => {
    setToken(() => loadNowLoggedInUser());
  }, [ghCode, token]);

  return (
    <Router>
      <Layout token={token}>
        <Routes>
          <Route path="/" element={<Home setGhCode={setGhCode} />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/userinfo"
            element={<Userinfo onLogOutRerender={onLogOutRerender} />}
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
