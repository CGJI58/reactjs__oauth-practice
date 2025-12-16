import styled from "styled-components";
import Board from "./Board";

function UserRecord() {
  return (
    <Wrapper>
      <Board />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default UserRecord;
