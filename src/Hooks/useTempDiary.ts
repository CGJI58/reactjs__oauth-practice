import { useEffect, useState } from "react";
import { IDiary, ITempDiaryState } from "../types/types";
import { getTempDiary } from "../util/diaryUtility";
import useDiary from "./useDiary";
import { defaultTempDiaryState } from "../constants/defaults";

function useTempDiary() {
  const [tempDiary, setTempDiary] = useState<ITempDiaryState>(
    defaultTempDiaryState
  );
  const [diary, setDiary] = useState<IDiary | null>(null);
  const { saveDiary } = useDiary();

  const runSaveTempDiary = () => {
    console.log("from runSaveTempDiary: 공사 중...");
    // if (tempDiary.diary) {
    //   const newDiary = createDiary(tempDiary.diary);
    //   setDiary(newDiary);
    // }
  };

  const runRemoveTempDiary = () => {
    localStorage.removeItem("tempDiary");
    setTempDiary(defaultTempDiaryState);
  };

  useEffect(() => {
    if (!tempDiary.ready) {
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
