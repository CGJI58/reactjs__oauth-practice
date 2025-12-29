import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IDiary, IDiaryState } from "../types/types";
import useTypeGuard from "../Hooks/useTypeGuard";
import useDiary from "../Hooks/useDiary";
import { defaultDiary } from "../constants/defaults";
import useModalContext from "../Hooks/useModalContext";

function Write() {
  // protect form data
  useEffect(() => {
    // if (user close or refresh page)
    // Pause and show alert message
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      //새로고침
      event.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const navigate = useNavigate();
  const location = useLocation();
  const originalDiary: IDiary = location.state?.diary ?? defaultDiary;
  const query = new URLSearchParams(location.search);
  const { isWriteOption } = useTypeGuard();
  const { saveDiary } = useDiary();
  const { register, setValue, handleSubmit } = useForm<IDiary>({
    defaultValues: defaultDiary,
  });
  const [diaryState, setDiaryState] = useState<IDiaryState>({
    mode: undefined,
    ready: false,
    diary: originalDiary,
  });
  const { modalAction, modalResponse } = useModalContext();

  // handle diaryState
  useEffect(() => {
    if (!diaryState.ready) {
      const rawMode = query.get("mode");
      if (isWriteOption(rawMode)) {
        const { title, text, userId } = diaryState.diary;

        if (userId === null) {
          console.error("Unauthorized access attempt detected.");
          navigate("/");
        }

        if (rawMode === "modify") {
          setValue("title", title);
          setValue("text", text);
        }

        setDiaryState((prev) => ({ ...prev, mode: rawMode }));
      } else {
        console.error("Unauthorized access attempt detected.");
        navigate("/");
      }
    } else {
      modalAction({ modalId: "saveDiary" });
    }
  }, [diaryState.ready]);

  const onValid = (validDiaryForm: { title: string; text: string }) => {
    const { title, text } = validDiaryForm;
    setDiaryState((prev) => ({
      ...prev,
      diary: { ...prev.diary, title, text },
      ready: true,
    }));
  };

  useEffect(() => {
    if (diaryState.ready) {
      const answer = modalResponse.confirm;
      const { diaryId, userId, title, text } = diaryState.diary;
      if (answer === true) {
        if (!userId) return;
        saveDiary({ diaryId, userId, title, text });
      }
      if (answer === false) {
        setDiaryState((prev) => ({ ...prev, ready: false }));
      }
    }
  }, [modalResponse]);

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
