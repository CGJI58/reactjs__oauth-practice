import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IUserConfig, IUserState, ModalId } from "../types/types";
import { userConfigState, userState } from "../States/atoms";
import useTempDiary from "../Hooks/useTempDiary";
import useModal from "../Hooks/useModal";
import { useEffect, useState } from "react";
import Modal from "../Components/modal/ModalIndex";
import useAuth from "../Hooks/useAuth";
import useDiary from "../Hooks/useDiary";
import useNickname from "../Hooks/useNickname";
import useUIScale from "../Hooks/useUIScale";
import {
  clearDiariesVariants,
  UIScaleVariants,
  nicknameVariants,
  signOutVariants,
  tempDiaryVariants,
} from "../constants/variants";
import { defaultModalResponse } from "../constants/defaults";

function Profile() {
  const { userInfo, userRecord, userConfig } =
    useRecoilValue<IUserState>(userState);
  const setUserConfig = useSetRecoilState<IUserConfig>(userConfigState);
  const { tempDiary, runSaveTempDiary, runRemoveTempDiary } = useTempDiary();
  const { nicknameForm } = useNickname();
  const { clearDiaries } = useDiary();
  const { handleUIScale } = useUIScale();
  const { signOut } = useAuth();
  const { modalProps, modalResponse, createModal } = useModal();
  const [modalId, setModalId] = useState<ModalId>(null);

  useEffect(() => {
    if (tempDiary.status === "loaded") {
      setModalId("tempDiary");
    }
  }, [tempDiary.status]);

  useEffect(() => {
    switch (modalId) {
      case "tempDiary":
        createModal(tempDiaryVariants);
        break;
      case "nickname":
        createModal(nicknameVariants);
        break;
      case "UIScale":
        createModal(UIScaleVariants);
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
    if (modalResponse !== defaultModalResponse) {
      if (modalResponse.confirm) {
        switch (modalProps.modalId) {
          case tempDiaryVariants.modalId:
            runSaveTempDiary();
            break;
          case nicknameVariants.modalId:
            nicknameForm();
            break;
          case UIScaleVariants.modalId:
            handleUIScale(modalResponse.rangeValue);
            break;
          case clearDiariesVariants.modalId:
            clearDiaries();
            break;
          case signOutVariants.modalId:
            signOut();
            break;
        }
      }
      if (modalId === "tempDiary") {
        runRemoveTempDiary();
      }
      setModalId(null);
    }
  }, [modalResponse]);

  return (
    <Wrapper>
      <UserInfo className="section">
        <Label>E-mail</Label>
        <Value>{userInfo.email}</Value>
        <Label>NickName</Label>
        <Value>{userConfig.nickname}</Value>
        <Label>Diaries</Label>
        <Value>{userRecord.diaries.length}</Value>
      </UserInfo>
      <UserConfig className="section">
        <Button onClick={() => setModalId("nickname")}>닉네임 변경</Button>
        <Button
          onClick={() =>
            setUserConfig((prev) => ({
              ...prev,
              isDarkTheme: !prev.isDarkTheme,
            }))
          }
        >{`테마 변경: ${userConfig.isDarkTheme ? "밝게" : "어둡게"}`}</Button>
        <Button onClick={() => setModalId("UIScale")}>화면 확대 / 축소</Button>
      </UserConfig>
      <DangerZone className="section">
        <Button onClick={() => setModalId("clearDiaries")}>
          모든 다이어리 삭제
        </Button>
        <Button onClick={() => setModalId("signOut")}>회원 탈퇴</Button>
      </DangerZone>
      <Modal {...modalProps} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .section {
    font-size: ${(props) => props.theme.fontSizes.m}px;
    background-color: ${(props) => props.theme.background};
    border-radius: 10px;
    gap: 20px;
    margin: 20px 0px;
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
`;

const DangerZone = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  & > * {
    &:hover {
      color: ${(props) => props.theme.highlightNegative};
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
  user-select: none;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.backgroundDarker};
  }
`;

export default Profile;
