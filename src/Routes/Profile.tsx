import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IUserConfig, IUserState } from "../types/types";
import { userConfigState, userState } from "../States/atoms";
import useModalContext from "../Hooks/useModalContext";
import useNickname from "../Hooks/useNickname";
import useUIScale from "../Hooks/useUIScale";
import useDiary from "../Hooks/useDiary";
import useAuth from "../Hooks/useAuth";
import { useEffect } from "react";

function Profile() {
  const { userInfo, userRecord, userConfig } =
    useRecoilValue<IUserState>(userState);
  const setUserConfig = useSetRecoilState<IUserConfig>(userConfigState);
  const { nicknameForm } = useNickname();
  const { handleUIScale } = useUIScale();
  const { clearDiaries } = useDiary();
  const { signOut } = useAuth();
  const { modalAction, modalResponse } = useModalContext();

  useEffect(() => {
    if (modalResponse.confirm) {
      switch (modalResponse.modalId) {
        case "nickname":
          nicknameForm();
          break;
        case "UIScale":
          handleUIScale(modalResponse.rangeValue);
          break;
        case "clearDiaries":
          clearDiaries();
          break;
        case "signOut":
          signOut();
          break;
      }
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
        <Button onClick={() => modalAction({ modalId: "nickname" })}>
          닉네임 변경
        </Button>
        <Button
          onClick={() =>
            setUserConfig((prev) => ({
              ...prev,
              isDarkTheme: !prev.isDarkTheme,
            }))
          }
        >{`테마 변경: ${userConfig.isDarkTheme ? "밝게" : "어둡게"}`}</Button>
        <Button onClick={() => modalAction({ modalId: "UIScale" })}>
          화면 확대 / 축소
        </Button>
        <Button onClick={() => modalAction({ modalId: "logOut" })}>
          로그 아웃
        </Button>
      </UserConfig>
      <DangerZone className="section">
        <Button onClick={() => modalAction({ modalId: "clearDiaries" })}>
          모든 다이어리 삭제
        </Button>
        <Button onClick={() => modalAction({ modalId: "signOut" })}>
          회원 탈퇴
        </Button>
      </DangerZone>
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
