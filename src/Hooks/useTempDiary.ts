import { useEffect, useState } from "react";
import { IDiary, ITempDiary } from "../types/types";
import { createDiary, getTempDiary } from "../util/diaryUtility";
import useDiary from "./useDiary";
import { defaultTempDiary } from "../constants/defaults";

function useTempDiary() {
  const [tempDiary, setTempDiary] = useState<ITempDiary>(defaultTempDiary);
  const [diary, setDiary] = useState<IDiary | null>(null);
  const { saveDiary } = useDiary();

  const runSaveTempDiary = () => {
    if (tempDiary.data) {
      const newDiary = createDiary(tempDiary.data);
      setDiary(newDiary);
    }
  };

  const runRemoveTempDiary = () => {
    localStorage.removeItem("tempDiary");
    setTempDiary(defaultTempDiary);
  };

  useEffect(() => {
    if (tempDiary.status === "loading") {
      const newTempDiary = getTempDiary();
      setTempDiary(newTempDiary);
    }
  }, [tempDiary]);

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
