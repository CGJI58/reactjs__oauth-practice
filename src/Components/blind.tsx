import { useEffect, useState } from "react";

const LOGIN_SUCCESS = "잠시만 기다려주세요. 사용자 정보를 받아오는 중입니다...";
const LOGIN_FAIL = "로그인을 해주세요.";

function Blind() {
  const [message, setMessage] = useState("");
  return <span>{message}</span>;
}

export default Blind;
