import { FC, ReactNode, useEffect } from "react";
import Header from "../Components/Header";
import styled from "styled-components";
import useUser from "../Hooks/useUser";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { IUserState } from "../types/types";
import { defaultUserState } from "../constants/defaults";
import { userState, userSynchronizedState } from "../States/atoms";
import ScrollTopBtn from "../Components/ScrollTopBtn";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const user = useRecoilValue<IUserState>(userState);

  const { userConfig, userInfo, userRecord, synchronized } = user;

  const setSynchronized = useSetRecoilState<boolean>(userSynchronizedState);

  const { loadUser, saveUser } = useUser();

  const location = useLocation();

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
      {userInfo.email !== "" || location.pathname === "/login" ? (
        <main>{children}</main>
      ) : (
        <span className="projectIntroduce">
          사용자 인증 연습 겸 to do list FE 연습 겸 FE-BE-DB 연결 연습용
          프로젝트
        </span>
      )}
      {userInfo.email !== "" ? <ScrollTopBtn /> : null}
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
    max-width: ${(props) => props.theme.UIWidth}px;
  }
  & > main {
    padding-top: 50px;
    padding: 50px 10px 0px 10px;
    width: 100%;
    min-height: 100vh;
    position: relative;
  }
  .projectIntroduce {
    margin-top: 100px;
    font-size: ${(props) => props.theme.fontSizes.l}px;
  }
`;

export default Layout;
