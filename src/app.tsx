import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Layout from "./Layouts/layout";
import Home from "./Routes/home";
import Login from "./Routes/login";
import Write from "./Routes/write";

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
