import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { IUserState } from "../types/types";
import { userState } from "../States/userAtom";
import useModalContext from "../Hooks/useModalContext";
import useNickname from "../Hooks/useNickname";
import useUISettings from "../Hooks/useUISettings";
import useAuth from "../Hooks/useAuth";
import { useEffect } from "react";
import { backgroundGradient } from "../theme/animations";

function Setting() {
  const { userConfig } = useRecoilValue<IUserState>(userState);
  const { nicknameForm } = useNickname();
  const { handleUIScale, handleDarkMode } = useUISettings();
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
        case "signOut":
          signOut();
          break;
      }
    }
  }, [modalResponse]);

  return (
    <Wrapper>
      <Info className="section">
        <Label>NickName</Label>
        <Value>{userConfig.nickname}</Value>
      </Info>
      <UserConfig className="section">
        <Button
          value="닉네임 변경"
          onClick={() => modalAction({ modalId: "nickname" })}
        />
        <Button
          value={`테마 변경: ${userConfig.isDarkTheme ? "밝게" : "어둡게"}`}
          onClick={() => handleDarkMode()}
        />
        <Button
          value="화면 크기"
          onClick={() => modalAction({ modalId: "UIScale" })}
        />
        <Button
          value="로그 아웃"
          onClick={() => modalAction({ modalId: "logOut" })}
        />
      </UserConfig>
      <DangerZone className="section">
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

const Info = styled.div`
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

export default Setting;
