import styled from "styled-components";
import { IDiary, IUserState, userState } from "../States/atoms";
import { useRecoilValue } from "recoil";
import Blind from "../Components/blind";
import UserRecord from "../Components/userRecord";
import ScrollTopBtn from "../Components/scrollTopBtn";
import useGetUserByCookie from "../Hooks/useGetUserByCookie";
import { createDiary, getTempDiary } from "../util/diaryUtility";
import { useEffect, useState } from "react";
import useSaveDiary from "../Hooks/useSaveDiary";

function Home() {
  const user = useRecoilValue<IUserState>(userState);
  const [diary, setDiary] = useState<IDiary | null>(null);
  const { saveDiary } = useSaveDiary();

  useEffect(() => {
    const tempDiary = getTempDiary();
    if (tempDiary) {
      const confirm = window.confirm("작성하던 내용을 저장하시겠습니까?");
      if (confirm) {
        const diary = createDiary(tempDiary);
        setDiary(diary);
      }
      localStorage.removeItem("tempDiary");
    }
  }, []);

  useEffect(() => {
    if (diary) {
      saveDiary(diary);
      setDiary(null);
    }
  }, [diary]);
  useGetUserByCookie();

  return (
    <Wrapper>
      {user.userInfo.email === "" ? <Blind /> : <UserRecord />}
      <ScrollTopBtn />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 10px;
`;

export default Home;
