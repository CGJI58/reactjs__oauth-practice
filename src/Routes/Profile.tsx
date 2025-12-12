import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IUserConfig, IUserState } from "../types/types";
import { userConfigState, userState } from "../States/userAtom";
import useModalContext from "../Hooks/useModalContext";
import useNickname from "../Hooks/useNickname";
import useUIScale from "../Hooks/useUIScale";
import useDiary from "../Hooks/useDiary";
import useAuth from "../Hooks/useAuth";
import { useEffect } from "react";
import { backgroundGradient } from "../theme/animations";

function Profile() {
  const { userInfo, userConfig } = useRecoilValue<IUserState>(userState);
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
      </UserInfo>
      <UserConfig className="section">
        <Button
          value="닉네임 변경"
          onClick={() => modalAction({ modalId: "nickname" })}
        />
        <Button
          value={`테마 변경: ${userConfig.isDarkTheme ? "밝게" : "어둡게"}`}
          onClick={() =>
            setUserConfig((prev) => ({
              ...prev,
              isDarkTheme: !prev.isDarkTheme,
            }))
          }
        />
        <Button
          value="화면 확대 / 축소"
          onClick={() => modalAction({ modalId: "UIScale" })}
        />
        <Button
          value="로그 아웃"
          onClick={() => modalAction({ modalId: "logOut" })}
        />
      </UserConfig>
      <DangerZone className="section">
        <Button
          value="모든 다이어리 삭제"
          onClick={() => modalAction({ modalId: "clearDiaries" })}
        />
        <Button
          value="회원 탈퇴"
          onClick={() => modalAction({ modalId: "signOut" })}
        />
      </DangerZone>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .section {
    font-size: ${(props) => props.theme.fontSizes.m}px;
    background-color: ${(props) => props.theme.backgroundRegular};
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

  & > *:hover,
  & > *:focus {
    background-color: ${(props) => props.theme.backgroundDarker};
  }
`;

const DangerZone = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  & > * {
    &:focus {
      animation: ${({ theme }) =>
          backgroundGradient(theme.backgroundDarker, theme.highlightNegative)}
        1s infinite linear;
    }
    &:hover {
      background-color: ${(props) => props.theme.highlightNegative};
    }
  }
`;

const Button = styled.input.attrs({ type: "button" })`
  color: ${(props) => props.theme.text};
  display: flex;
  justify-content: center;
  padding: 10px;
  background-color: ${(props) => props.theme.backgroundLighter};
  box-shadow: ${(props) => props.theme.boxShadow};
  border-radius: 10px;
  user-select: none;
  cursor: pointer;
`;

export default Profile;
