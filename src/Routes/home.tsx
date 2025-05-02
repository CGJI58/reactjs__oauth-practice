import styled from "styled-components";
import { userState } from "../States/atoms";
import { useRecoilValue } from "recoil";
import UserRecord from "../Components/userRecord";
import ScrollTopBtn from "../Components/scrollTopBtn";
import useGetUserByCookie from "../Hooks/useGetUserByCookie";
import { IUserState } from "../types/types";
import useTempDiary from "../Hooks/useTempDiary";
import { useEffect } from "react";
import useModal from "../Hooks/useModal";
import Modal from "../Components/modal";

function Home() {
  useGetUserByCookie();
  const {
    userInfo: { email },
  } = useRecoilValue<IUserState>(userState);

  const { saveTempDiaryVariants, tempDiary, runSaveTempDiary } = useTempDiary();
  const { modalProps, modalResult, modalOn, createModal } = useModal();

  useEffect(() => {
    if (tempDiary) {
      createModal(saveTempDiaryVariants);
    }
  }, [tempDiary]);

  useEffect(() => {
    if (modalProps && modalResult) {
      const { modalId } = modalProps;
      if (modalId === saveTempDiaryVariants.modalId) {
        runSaveTempDiary();
      }
    }
  }, [modalResult]);

  return (
    <Wrapper>
      {email !== "" ? <UserRecord /> : <span>log in please</span>}
      {email !== "" ? <ScrollTopBtn /> : null}
      {modalOn && <Modal {...modalProps} />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 10px;
`;

export default Home;
