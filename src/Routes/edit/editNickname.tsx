import styled from "styled-components";
import NicknameForm from "../../Components/edit/nicknameForm";
import { useRecoilValue } from "recoil";
import { IUserConfig } from "../../types/types";
import { userConfigState } from "../../States/atoms";

function EditNickname() {
  const { nickname } = useRecoilValue<IUserConfig>(userConfigState);
  return (
    <Wrapper>
      <label>현재 닉네임:</label>
      <span>{nickname}</span>
      <NicknameForm />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 30px;
  width: 100%;
  max-width: 600px;
  align-self: center;
  justify-self: center;
  padding: 10px;
`;

export default EditNickname;
