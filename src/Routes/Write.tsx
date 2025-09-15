import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import { createDiary } from "../util/diaryUtility";
import { Subscription } from "react-hook-form/dist/utils/createSubject";
import { IDiary } from "../types/types";
import useDiary from "../Hooks/useDiary";

export interface IDiaryForm extends Omit<IDiary, "date" | "id"> {}

function Write() {
  const navigate = useNavigate();
  const location = useLocation();
  const originalDiary: IDiary = location.state.diary;
  const query = new URLSearchParams(location.search);
  const mode = query.get("mode") as "create" | "modify";
  const [diary, setDiary] = useState<IDiary>(originalDiary);
  const { register, setValue, handleSubmit, watch } = useForm<IDiaryForm>();
  const { saveDiary } = useDiary();
  const subscriptionRef = useRef<Subscription | null>(null);

  const tempSave = debounce((tempDiary: IDiaryForm) => {
    localStorage.setItem("tempDiary", JSON.stringify(tempDiary));
  }, 500);

  const saveTempDiary = () => {
    saveDiary(diary);
    localStorage.removeItem("tempDiary");
    navigate("/");
  };

  // Load diary information into the form
  useEffect(() => {
    const { title, text } = diary;
    setValue("title", title);
    setValue("text", text);
  }, []);

  useEffect(() => {
    if (diary !== originalDiary) {
      saveTempDiary();
    }
  }, [diary]);

  /**
   * Initialize write page and set beforeunload eventListener
   * 헤더를 클릭하여 페이지를 벗어나는 경우에 대한 보호는 saveDiary 에서 담당할 것.
   */
  useEffect(() => {
    // This will protect the form data when user close or refresh page.
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };
    const handleUnload = () => {
      localStorage.removeItem("tempDiary");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleUnload);
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

  const onValid = ({ title, text }: IDiaryForm) => {
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
  font-size: ${(props) => props.theme.fontSizes.m}px;
  margin-top: 30px;
  width: 100%;
  align-self: center;
  justify-self: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 50px;
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
    min-height: 300px;
    max-height: 600px;
    resize: vertical;
    line-height: 180%;
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
