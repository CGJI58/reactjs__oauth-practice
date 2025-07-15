import styled from "styled-components";
import NicknameForm from "../../Components/edit/nicknameForm";

function EditNickname() {
  return (
    <Wrapper>
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

export default EditNickname;
