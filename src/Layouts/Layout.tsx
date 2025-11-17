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
   * 모달 창 띄우는 함수들, 로컬스토리지 가져오는 함수 같은 것들 검토
   */
  useEffect(() => {
    if (location.pathname === "/write") {
      setTempDiaryFlag(true);
    }
    if (location.pathname !== "/write" && tempDiaryFlag) {
      // 이 if문에서 추가적으로 검사해야 할 조건:
      // form을 제출하는 것이 아닌 다른 방법으로 write를 빠져나왔는지 ( not 'form 제출')
      console.log("tempDiary trigger");
      setTempDiaryFlag(false);
    }
    // 로컬스토리지 확인: tempDiary 존재  --- 없으면 바로 exit
    // 임시저장모달 트리거 발동  --- 아니오는 로컬스토리지 비우고 exit
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
