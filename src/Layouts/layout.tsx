import { FC, ReactNode, useEffect } from "react";
import Header from "../Components/header";
import styled from "styled-components";
import useUser from "../Hooks/useUser";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { IUserState } from "../types/types";
import {
  defaultUserState,
  userState,
  userSynchronizedState,
} from "../States/atoms";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const user = useRecoilValue<IUserState>(userState);

  const { userConfig, userInfo, userRecord, synchronized } = user;

  const setSynchronized = useSetRecoilState<boolean>(userSynchronizedState);

  const { loadUser, saveUser } = useUser();

  useEffect(() => {
    if (user === defaultUserState) {
      loadUser();
    }
  }, [user]);

  useEffect(() => {
    if (user !== defaultUserState) {
      setSynchronized(() => {
        console.log("변화 감지됨.");
        return false;
      });
    }
  }, [userConfig, userInfo, userRecord]);

  useEffect(() => {
    if (!synchronized && user !== defaultUserState) {
      saveUser(user);
    }
  }, [synchronized]);

  return (
    <Wrapper>
      <Header />
      <main>{children}</main>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.backgroundRegular};
  min-height: 100vh;
  color: ${(props) => props.theme.text};
  & > * {
    max-width: 600px;
  }
  main {
    padding-top: 50px;
    width: 100%;
    min-height: 100vh;
    position: relative;
  }
`;

export default Layout;
