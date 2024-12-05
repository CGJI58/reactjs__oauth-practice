import styled from "styled-components";
import { useRecoilState } from "recoil";
import { IDiary, IUserState, userState } from "../atoms";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { updateUser } from "../utility/utility";

interface IForm {
  text: string;
}

const generateDate = () => {
  const now = new Date(Date.now());
  const year = String(now.getFullYear()).slice(-2);
  const mon = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hour = String(now.getHours()).padStart(2, "0");
  const min = String(now.getMinutes()).padStart(2, "0");
  const sec = String(now.getSeconds()).padStart(2, "0");
  return `${year}${mon}${day} ${hour}:${min}:${sec}`;
};
//이후에 파일명을 적절한걸로 바꾸거나, Home에 넣을컴포넌트로 대체할 것
function Userinfo() {
  const [user, setUser] = useRecoilState<IUserState>(userState);
  const { register, setValue, handleSubmit } = useForm<IForm>();

  useEffect(() => {
    updateUser(user);
  }, [user]);

  const onValid = ({ text }: IForm) => {
    const newDiary: IDiary = { date: generateDate(), text };
    setUser((prev) => {
      const prevDiaries = prev.userInfo.diaries ?? [];
      const newUser: IUserState = {
        ...prev,
        userInfo: { ...prev.userInfo, diaries: [newDiary, ...prevDiaries] },
      };
      return newUser;
    });
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

export default Userinfo;
