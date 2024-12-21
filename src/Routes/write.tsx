import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { IDiary, IUserState, userState } from "../atoms";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface IForm {
  title: string;
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

function Write() {
  const navigate = useNavigate();
  const setUser = useSetRecoilState<IUserState>(userState);
  const { register, setValue, handleSubmit } = useForm<IForm>();

  const onValid = ({ title, text }: IForm) => {
    const newDiary: IDiary = { date: generateDate(), title, text };
    setUser((prev) => {
      const prevDiaries = prev.userRecord.diaries;
      const newUser: IUserState = {
        ...prev,
        userRecord: { ...prev.userRecord, diaries: [newDiary, ...prevDiaries] },
      };
      return newUser;
    });
    setValue("title", "");
    setValue("text", "");
    navigate("/");
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onValid)}>
        <input {...register("title", { required: true })} placeholder="Title" />
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
  width: 80%;
  align-self: center;
  justify-self: center;
  padding: 10px 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  * {
    padding: 5px;
  }
  textarea {
    height: 200px;
    resize: none;
  }
`;

export default Write;
