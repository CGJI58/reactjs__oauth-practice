import styled from "styled-components";
import { defaultUserState, IUserState, userState } from "../atoms";
import { useRecoilState } from "recoil";
import Blind from "../Components/blind";
import { useEffect } from "react";
import { getUserByHashCode } from "../utility/utility";
import UserRecord from "../Components/userrecord";

function Home() {
  const [user, setUser] = useRecoilState<IUserState>(userState);

  useEffect(() => {
    const hashCode = localStorage.getItem("hashCode");
    if (user.hashCode === "" && hashCode) {
      getUserByHashCode(hashCode).then((userData) => setUser(userData));
    }
  }, []);

  return (
    <Wrapper>
      {user.hashCode === "" ? <Blind /> : <UserRecord user={user} />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 10px;
`;

export default Home;
