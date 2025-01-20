import styled from "styled-components";
import { useRecoilState } from "recoil";
import { defaultUserState, IDiary, IUserState, userState } from "../atoms";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getUserByCookie } from "../utility/utility";

type IDiaryForm = IDiary;
type IWrite = { diary: IDiary };

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
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const mode = query.get("mode") as "create" | "modify";
  const { diary }: IWrite = location.state;
  const [user, setUser] = useRecoilState<IUserState>(userState);

  useEffect(() => {
    if (user === defaultUserState) {
      getUserByCookie().then((user) => setUser(user));
    }
  }, []);

  const { register, setValue, handleSubmit } = useForm<IDiaryForm>();

  useEffect(() => {
    if (mode === "modify") {
      setValue("title", diary.title);
      setValue("text", diary.text);
    }
  }, []);

  const onValid = ({ title, text }: IDiaryForm) => {
    const date = mode === "create" ? generateDate() : diary.date;
    const newDiary: IDiary = { date, title, text };

    if (mode === "modify") {
      setUser((prev) => {
        const originalDiaries = prev.userRecord.diaries;
        const modifiedDiaries = originalDiaries.filter(
          (diary) => diary.date !== newDiary.date
        );
        const newUser: IUserState = {
          ...prev,
          userRecord: {
            ...prev.userRecord,
            diaries: modifiedDiaries,
          },
        };
        return newUser;
      });
    }

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
