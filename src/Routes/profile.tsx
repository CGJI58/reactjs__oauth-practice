import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { IUserState } from "../types/types";
import { userState } from "../States/atoms";
import useGetUserByCookie from "../Hooks/useGetUserByCookie";
import useTempDiary from "../Hooks/useTempDiary";
import useModal from "../Hooks/useModal";
import { useEffect } from "react";
import Modal from "../Components/modal";

function Profile() {
  useGetUserByCookie();
  const { userInfo, userRecord, userConfig } =
    useRecoilValue<IUserState>(userState);

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
      <Popup>
        <Label>E-mail</Label>
        <Value>{userInfo.email}</Value>
        <Label>NickName</Label>
        <Value>{userConfig.nickname}</Value>
        <Label>Diaries</Label>
        <Value>{userRecord.diaries.length}</Value>
      </Popup>
      {modalOn && <Modal {...modalProps} />}
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const Popup = styled.div`
  background-color: ${(props) => props.theme.backgroundLighter};
  display: grid;
  grid-template-columns: 2fr 3fr;
  border-radius: 10px;
  gap: 20px;
  margin: 20px;
  padding: 20px;
  box-shadow: ${(props) => props.theme.boxShadow};
`;

const Label = styled.div``;

const Value = styled.div``;

export default Profile;
