import styled from "styled-components";
import { useRecoilState } from "recoil";
import { defaultUserState, IDiary, IUserState, userState } from "../atoms";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getUserByCookie } from "../utility/utility";
import { debounce } from "lodash";
import useSaveDiary from "../hooks/onsave";

interface IForm extends Omit<IDiary, "date" | "id"> {}

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

const tempSave = debounce((diary: IDiary) => {
  console.log(diary);
  localStorage.setItem("tempDiary", JSON.stringify(diary));
}, 1000);

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
  }: { diary: IDiary } = location.state;
  const { register, setValue, handleSubmit, getValues, watch } =
    useForm<IForm>();
  const { onSave } = useSaveDiary();

  useEffect(() => {
    if (user === defaultUserState) {
      getUserByCookie().then((user) => setUser(user));
    }
    if (mode === "modify") {
      setValue("title", originalTitle);
      setValue("text", originalText);
    }
  }, []);

  useEffect(() => {
    localStorage.clear();
    window.addEventListener("beforeunload", onRefresh);
    return () => {
      window.removeEventListener("beforeunload", onRefresh);
    };
  }, []);

  useEffect(() => {
    const subscription = watch(({ title, text }) => {
      if (title && text) {
        const tempDiary = generateDiary({ title, text });
        tempSave(tempDiary);
      } else {
        localStorage.clear();
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onValid = ({ title, text }: IForm) => {
    const newDiary = generateDiary({ title, text });
    onSave(newDiary);
    localStorage.clear();
    navigate("/");
  };

  const onRefresh = (event: BeforeUnloadEvent) => {
    const { title, text } = getValues();
    if (title !== originalTitle || text !== originalText) {
      event.preventDefault();
      // 브라우저에 기본으로 내장된 confirm alert 가 실행됨.
    }
  };

  const generateDiary = ({ title, text }: IForm) => {
    const dateValue = mode === "modify" ? Number(originalId) : Date.now();
    const date = mode === "modify" ? originalDate : generateDate(dateValue);
    const newDiary: IDiary = { id: dateValue.toString(), date, title, text };
    return newDiary;
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
