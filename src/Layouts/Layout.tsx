import { FC, ReactNode, useEffect, useMemo, useState } from "react";
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

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [tempDiaryFlag, setTempDiaryFlag] = useState<boolean>(false);
  const user = useRecoilValue<IUserState>(userState);
  const { userConfig, userInfo, userRecord, synchronized } = user;
  const setSynchronized = useSetRecoilState<boolean>(userSynchronizedState);
  const { loadUser, saveUser } = useUser();
  const { modalProps, modalAction } = useModal();
  const { noScroll } = useScrollProgress();
  const contextValue = useMemo(() => ({ modalAction }), [modalAction]);

  // 이후에 useMemo, useCallback 필요한 부분들 다 찾아서 적용할 예정
  /**
   * useMemo:
   * userState 에서 정보 가져오는것들 싹 다 useMemo [user] 하는게 좋을지 검토
   *
   * useCallback:
   * 모달 창 띄우는 함수들, 세션스토리지 가져오는 함수 같은 것들 검토
   */
  useEffect(() => {
    if (location.pathname === "/write") {
      setTempDiaryFlag(true);
    } else if (tempDiaryFlag) {
      //세션 스토리지 가져와서 아래 if문의 조건에 넣어 검사.
      if (true) {
        //세션 스토리지에 'tempDiary'가 존재하는가?
        modalAction({ modalId: "saveDiary" });
      }
      setTempDiaryFlag(false);
    }
    // 세션스토리지 확인: tempDiary 존재  --- 없으면 폼이 제출된 것이니 바로 exit
    // 임시저장모달 트리거 발동  --- 아니오는 세션스토리지 비우고 exit
    // onValid(tempDiary) 실행
  }, [location]);

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
          <main>{children}</main>
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
