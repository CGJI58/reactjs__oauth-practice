import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import { createDiary } from "../util/diaryUtility";
import useSaveDiary from "../Hooks/useSaveDiary";
import { Subscription } from "react-hook-form/dist/utils/createSubject";
import useGetUserByCookie from "../Hooks/useGetUserByCookie";
import { IDiary } from "../types/types";

export interface IForm extends Omit<IDiary, "date" | "id"> {}

function Write() {
  const navigate = useNavigate();
  const location = useLocation();
  const originalDiary: IDiary = location.state.diary;
  const query = new URLSearchParams(location.search);
  const mode = query.get("mode") as "create" | "modify";
  const [diary, setDiary] = useState<IDiary>(originalDiary);
  const { register, setValue, handleSubmit, watch } = useForm<IForm>();
  const { saveDiary } = useSaveDiary();
  const subscriptionRef = useRef<Subscription | null>(null);

  const tempSave = debounce((tempDiary: IForm) => {
    localStorage.setItem("tempDiary", JSON.stringify(tempDiary));
  }, 500);

  useGetUserByCookie();

  // Load diary information into the form
  useEffect(() => {
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
        <input
          id="title"
          {...register("title", { required: true })}
          placeholder="Title"
        />
        <textarea
          id="text"
          {...register("text", { required: true })}
          placeholder="write your diary"
        />
        <input id="submit" type="submit" value="저장" />
      </Form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 30px;
  width: 100%;
  max-width: 600px;
  align-self: center;
  justify-self: center;
  padding: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  * {
    margin: 0;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background: ${(props) => props.theme.backgroundLighter};
    box-shadow: ${(props) => props.theme.boxShadow};
    outline: none;
    font: inherit;
    color: inherit;
  }
  #text {
    height: 300px;
    resize: none;
  }
  #submit {
    transition: 100ms ease-in-out;
    &:hover,
    &:focus {
      background-color: ${(props) => props.theme.backgroundDarker};
    }
  }
`;

export default Write;
