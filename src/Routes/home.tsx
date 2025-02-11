import styled from "styled-components";
import { defaultUserState, IUserState, loginState, userState } from "../atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import Blind from "../Components/blind";
import UserRecord from "../Components/userrecord";
import { useEffect } from "react";
import { getUserByCookie } from "../utility/utility";

function Home() {
  const [user, setUser] = useRecoilState<IUserState>(userState);
  const login = useRecoilValue(loginState);
  useEffect(() => {
    if (user === defaultUserState) {
      getUserByCookie().then((user) => setUser(user));
    }
  }, [login]);

  const moveTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Wrapper>
      {user.userInfo.email === "" ? (
        <Blind login={login} />
      ) : (
        <UserRecord user={user} />
      )}
      <ScrollTopBtn onClick={() => moveTop()}>🔝</ScrollTopBtn>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 10px;
`;

const ScrollTopBtn = styled.div`
  position: fixed;
  bottom: 50px;
  right: 50px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  cursor: pointer;
  opacity: 0.3;
  transition: all 0.3s;
  &:hover {
    opacity: 0.8;
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

export default Home;
