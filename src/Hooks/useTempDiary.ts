import { useEffect, useState } from "react";
import { IDiary, IOnModal } from "../types/types";
import useSaveDiary from "./useSaveDiary";
import { createDiary, getTempDiary } from "../util/diaryUtility";
import { IForm } from "../Routes/write";

function useTempDiary() {
  const [tempDiary, setTempDiary] = useState<IForm | null>(null);
  const [diary, setDiary] = useState<IDiary | null>(null);
  const { saveDiary } = useSaveDiary();
  const saveTempDiaryVariants: IOnModal = {
    modalId: "saveTempDiary",
    sentence: "작성하던 내용을 저장하시겠습니까?",
  };

  const runSaveTempDiary = () => {
    if (tempDiary) {
      const diary = createDiary(tempDiary);
      setDiary(diary);
      localStorage.removeItem("tempDiary");
    }
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

  return { saveTempDiaryVariants, tempDiary, runSaveTempDiary };
}

export default useTempDiary;
