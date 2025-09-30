import styled from "styled-components";
import UserRecord from "../Components/UserRecord";
import useTempDiary from "../Hooks/useTempDiary";
import { useEffect } from "react";
import useModal from "../Hooks/useModal";
import Modal from "../Components/modal/ModalIndex";
import { tempDiaryVariants } from "../constants/variants";

function Home() {
  const { tempDiary, runSaveTempDiary, runRemoveTempDiary } = useTempDiary();
  const { modalProps, modalAnswer, modalOn, createModal } = useModal();

  useEffect(() => {
    if (tempDiary) {
      createModal(tempDiaryVariants);
    }
  }, [tempDiary]);

  useEffect(() => {
    if (modalProps && modalAnswer !== null) {
      const { modalId } = modalProps;
      if (modalId === tempDiaryVariants.modalId) {
        if (modalAnswer) {
          runSaveTempDiary();
        }
        runRemoveTempDiary();
      }
    }
  }, [modalAnswer]);

  return (
    <Wrapper>
      <UserRecord />
      {modalOn && <Modal {...modalProps} />}
    </Wrapper>
  );
}

const Wrapper = styled.div``;

export default Home;
