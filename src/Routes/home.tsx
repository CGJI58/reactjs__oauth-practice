import styled from "styled-components";
import { userInfoState } from "../States/atoms";
import { useRecoilValue } from "recoil";
import UserRecord from "../Components/userRecord";
import ScrollTopBtn from "../Components/scrollTopBtn";
import { IUserInfo } from "../types/types";
import useTempDiary from "../Hooks/useTempDiary";
import { useEffect } from "react";
import useModal from "../Hooks/useModal";
import Modal from "../Components/modal";
import { hashString } from "../util/authUtility";

function Home() {
  const { email } = useRecoilValue<IUserInfo>(userInfoState);
  const {
    saveTempDiaryVariants,
    tempDiary,
    runSaveTempDiary,
    runRemoveTempDiary,
  } = useTempDiary();
  const { modalProps, modalAnswer, modalOn, createModal } = useModal();

  useEffect(() => {
    if (tempDiary) {
      createModal(saveTempDiaryVariants);
    }
  }, [tempDiary]);

  useEffect(() => {
    if (modalProps && modalAnswer !== null) {
      const { modalId } = modalProps;
      if (modalId === saveTempDiaryVariants.modalId) {
        if (modalAnswer) {
          runSaveTempDiary();
        }
        runRemoveTempDiary();
      }
    }
  }, [modalAnswer]);

  useEffect(() => {
    console.log(hashString("asdf"));
  }, []);

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
