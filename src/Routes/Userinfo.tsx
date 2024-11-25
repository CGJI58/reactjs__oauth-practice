import { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { defaultUserState, IUserinfo, IUserState, userState } from "../atoms";

async function getUserinfo(ghCode: string): Promise<IUserinfo> {
  const userinfo: IUserinfo = await (
    await fetch(`http://localhost:8000/users/${ghCode}`)
  ).json();
  return userinfo;
}

async function logOut() {
  //BE에 접근해서 ghCode랑 accesstoken을 지우는 함수.
}

function Userinfo() {
  const navigate = useNavigate();
  const [{ ghCode, userinfo }, setUser] = useRecoilState<IUserState>(userState);

  useEffect(() => {
    getUserinfo(ghCode).then((userinfo) =>
      setUser((prev) => ({ ...prev, userinfo }))
    );
  }, []);

  const onLogOut = () => {
    setUser(defaultUserState);
    //이 때 백엔드에서도 ghCode랑 accesstoken 정보를 지워줘야함.
    navigate("/");
  };
  return (
    <Wrapper>
      <LogOut onClick={() => onLogOut()}>❌</LogOut>
      <span>{userinfo.email}</span>
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
