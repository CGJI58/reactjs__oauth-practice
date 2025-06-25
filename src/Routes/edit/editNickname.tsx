import styled from "styled-components";
import NicknameForm from "../../Components/edit/nicknameForm";
import { useRecoilValue } from "recoil";
import { IUserConfig } from "../../types/types";
import { userConfigState } from "../../States/atoms";

function EditNickname() {
  const { nickname } = useRecoilValue<IUserConfig>(userConfigState);
  return (
    <Wrapper>
      <CurrentStatus>
        <label>현재 닉네임</label>
        <span>{nickname}</span>
      </CurrentStatus>
      <NicknameForm />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  width: 100%;
  max-width: 600px;
  align-self: center;
  justify-self: center;
  padding: 10px;
`;

const CurrentStatus = styled.div`
  display: flex;
  height: 40px;
  gap: 20px;
  & > label {
    user-select: none;
  }
`;

export default EditNickname;
