import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Layout from "./Layouts/Layout";
import Home from "./Routes/Home";
import Login from "./Routes/Login";
import Write from "./Routes/Write";
import Logout from "./Routes/Logout";
import Profile from "./Routes/Profile";
import { ThemeProvider } from "styled-components";
import { useRecoilValue } from "recoil";
import { userConfigState } from "./States/atoms";
import { darkTheme, lightTheme } from "./theme/theme";
import Read from "./Routes/Read";
import { Helmet } from "react-helmet";
import { IUserConfig } from "./types/types";
import EditNickname from "./Routes/edit/EditNickname";
import { FE_BASE_URL } from "./constants/urls";

function App() {
  const { isDarkTheme, fontSize } =
    useRecoilValue<IUserConfig>(userConfigState);

  const theme = {
    ...(isDarkTheme ? darkTheme : lightTheme),
    fontSizes: {
      xxl: fontSize * 2,
      xl: fontSize * 1.4,
      l: fontSize * 1.2,
      m: fontSize * 1,
      s: fontSize * 0.8,
      xs: fontSize * 0.6,
    },
  };

  return (
    <Router basename={`${FE_BASE_URL}`}>
      <ThemeProvider theme={theme}>
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
            <Route path="/edit/nickname" element={<EditNickname />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </Router>
  );
}

export default App;
