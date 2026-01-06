import {
  FC,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Header from "../Components/Header";
import ScrollTopBtn from "../Components/ScrollTopBtn";
import Modal from "../Components/modal/ModalIndex";
import useUser from "../Hooks/useUser";
import useScrollProgress from "../Hooks/useScrollProgress";
import useModal from "../Hooks/useModal";
import useFocusTrap from "../Hooks/useFocusTrap";
import { IUserInfo } from "../types/types";
import { userInfoState } from "../States/userAtom";
import { ModalContext } from "../Contexts/ModalContext";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { githubId } = useRecoilValue<IUserInfo>(userInfoState);
  const { loadUser } = useUser();
  const { modalProps, modalAction, modalResponse } = useModal();
  const { noScroll } = useScrollProgress();
  const contextValue = useMemo(
    () => ({ modalAction, modalResponse }),
    [modalAction, modalResponse]
  );
  const mainRef = useRef<HTMLDivElement>(null);
  const { runFocusTrap } = useFocusTrap();

  useLayoutEffect(() => {
    if (mainRef?.current) {
      const container = mainRef.current;
      runFocusTrap({ container });
    }
  }, [location.pathname, children]);

  useEffect(() => {
    if (githubId === null) {
      loadUser();
    }
  }, [githubId]);

  return (
    <Wrapper>
      <input className="focusWall" />
      <Modal {...modalProps} />
      <ModalContext.Provider value={contextValue}>
        <Header />
        {/* 
        로그인 라우트 삭제해버리고, 
        githubId === null 이면 로그인 모달을 띄우고,
        else면 main 렌더하는 방식으로 수정할 것
        헤더에서도 로그인 컬럼은 삭제해야 함
         */}
        {githubId !== null || location.pathname === "/login" ? (
          <main key={location.pathname} ref={mainRef}>
            {children}
          </main>
        ) : (
          <span className="projectIntroduce">
            사용자 인증 연습 겸 to do list FE 연습 겸 FE-BE-DB 연결 연습용
            프로젝트
          </span>
        )}
      </ModalContext.Provider>
      {noScroll ? null : <ScrollTopBtn />}
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
  header,
  main {
    max-width: ${(props) => props.theme.UIMaxWidth}px;
  }
  & > main {
    padding: 80px 10px 30px 10px;
    width: 100%;
    min-height: 100vh;
    position: relative;
  }
  .projectIntroduce {
    margin-top: 100px;
    font-size: ${(props) => props.theme.fontSizes.l}px;
  }
  .focusWall {
    opacity: 0;
    pointer-events: none;
    position: absolute;
  }
`;

export default Layout;
