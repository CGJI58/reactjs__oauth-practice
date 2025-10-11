import { useEffect, useState } from "react";
import { IDiary, ITempDiary } from "../types/types";
import { createDiary, getTempDiary } from "../util/diaryUtility";
import useDiary from "./useDiary";

function useTempDiary() {
  const [tempDiary, setTempDiary] = useState<ITempDiary>(undefined);
  const [diary, setDiary] = useState<IDiary | null>(null);
  const { saveDiary } = useDiary();

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
    tempDiary,
    runSaveTempDiary,
    runRemoveTempDiary,
  };
}

export default useTempDiary;
