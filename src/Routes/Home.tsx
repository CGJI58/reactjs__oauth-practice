import styled from "styled-components";
import { IUserState, userState } from "../atoms";
import { useRecoilState } from "recoil";
import Blind from "../Components/Blind";
import { useEffect } from "react";
import { getUserByHashCode } from "../utility/utility";
import UserRecord from "../Components/Userrecord";

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
      {user.hashCode !== "" ? <UserRecord user={user} /> : <Blind />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 10px;
`;

export default Home;
