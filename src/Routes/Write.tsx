import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { debounce, isEqual, pick } from "lodash";
import { createDiary } from "../util/diaryUtility";
import { Subscription } from "react-hook-form/dist/utils/createSubject";
import { IDiary, IDiaryForm, IDiaryState } from "../types/types";
import useTypeGuard from "../Hooks/useTypeGuard";
import useDiary from "../Hooks/useDiary";
import { defaultDiary } from "../constants/defaults";
import useTempDiary from "../Hooks/useTempDiary";

function Write() {
  const navigate = useNavigate();
  const location = useLocation();
  const originalDiary: IDiary = location.state?.diary ?? defaultDiary;
  const template: IDiaryForm = pick(originalDiary, ["title", "text"]);
  const query = new URLSearchParams(location.search);
  const { isWriteOption } = useTypeGuard();
  const { saveDiary } = useDiary();
  const { runRemoveTempDiary } = useTempDiary();
  const { register, setValue, handleSubmit, watch } = useForm<IDiaryForm>();
  const subscriptionRef = useRef<Subscription | null>(null);
  const [diaryState, setDiaryState] = useState<IDiaryState>({
    mode: undefined,
    ready: false,
    diary: originalDiary,
  });

  useEffect(() => {
    // set mode
    const rawMode = query.get("mode");
    if (isWriteOption(rawMode)) {
      setDiaryState((prev) => ({ ...prev, mode: rawMode }));
      if (rawMode === "modify") {
        const { title, text } = diaryState.diary;
        setValue("title", title);
        setValue("text", text);
      }
    } else {
      console.error("Unauthorized access attempt detected.");
      navigate("/");
    }
  }, []);

  const tempSave = debounce((tempDiary: IDiaryForm) => {
    const okToSave: boolean = !(
      tempDiary.title === "" ||
      tempDiary.text === "" ||
      isEqual(tempDiary, template)
    );
    if (okToSave) {
      localStorage.setItem("tempDiary", JSON.stringify(tempDiary));
    } else {
      runRemoveTempDiary();
    }
  }, 500);

  useEffect(() => {
    // if (user close or refresh page)
    // Pause and show alert message
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

  const onValid = (validDiaryForm: IDiaryForm) => {
    subscriptionRef.current?.unsubscribe();
    tempSave.cancel();
    runRemoveTempDiary();
    const { date, id } = originalDiary;
    const createdDiary = createDiary(validDiaryForm);
    const modifiedDiary = { ...createdDiary, date, id };
    if (diaryState.mode === "create") {
      setDiaryState((prev) => ({ ...prev, diary: createdDiary, ready: true }));
    }
    if (diaryState.mode === "modify") {
      setDiaryState((prev) => ({ ...prev, diary: modifiedDiary, ready: true }));
    }
  };

  useEffect(() => {
    if (diaryState.ready) {
      saveDiary(diaryState.diary);
      navigate("/");
    }
  }, [diaryState.ready]);

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
