import styled from "styled-components";
import Diaries from "./Diaries";

function UserRecord() {
  return (
    <Wrapper>
      <Diaries />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default UserRecord;
