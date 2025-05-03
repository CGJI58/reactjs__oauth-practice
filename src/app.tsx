import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Layout from "./Layouts/layout";
import Home from "./Routes/home";
import Login from "./Routes/login";
import Write from "./Routes/write";
import Logout from "./Routes/logout";
import Profile from "./Routes/profile";
import { ThemeProvider } from "styled-components";
import { useRecoilValue } from "recoil";
import { userState } from "./States/atoms";
import { darkTheme, lightTheme } from "./theme/theme";
import Read from "./Routes/read";
import { Helmet } from "react-helmet";
import { IUserState } from "./types/types";

const FE_BASE_URL = "/reactjs__oauth-practice";

function App() {
  const {
    userConfig: { isDarkTheme },
  } = useRecoilValue<IUserState>(userState);
  return (
    <Router basename={`${FE_BASE_URL}`}>
      <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
        <Helmet>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, minimum-scale=1"
          />
        </Helmet>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/read" element={<Read />} />
            <Route path="/write" element={<Write />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </Router>
  );
}

export default App;
