import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Layout from "./Layouts/Layout";
import Home from "./Routes/Home";
import Login from "./Routes/Login";
import Write from "./Routes/Write";
import Logout from "./Routes/Logout";
import Profile from "./Routes/Profile";
import { ThemeProvider } from "styled-components";
import { useRecoilValue } from "recoil";
import { userConfigState } from "./States/userAtom";
import useUserTheme from "./Hooks/useUserTheme";
import { defaultUserState } from "./constants/defaults";
import Read from "./Routes/Read";
import { Helmet } from "react-helmet";
import { IUserConfig } from "./types/types";
import EditNickname from "./Routes/edit/EditNickname";
import { FE_BASE_URL } from "./constants/urls";

function App() {
  const userConfig = useRecoilValue<IUserConfig>(userConfigState);
  const theme = useUserTheme(userConfig ?? defaultUserState.userConfig);
  return (
    <ThemeProvider theme={theme}>
      <Router basename={`${FE_BASE_URL}`}>
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
      </Router>
    </ThemeProvider>
  );
}

export default App;
