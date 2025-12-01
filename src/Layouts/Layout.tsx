import {
  FC,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import Header from "../Components/Header";
import styled from "styled-components";
import useUser from "../Hooks/useUser";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { IUserState } from "../types/types";
import { defaultUserState } from "../constants/defaults";
import { userState, userSynchronizedState } from "../States/atoms";
import useScrollProgress from "../Hooks/useScrollProgress";
import ScrollTopBtn from "../Components/ScrollTopBtn";
import { useLocation } from "react-router-dom";
import { isEqual } from "lodash";
import useModal from "../Hooks/useModal";
import { ModalContext } from "../Contexts/ModalContext";
import Modal from "../Components/modal/ModalIndex";
import { getTempDiary } from "../util/diaryUtility";
import useDiary from "../Hooks/useDiary";
import useFocusTrap from "../Hooks/useFocusTrap";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const user = useRecoilValue<IUserState>(userState);
  const { userConfig, userInfo, userRecord, synchronized } = user;
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
  }, [userConfig, userInfo, userRecord]);

  useEffect(() => {
    if (!synchronized && !isEqual(user, defaultUserState)) {
      saveUser(user);
    }
  }, [synchronized]);

  return (
    <Wrapper>
      <ModalContext.Provider value={contextValue}>
        <Header />
        {/* 
        여기 개선 필요.
        현재 로직 상에서는 사용자 정보가 있을 때도 /login 라우트 접근이 가능한데
        이거 막아야 함
         */}
        {userInfo.email !== "" || location.pathname === "/login" ? (
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
      <Modal {...modalProps} />
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
    max-width: ${(props) => props.theme.UIWidth}px;
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
`;

export default Layout;
