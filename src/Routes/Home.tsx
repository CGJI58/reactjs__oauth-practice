import styled from "styled-components";
import UserRecord from "../Components/UserRecord";
import useTempDiary from "../Hooks/useTempDiary";
import { useEffect, useState } from "react";
import useModal from "../Hooks/useModal";
import Modal from "../Components/modal/ModalIndex";
import { tempDiaryVariants } from "../constants/variants";
import { ModalId } from "../types/modal";
import { defaultModalResponse } from "../constants/defaults";

function Home() {
  const { tempDiary, runSaveTempDiary, runRemoveTempDiary } = useTempDiary();
  const { modalProps, modalResponse, createModal } = useModal();
  const [modalId, setModalId] = useState<ModalId>(null);

  useEffect(() => {
    if (tempDiary) {
      setModalId("tempDiary");
    }
  }, [tempDiary]);

  useEffect(() => {
    if (modalId === "tempDiary") {
      createModal(tempDiaryVariants);
    }
  }, [modalId]);

  useEffect(() => {
    if (modalResponse !== defaultModalResponse) {
      if (modalResponse.confirm) {
        runSaveTempDiary();
      }
      runRemoveTempDiary();
      setModalId(null);
    }
  }, [modalResponse]);

  return (
    <Wrapper>
      <UserRecord />
      <Modal {...modalProps} />
    </Wrapper>
  );
}

const Wrapper = styled.div``;

export default Home;
