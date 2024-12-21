import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Routes/Home";
import Login from "./Routes/Login";
import Write from "./Routes/Write";

const FE_BASE_URL = "/reactjs__oauth-practice";

function App() {
  return (
    <Router basename={`${FE_BASE_URL}`}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/write" element={<Write />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
