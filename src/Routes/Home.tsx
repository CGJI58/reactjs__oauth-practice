import styled from "styled-components";
import UserRecord from "../Components/UserRecord";
import useTempDiary from "../Hooks/useTempDiary";
import { useEffect } from "react";
import useModal from "../Hooks/useModal";
import Modal from "../Components/modal/ModalIndex";

function Home() {
  const { tempDiary } = useTempDiary();
  const { modalProps, modalAction } = useModal();

  useEffect(() => {
    if (tempDiary.status === "loaded") {
      modalAction({ modalId: "tempDiary" });
    }
  }, [tempDiary.status]);

  return (
    <Wrapper>
      <UserRecord />
      <Modal {...modalProps} />
    </Wrapper>
  );
}

const Wrapper = styled.div``;

export default Home;
