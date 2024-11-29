import { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { IUserState, userState } from "../atoms";

async function logOut(user: IUserState) {
  await fetch(`http://localhost:8000/users/logout`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user }),
  });
}

function Userinfo() {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState<IUserState>(userState);

  useEffect(() => {
    console.log(user);
  }, []);

  const onLogOut = () => {
    logOut(user);
    setUser((prev) => ({ ...prev, login: false }));
    navigate("/");
  };
  return (
    <Wrapper>
      <LogOut onClick={() => onLogOut()}>❌</LogOut>
      <span>{user.userInfo.email}</span>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
`;

const LogOut = styled.div`
  display: flex;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

export default Userinfo;
