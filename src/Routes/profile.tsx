import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { IUserState, ModalId } from "../types/types";
import { defaultUserState, userState } from "../States/atoms";
import useTempDiary from "../Hooks/useTempDiary";
import useModal from "../Hooks/useModal";
import { useEffect, useState } from "react";
import Modal from "../Components/modal";
import useAuth from "../Hooks/useAuth";
import useDiary from "../Hooks/useDiary";
import usePassword from "../Hooks/usePassword";
import useNickname from "../Hooks/useNickname";

function Profile() {
  const { userInfo, userRecord, userConfig } =
    useRecoilValue<IUserState>(userState);
  const { signOut, signOutVariants } = useAuth();
  const { clearDiaries, clearDiariesVariants } = useDiary();
  const {
    saveTempDiaryVariants,
    tempDiary,
    runSaveTempDiary,
    runRemoveTempDiary,
  } = useTempDiary();
  const { passwordVariants, passwordForm } = usePassword();
  const { nicknameVariants, nicknameForm } = useNickname();
  const { modalProps, modalAnswer, modalOn, createModal } = useModal();
  const [modalId, setModalId] = useState<ModalId>(null);

  useEffect(() => {
    if (tempDiary) {
      setModalId("tempDiary");
    }
  }, [tempDiary]);

  useEffect(() => {
    switch (modalId) {
      case "tempDiary":
        createModal(saveTempDiaryVariants);
        break;
      case "nickname":
        createModal(nicknameVariants);
        break;

      case "password":
        createModal(passwordVariants);
        break;

      case "clearDiaries":
        createModal(clearDiariesVariants);
        break;

      case "signOut":
        createModal(signOutVariants);
        break;
    }
    setModalId(null);
  }, [modalId]);

  useEffect(() => {
    if (modalProps && modalAnswer !== null) {
      const { modalId } = modalProps;
      switch (modalId) {
        case saveTempDiaryVariants.modalId:
          if (modalAnswer) {
            runSaveTempDiary();
          }
          runRemoveTempDiary();
          break;
        case nicknameVariants.modalId:
          if (modalAnswer) {
            nicknameForm();
          }
          break;
        case passwordVariants.modalId:
          if (modalAnswer) {
            passwordForm();
          }
          break;
        case clearDiariesVariants.modalId:
          if (modalAnswer) {
            clearDiaries();
          }
          break;
        case signOutVariants.modalId:
          if (modalAnswer) {
            signOut();
          }
          break;
      }
    }
  }, [modalAnswer]);

  return (
    <Wrapper>
      <UserInfo className="section">
        <Label>E-mail</Label>
        <Value>{userInfo.email}</Value>
        <Label>NickName</Label>
        <Value>{userConfig.nickname}</Value>
        <Label>Diaries</Label>
        <Value>{userRecord.diaries.length}</Value>
        <Label>비밀번호 설정</Label>
        <Value>
          {userConfig.password !== defaultUserState.userConfig.password
            ? "설정 완료"
            : "아직 안함"}
        </Value>
      </UserInfo>
      <UserConfig className="section">
        <Button onClick={() => setModalId("nickname")}>
          닉네임 생성 및 변경
        </Button>
        <Button onClick={() => setModalId("password")}>
          비밀번호 생성 및 변경
        </Button>
      </UserConfig>
      <DangerZone className="section">
        <Button onClick={() => setModalId("clearDiaries")}>
          모든 다이어리 삭제
        </Button>
        <Button onClick={() => setModalId("signOut")}>회원 탈퇴</Button>
      </DangerZone>
      {modalOn && <Modal {...modalProps} />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .section {
    background-color: ${(props) => props.theme.background};
    border-radius: 10px;
    gap: 20px;
    margin: 20px;
    padding: 20px;
    box-shadow: ${(props) => props.theme.boxShadow};
  }
`;

const Label = styled.div``;

const Value = styled.div``;

const UserInfo = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
`;

const UserConfig = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  & > * {
    &:hover {
      background-color: ${(props) => props.theme.backgroundDarker};
    }
  }
`;

const DangerZone = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  & > * {
    &:hover {
      background-color: ${(props) => props.theme.highlightNegative};
    }
  }
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  background-color: ${(props) => props.theme.backgroundLighter};
  box-shadow: ${(props) => props.theme.boxShadow};
  border-radius: 10px;
  cursor: pointer;
`;

export default Profile;
