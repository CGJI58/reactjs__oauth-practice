import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Routes/Home";
import Login from "./Routes/Login";
import Write from "./Routes/Write";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path={`/write`} element={<Write />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
