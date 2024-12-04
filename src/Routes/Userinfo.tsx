import styled from "styled-components";
import { useRecoilState } from "recoil";
import { IDiary, IUserState, userState } from "../atoms";
import { useForm } from "react-hook-form";

interface IForm {
  text: string;
}

const generateDate = () => {
  const now = new Date(Date.now());
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const hh = String(now.getHours()).padStart(2, "0");
  const mi = String(now.getMinutes()).padStart(2, "0");
  return `${yy}${mm}${dd} ${hh}:${mi}`;
};

function Userinfo() {
  const [user, setUser] = useRecoilState<IUserState>(userState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ text }: IForm) => {
    setUser((prev) => {
      const newDiary: IDiary = { date: generateDate(), text };
      const prevDiaries = prev.userInfo.diaries ?? [];
      const newUser: IUserState = {
        login: prev.login,
        userInfo: { ...prev.userInfo, diaries: [...prevDiaries, newDiary] },
      };
      return newUser;
    });
    //여기서 백엔드도 갱신해줘야됨.
    setValue("text", "");
  };
  return (
    <Wrapper>
      <span>{`Hello, ${user.userInfo.nickname ?? user.userInfo.email}!`}</span>
      <Form onSubmit={handleSubmit(onValid)}>
        <textarea
          {...register("text", { required: true })}
          placeholder="write your diary"
        />
        <input type="submit" value="저장" />
      </Form>
      <Diaries>
        {user.userInfo.diaries?.map((diary, index) => (
          <div key={index}>{`${diary.text}, ${diary.date}`}</div>
        ))}
      </Diaries>
      <SaveBtn onClick={() => console.log(user)}>저장</SaveBtn>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
`;

const Form = styled.form`
  textarea {
    width: 300px;
    height: 200px;
  }
`;

const Diaries = styled.div``; //이거 나중에 컴포넌트로 따로 빼자

const SaveBtn = styled.button`
  //Diaries 컴포넌트에 포함시킬 것
  width: 100px;
`;

export default Userinfo;
