import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { IDiary } from "../States/atoms";
import useGetUserByCookie from "../Hooks/useGetUserByCookie";
import { useEffect } from "react";

function Read() {
  const location = useLocation();
  const diary: IDiary = location.state.diary;
  useGetUserByCookie();
  useEffect(() => {
    console.log(diary);
  }, []);

  return <Wrapper>{diary.text}</Wrapper>;
}

const Wrapper = styled.div``;

export default Read;
