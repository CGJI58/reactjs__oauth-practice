import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { userState } from "../States/atoms";
import { Link } from "react-router-dom";

function Nickname() {
  const {
    userRecord: { nickname },
  } = useRecoilValue(userState);

  return (
    <Wrapper>
      <Link to="profile">{nickname}</Link>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

export default Nickname;
