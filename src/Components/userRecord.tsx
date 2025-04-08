import styled from "styled-components";
import Diaries from "./diaries";
import useUpdate from "../Hooks/useUpdate";

function UserRecord() {
  useUpdate();
  return (
    <Wrapper>
      <Diaries />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 10px;
`;

export default UserRecord;
