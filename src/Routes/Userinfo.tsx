import { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { defaultUserState, IUserState, userState } from "../atoms";

interface IUserinfo {
  //BE 쪽 작업 덜해서 임시 문자열 데이터 받음
  userinfo: string;
}

async function getUserinfo(ghCode: string) {
  const { userinfo }: IUserinfo = await (
    await fetch(`http://localhost:8000/users/${ghCode}`)
  ).json();
  return userinfo;
}

function Userinfo() {
  const navigate = useNavigate();
  const [{ ghCode, userinfo }, setUser] = useRecoilState<IUserState>(userState);

  useEffect(() => {
    getUserinfo(ghCode)
      .then((userinfo) => setUser((prev) => ({ ...prev, userinfo })))
      .then(() => console.log("userinfo: ", userinfo));
  }, [userinfo]);

  const onLogOut = () => {
    setUser(defaultUserState);
    navigate("/");
  };
  return (
    <Wrapper>
      <LogOut onClick={() => onLogOut()}>❌</LogOut>
      <span>
        {"일단 userinfo만 가져오고, 제대로 되는거 확인 되면 이메일도 가져올 것"}
      </span>
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
