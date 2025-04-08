import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Layout from "./Layouts/layout";
import Home from "./Routes/home";
import Login from "./Routes/login";
import Write from "./Routes/write";
import Logout from "./Routes/logout";
import { ThemeProvider } from "styled-components";
import { useRecoilValue } from "recoil";
import { isDarkThemeState } from "./States/atoms";
import { darkTheme, lightTheme } from "./theme/theme";

const FE_BASE_URL = "/reactjs__oauth-practice";

function App() {
  const isDarkTheme = useRecoilValue(isDarkThemeState);
  return (
    <Router basename={`${FE_BASE_URL}`}>
      <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/write" element={<Write />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Layout>
      </ThemeProvider>
    </Router>
  );
}

export default App;
