import { useEffect, useState } from "react";
import { IDiary, IModalVariants } from "../types/types";
import { createDiary, getTempDiary } from "../util/diaryUtility";
import { IForm } from "../Routes/write";
import useDiary from "./useDiary";

type ITempDiary = IForm | null | undefined;

function useTempDiary() {
  const [tempDiary, setTempDiary] = useState<ITempDiary>(undefined);
  const [diary, setDiary] = useState<IDiary | null>(null);
  const { saveDiary } = useDiary();
  const saveTempDiaryVariants: IModalVariants = {
    modalId: "tempDiary",
    sentence: "작성하던 내용을 저장하시겠습니까?",
  };

  const runSaveTempDiary = () => {
    if (tempDiary) {
      const newDiary = createDiary(tempDiary);
      setDiary(newDiary);
    }
  };

  const runRemoveTempDiary = () => {
    localStorage.removeItem("tempDiary");
  };

  useEffect(() => {
    setTempDiary(() => getTempDiary());
  }, []);

  useEffect(() => {
    if (diary) {
      saveDiary(diary);
      setDiary(null);
    }
  }, [diary]);

  return {
    saveTempDiaryVariants,
    tempDiary,
    runSaveTempDiary,
    runRemoveTempDiary,
  };
}

export default useTempDiary;
