import { useEffect, useState } from "react";
import styled from "styled-components";
import { loadNowLoggedInUser, logOut } from "../model/localstorage";
import { useNavigate } from "react-router-dom";

interface IUserinfo {
  onLogOutRerender: () => void;
}
function Userinfo({ onLogOutRerender }: IUserinfo) {
  const [userData, setUserData] = useState();
  const navigate = useNavigate();
  // useEffect(() => {
  //   const token = loadNowLoggedInUser();
  //   fetch(`http://localhost:8000/users/${token}`)
  //     .then((response) => response?.json())
  //     .then((userData) => setUserData(userData));
  // }, []);
  const onLogOut = () => {
    navigate("/");
    logOut();
    onLogOutRerender();
  };
  return (
    <Wrapper>
      <LogOut onClick={() => onLogOut()}>❌</LogOut>
      <span>{userData}</span>
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
