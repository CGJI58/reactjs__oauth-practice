import styled from "styled-components";
import { useRecoilState } from "recoil";
import { defaultUserState, IDiary, IUserState, userState } from "../atoms";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getUserByCookie } from "../utility/utility";

interface IDiaryForm extends Omit<IDiary, "date"> {}
type IOriginalDiary = { diary: IDiary };

const generateDate = (dateValue: number) => {
  const now = new Date(dateValue);
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
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const mode = query.get("mode") as "create" | "modify";
  const [user, setUser] = useRecoilState<IUserState>(userState);
  const {
    diary: {
      id: originalId,
      title: originalTitle,
      text: originalText,
      date: originalDate,
    },
  }: IOriginalDiary = location.state;

  const { register, setValue, handleSubmit, getValues } = useForm<IDiaryForm>();

  useEffect(() => {
    if (user === defaultUserState) {
      getUserByCookie().then((user) => setUser(user));
    }
    if (mode === "modify") {
      setValue("title", originalTitle);
      setValue("text", originalText);
    }
  }, []);

  const onValid = ({ title, text }: IDiaryForm) => {
    const dateValue = mode === "modify" ? Number(originalId) : Date.now();
    const date = mode === "modify" ? originalDate : generateDate(dateValue);
    const newDiary: IDiary = { id: dateValue.toString(), date, title, text };
      setUser((prev) => {
        const originalDiaries = prev.userRecord.diaries;
        const modifiedDiaries = originalDiaries.filter(
        (diary) => diary.id !== newDiary.id
        );
        const newUser: IUserState = {
          ...prev,
          userRecord: {
            ...prev.userRecord,
          diaries: [newDiary, ...modifiedDiaries],
        },
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
