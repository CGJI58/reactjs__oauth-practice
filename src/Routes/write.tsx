import styled from "styled-components";
import { useRecoilState } from "recoil";
import {
  defaultUserState,
  IDiary,
  IUserState,
  userState,
} from "../States/atoms";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getUserByCookie } from "../Api/api";
import { debounce } from "lodash";
import { createDiary } from "../util/diaryUtility";
import useSaveDiary from "../Hooks/useSaveDiary";
import { Subscription } from "react-hook-form/dist/utils/createSubject";

export interface IForm extends Omit<IDiary, "date" | "id"> {}

function Write() {
  const navigate = useNavigate();
  const location = useLocation();
  const originalDiary: IDiary = location.state.diary;
  const query = new URLSearchParams(location.search);
  const mode = query.get("mode") as "create" | "modify";
  const [user, setUser] = useRecoilState<IUserState>(userState);
  const [diary, setDiary] = useState<IDiary>(originalDiary);
  const { register, setValue, handleSubmit, watch } = useForm<IForm>();
  const { saveDiary } = useSaveDiary();
  const subscriptionRef = useRef<Subscription | null>(null);

  const tempSave = debounce((tempDiary: IForm) => {
    localStorage.setItem("tempDiary", JSON.stringify(tempDiary));
  }, 500);

  // Load diary information into the form
  useEffect(() => {
    if (user === defaultUserState) {
      getUserByCookie().then((user) => setUser(user));
    }
    const { title, text } = diary;
    setValue("title", title);
    setValue("text", text);
  }, []);

  useEffect(() => {
    if (diary !== originalDiary) {
      saveDiary(diary);
      localStorage.removeItem("tempDiary");
      navigate("/");
    }
  }, [diary]);

  /**
   * Initialize write page and set beforeunload eventListener
   * 헤더를 클릭하여 페이지를 벗어나는 경우에 대한 보호는 useSaveDiary.ts 에서 담당할 것.
   */
  useEffect(() => {
    // This will protect the form data when user close or refresh page.
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    // Dynamically store validated Form data into Local Storage in real-time
    subscriptionRef.current = watch(({ title = "", text = "" }) => {
      tempSave({ title, text });
    });
    return () => {
      tempSave.cancel();
      subscriptionRef.current?.unsubscribe();
    };
  }, [watch]);

  const onValid = ({ title, text }: IForm) => {
    tempSave.cancel();
    subscriptionRef.current?.unsubscribe();
    if (mode === "create") {
      const createdDiary = createDiary({ title, text });
      createdDiary
        ? setDiary(() => createdDiary)
        : console.error("fail to submit: no created diary.");
    }
    if (mode === "modify") {
      const modifiedDiary = { ...diary, title, text };
      setDiary(() => modifiedDiary);
    }
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
