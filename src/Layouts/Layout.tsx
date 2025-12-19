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
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isEqual } from "lodash";
import Header from "../Components/Header";
import ScrollTopBtn from "../Components/ScrollTopBtn";
import Modal from "../Components/modal/ModalIndex";
import useUser from "../Hooks/useUser";
import useScrollProgress from "../Hooks/useScrollProgress";
import useModal from "../Hooks/useModal";
import useDiary from "../Hooks/useDiary";
import useFocusTrap from "../Hooks/useFocusTrap";
import { IUserState } from "../types/types";
import { defaultUserState } from "../constants/defaults";
import { userState, userSynchronizedState } from "../States/userAtom";
import { ModalContext } from "../Contexts/ModalContext";
import { getTempDiary } from "../util/diaryUtility";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const user = useRecoilValue<IUserState>(userState);
  const { userConfig, userInfo, synchronized } = user;
  const setSynchronized = useSetRecoilState<boolean>(userSynchronizedState);
  const { loadUser, saveUser } = useUser();
  const { saveDiary, removeTempDiary } = useDiary();
  const { modalProps, modalAction, modalResponse } = useModal();
  const { noScroll } = useScrollProgress();
  const { ready, diary } = getTempDiary();
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
    if (location.pathname !== "/write" && ready) {
      if (diary !== null) {
        modalAction({ modalId: "saveDiary" });
      }
    }
  }, [location.pathname, ready]);

  useEffect(() => {
    if (modalResponse.modalId === "saveDiary" && diary) {
      if (modalResponse.confirm === true) {
        saveDiary(diary);
      } else if (modalResponse.confirm === false) {
        if (location.pathname !== "/write") {
          removeTempDiary();
        }
      }
    }
  }, [location.pathname, modalResponse]);

  useEffect(() => {
    if (isEqual(user, defaultUserState)) {
      loadUser();
    }
  }, [user]);

  useEffect(() => {
    if (!isEqual(user, defaultUserState)) {
      setSynchronized(() => {
        console.log("변화 감지됨.");
        return false;
      });
    }
  }, [userConfig, userInfo]);

  useEffect(() => {
    if (!synchronized && !isEqual(user, defaultUserState)) {
      saveUser(user);
    }
  }, [synchronized]);

  return (
    <Wrapper>
      <input className="focusWall" />
      <Modal {...modalProps} />
      <ModalContext.Provider value={contextValue}>
        <Header />
        {/* 
        여기 개선 필요.
        현재 로직 상에서는 사용자 정보가 있을 때도 /login 라우트 접근이 가능한데
        이거 막아야 함
         */}
        {userInfo.githubId !== null || location.pathname === "/login" ? (
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
